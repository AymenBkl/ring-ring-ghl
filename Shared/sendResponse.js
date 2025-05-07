
function sendResponse(res, statusCode, code, msg, data = {}) {
    res.statusCode = statusCode;
    res.json({ status: statusCode, code: code, msg: msg, data: data });
}


module.exports = {sendResponse}