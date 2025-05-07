const smsRingRing = require("../../RingRing/sms");
const response = require("../../Shared/sendResponse");
const { z } = require('zod');

async function sendSMS(req,res) {
    let validatedSMS = validateSMS(req.body);
    if (validatedSMS) {

    }
    else {
        response.sendResponse(res,500,'Something Went Wrong');
    }
}


function validateSMS(data) {
    const smsSchema = z.object({
        phone: z
          .string()
          .min(8, "Phone number is too short")
          .max(15, "Phone number is too long")
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
        return true;
    }
    else {
        return false;
    }
}