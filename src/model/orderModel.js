import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : " User",
        strictPopulate: false
    },
    resturant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resturant"
    },
    totalAmount : Number,
    orderStatus : String,
    deliveryAddress : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address"
    },
    items: [{
type : mongoose.Schema.Types.ObjectId,
ref : "OrderItems"
    }],
    
    totalItem : Number,
    totalPrice : Number,
    
},{timestamps : true})
const Order = mongoose.model("Order", orderSchema)
export default Order