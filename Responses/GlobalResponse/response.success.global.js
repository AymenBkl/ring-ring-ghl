module.exports.success = (res,msg,status,data) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({success: true,msg : msg,status : status,data : data}); 
}