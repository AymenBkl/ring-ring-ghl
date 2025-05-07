const request = require("../Shared/request");
const fs = require("fs");
const baseUrl = process.env.enviroment == "development" ? `${process.env.RING_RING_BASE_URL}sandbox/` : `${process.env.RING_RING_BASE_URL}v1/`;
let messages = require("./Files/messages.json");

async function sendSMS(phone,message) {
    let payload = {
        to: phone,
        message: message,
        apiKey:process.env.RING_RING_API_KEY
    };

    let result = await request.postRequest(`${baseUrl}message`,payload,{});
    if (result && result.success) {
        let messageData = result.data;
        if (messageData && messageData.ResultCode) {
            writeFile(phone,message,decodeResultCode(messageData.ResultCode));
        }
        else {
            writeFile(phone,message,decodeResultCode("No code found"));
        }
    }
    else {
        writeFile(phone,message,decodeResultCode("Error"));
    }
    return true;
}

function writeFile(phone,message,result) {
    messages.push({
        phone:phone,
        message:message,
        date:new Date().toISOString(),
        result:result
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