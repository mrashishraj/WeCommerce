const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures")
const Order = require("../models/orderModel.js")
const { compareSync } = require("bcryptjs")

// New Order Created 
exports.newOrder = catchAsyncErrors(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(200).json({
        success:true,
        message:"Order created successfully",
        order
    })
})


// Get Order Details
exports.getSingleOrderDetails = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404))
    }

    res.status(200).json({
        status:true,
        message:"order found successfully",
        order
    })
})


// Get User Order List
exports.getMyOrderList = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.find({user:req.user._id})

    res.status(200).json({
        status:true,
        message:"Order list found successfully",
        order
    })
})

// Get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.find()

    let totalAmount = 0
    order.forEach(order=>{
        totalAmount+=order.totalPrice
    })

    res.status(200).json({
        status:true,
        message:"Order List Found Successfully",
        totalAmount,
        order
    })
})

// Update Order Status -- Admin
exports.updateOrderStatus = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order Not Found with this id",404))
    }

    if(order.orderStatus ==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
    }

    order.orderItems.forEach(async(item)=>{
    await updateStock(item.product,item.quantity)
    })

    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id)

    product.stock-=quantity

    await product.save({validateBeforeSave:false})
}

exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }

    await order.remove()

    res.status(200).json({
        status:true,
        message:"Order Deleted Successfully"
    })
})