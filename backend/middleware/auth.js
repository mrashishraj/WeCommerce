const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require("../models/userModels")

// Authentication Check 

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    var token = req.headers.cookie;
    if(token){
        token = token.split("=")
    }
    else{
        return next(new ErrorHandler("Please login to access this resource"),401)
    }
    
    const decodedData = jwt.verify(token[1],process.env.JWT_SECRET);
    
    req.user = await User.findById(decodedData.id)

    next()
})

// Authorised Role 

exports.isAuthorisedRole = (...roles)=>{
    return (req,res,next)=>{ 
        console.log(req);
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`,403)
            ) 
        };
        next()
    }}