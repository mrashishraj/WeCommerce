const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures")

// ===========***** Create Product -- admin *****=============

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    req.body.user = req.user.id

    const product = await Product.create(req.body)
 
    res.status(201).json({
        success:true,
        product
    })

})

// Get All Product

exports.getAllProducts= catchAsyncErrors(async (req,res,next)=>{

    const resultPerPage = 5
    const productsCount = await Product.countDocuments();

    const ApiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage)

    const products = await ApiFeature.query;

    res.status(200).json({
        message:"Below is the list of product",
        success:true,
        products,
        productsCount
    })
})

// Get Product Details

exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
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