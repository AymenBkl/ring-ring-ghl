module.exports.error = (res,err,status,data) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Something Went Wrong !",success: false,err:err,status : status,data : data});
}