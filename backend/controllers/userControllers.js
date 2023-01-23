const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/userModels")
const ErrorHandler = require("../utils/errorHandler")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const Product = require("../models/productModels")
const { query } = require("express")

exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
    const {name, email, password} = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilePicUrl.com/test"
        }
    })

    sendToken(user,201,res)

})

// Login User

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    
    const isPasswordMatched = await user.comparePassword(password)
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    sendToken(user,200,res)
})

// Logged out

exports.logout = catchAsyncErrors((req,res,next)=>{
    res.cookie("token", null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        massege:"Logged out successfully"
    })
})

// Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User Not Found",404))
    }

    // Get Reset Password Token

    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your reset password token is :- ${resetPasswordUrl} /n/nif your are not requested this then please ignore this`

    try {
        await sendEmail({
            email:user.email,
            subject:`WeCommerce Password Recovery`,
            message
        })

        res.status(200).json({
            success:true,
            message:`Email send to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined,
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }

})

// Reset Password

exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{
    // Creating Token Hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",404))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password does not match",400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    
    await user.save({validateBeforeSave:false})
    sendToken(user, 200, res)
})

// Get User Details

exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id)

    sendToken(user,200,res)
})


// User Password Change
exports.userPasswordChange = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("New Password and Confirm password doesn't matched",400))
    }

    user.password = req.body.newPassword

    await user.save({validateBeforeSave:true})

    res.status(200).json({
        status:true,
        message:"Your password changed successfully",
        user
    })
}) 

// Update user profile 
exports.userProfileUpdate = catchAsyncErrors(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    // we will add cloudinary later
    
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        status:true,
        message:"User data updated successfully"
    })
})

// Get All Users -- Admin
exports.getAllUsers = catchAsyncErrors(async (req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        status:true,
        message:"All users get successfully",
        data:users
    })
})

// Get Single User
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`,400))
    }

    res.status(200).json({
        status:true,
        message:"User Found successfully",
        Data:user
    })
})


// Update user role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        status:true,
        message:"User role updated successfully"
    })
})


// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{
 
    const user = User.findById(req.params.id)
    // we will remove cloudinary later

    if(!user){
        next(new ErrorHandler(`User does not exist with id : ${req.params.id}`))
    }
    await user.remove()

    res.status(200).json({
        status:true,
        message:`User deleted successfully`
    })
})

// Create new review or update new review
exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{
    
    
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating: Number(req.body.rating),
        comment:req.body.comment
    }
    const product = await Product.findById(req.body.productId)

    const isReviewed = product.reviews.find(rev=>rev.user.toString() == req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()==req.user._id.toString()){
                (rev.rating =req.body.rating),(rev.comment= req.body.comment)
            }

        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;

    product.ratings = product.reviews.forEach(rev=>{
        avg+=rev.rating
    })

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        massege:"Rating updated successfully"
    })

})

// Get all product reviews
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }

    res.status(200).json({
        success:true,
        message:"product review found",
        data:product.reviews
    })
})

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId)
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }

    const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString())
    
    let avg = 0;

    product.ratings = product.reviews.forEach(rev=>{
        avg+=rev.rating
    })

    const ratings = avg/reviews.length;

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new:false,
            runValidators:true,
            useFindAndModify:false
        })

    res.status(200).json({
        success:true,
        massege:"Rating updated successfully"
    })
})