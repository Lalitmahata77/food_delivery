import catchAsychError from "../middleware/catchAsychError.js";
import Order from "../model/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const newOrder = catchAsychError(async(req,res,next)=>{
    const {customer,resturant,totalAmount,orderStatus,deliveryAddress,items,totalItem,totalPrice} = req.body;
    const order = await Order.create({
        customer,
        resturant,
        totalAmount,
        orderStatus,
        deliveryAddress,
        items,
        totalItem,
        totalPrice
    })
    res.status(200).json({order})
})

export const orderDetails = catchAsychError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate({
        path : "customer",
        select : "fullname email",
        
    })
    if (!order) {
        return next(new ErrorHandler("Order not found with that id", 400))
    }
    res.status(200).json({order})
})

export const myOrders = catchAsychError(async(req,res,next)=>{
    const order = await Order.find({user : req.user._id})
    res.status(200).json({order})
})

//get all orders
export const getAllOrder = catchAsychError(async(req, res, next)=>{
    const {orderStatus} = req.body;
    let order = await Order.find({resturant : req.resturant?._id})
    if (orderStatus) {
      order = order.filter((or)=>or.orderStatus = orderStatus)  ;
    }
    res.status(200).json({order})
})


export const updateOrder = catchAsychError(async(req,res,next)=>{
    // const {orderStatus} = req.body;
    // const validStatus = [
    //     "OUT_FOR_DELIVERY",
    //     "DELIVERED",
    //     "COMPLETED",
    //     "PENDDINH"
    // ]
    // if (!validStatus.includes(orderStatus)) {
    //     return next(new ErrorHandler("Please select a valid order status", 400))
    // }
    // const order = await Order.findById(req.params.id);
    // if (!order) {
    //     return next(new ErrorHandler("Order not found with that id", 400))
    // }
    // order.orderStatus = orderStatus;
    // await order.save()
    // res.status(200).json({order})
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("order not found with that id", 404))
    }
    if (order?.orderStatus === "Delivered") {
        return next(new ErrorHandler("you have already delivered order", 400))
    }
    order?.orderItem?.forEach(async(item)=>{
        const order = await Order.findById(item?.order?.toString())
        if (!order) {
            return next(new ErrorHandler("order not found with that id", 404))
        }
        order.stock = order.stock - item.quantity
        await order.save({validateBeforeSave : false})
    })
    order.orderStatus = req.body.status
    order.deliverdAt = Date.now()
    await order.save()
    res.status(200).json({
        success : true
    })
})

export const deleteOrder =catchAsychError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("order not found with this id", 404))
    }
    await order.deleteOne()
    res.status(200).json({success : true})
})