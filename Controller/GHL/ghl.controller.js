const ringRingGhl = require("./ring-ring-ghl");

module.exports = {
    ringRingGhlSMS: (req,res) => {
        ringRingGhl.sendSMS(req,res);
    }
}