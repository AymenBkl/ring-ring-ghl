module.exports.success = (res,msg,status,user,token) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Welcom to BidManager ",success: true,msg : msg,status : status,user : user,token:token}); 
}