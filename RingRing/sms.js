const request = require("../Shared/request");
const shared = require("../Shared/shared");
const fs = require("fs");
const baseUrl = process.env.NODE_ENV == "development" ? `${process.env.RING_RING_BASE_URL}v1/` : `${process.env.RING_RING_BASE_URL}v1/`;
let messages = require("./Files/messages.json");

async function sendSMS(phone,message) {
    const reference = shared.generateSmsReference();
    let payload = {
        to: phone,
        message: message,
        apiKey:process.env.RING_RING_API_KEY,
        reference: reference,
        from:8810,
        messageEncoding: "Text"
    };

    let result = await request.postRequest(`${baseUrl}message`,payload,{});
    if (result && result.success) {
        let messageData = result.data;
        if (messageData) {
            writeFile(phone,message,reference,decodeResultCode(messageData.ResultCode));
        }
        else {
            writeFile(phone,message,reference,"No code found");
        }
    }
    else {
        writeFile(phone,message,reference,"Error on request");
    }
    return true;
}

function writeFile(phone,message,reference,result) {
    messages.push({
        phone:phone,
        message:message,
        date:new Date().toISOString(),
        result:result,
        reference:reference
    })
    fs.writeFile("RingRing/Files/messages.json",JSON.stringify(messages),(err,data) => {
        if (err) console.error("Error while writing files");
    })
}

function decodeResultCode(code) {
    let codes = {
        "0": "Success",
        "1": "Internal",
        "2": "Gateway not active",
        "3": "TimeScheduled invalid",
        "4": "Reference too long",
        "5": "Number From invalid",
        "7": "Message empty",
        "8": "Message too long",
        "9": "Number To invalid",
        "11": "Internal : Application not associated with a right AppId",
        "12": "ApiKey invalid",
        "13": "XML or JSON invalid",
        "15": "IP Address denied",
        "16": "RIP invalid",
        "18": "StatusMethod invalid",
        "19": "TimeValidity invalid",
        "20": "Number To limit reached",
        "21": "Out of Time Window",
        "22": "TimeValidity invalid",
        "24": "MaxRecords invalid",
        "25": "MaxRecords invalid",
        "26": "MessageId invalid",
        "27": "Message already cancelled",
        "28": "Message already sent",
        "29": "MessageId not found",
        "30": "X-RateLimit reached",
        "31": "SenderId invalid",
        "33": "StatusFormat invalid",
        "34": "Maintenance, please retry later",
        "38": "Reference already used in the last 7 days"
    }
    return codes[code];
}

module.exports = {sendSMS};