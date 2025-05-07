module.exports.error = (res,err,status,user) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Something Went Wrong !",success: false,err:err,status : status,user : user});
}