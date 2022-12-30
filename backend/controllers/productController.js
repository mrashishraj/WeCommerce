const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

// ===========***** Create Product -- admin *****=============

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    
    const product = await Product.create(req.body)
 
    res.status(201).json({
        success:true,
        product
    })

})

// Get All Product

exports.getAllProducts= catchAsyncErrors(async (req,res)=>{

    const products = await Product.find()

    res.status(200).json({
        message:"Below is the list of product",
        success:true,
        products
    })
})

// get product details

exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
    console.log(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found with this id",404))
    }

    res.status(200).json({
        success:true,
        massage:"Product found successfully",
        product
    })

})

// Update Product -- admin

exports.updateProduct = catchAsyncErrors(async (req,res)=>{
    let product = await  Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found with this id",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(201).json({
        message:"Product Updated Successfully",
        status:true,
        product
    })
})

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found with this id",404))
    }

    await product.remove(); 

    res.status(200).json({
        success:true,
        message:"Product delected successfully"
    })
})