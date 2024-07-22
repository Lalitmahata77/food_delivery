import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
cart : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Cart"
},
food : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Food"
},
quantity : Number,
ingredients : [String],
totalPrice : Number
},{timestamps : true})
const CartItem = mongoose.model("CartItem", cartItemSchema)
export default CartItem