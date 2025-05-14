const smsRingRing = require("../../RingRing/sms");
const response = require("../../Shared/sendResponse");
const { z } = require('zod');

async function sendSMS(req,res) {
    let validatedSMS = validateSMS(req.body);
    if (validatedSMS) {
        await smsRingRing.sendSMS(validatedSMS.phone,validatedSMS.message);
        response.sendResponse(res,200,'Message sent Successfully');
    }
    else {
        response.sendResponse(res,429,'Validation Failed');
    }
}


function validateSMS(data) {
    if (data.phone) {
        data.phone = data.phone.replaceAll(" ", '');
        data.phone = data.replaceAll(/^\+/, "");
    }
    console.log(data);
    const smsSchema = z.object({
        phone: z
          .string()
          .min(8, "Phone number is too short")
          .max(15, "Phone number is too long")
          .transform(val => val.replace(/^\s+|\s+$|\s+(?=\s)/g, '')) // Remove all spaces
          .transform(val => val.replace(/^\+/, "")) // Remove "+" if present
          .refine(val => /^\d{8,15}$/.test(val), {
            message: "Phone number must contain only digits (after removing +)",
          }),
        message: z
          .string()
          .min(1, "Message cannot be empty")
          .max(160, "Message cannot exceed 160 characters"),
    });
    let validationResult = smsSchema.safeParse(data);
    if (validationResult && validationResult.success) {
        return validationResult.data;
    }
    else {
        return false;
    }
}

module.exports = {sendSMS};