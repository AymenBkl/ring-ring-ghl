const errResponse = require('./response.err.global');
const successResponse = require('./response.success.global');

module.exports.response = (type,res,msg,status,data) => {
    if (type == 'error'){
        return errResponse.error(res,msg,status,data);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,data);
    }
}