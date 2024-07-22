import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
food : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Food"
},
quantiti : Number,
totalPrice : Number,
ingredients : [String]
})

const OrderItems = mongoose.model("OrderItems", orderItemsSchema)
export default OrderItems