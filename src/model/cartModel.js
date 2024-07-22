import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
customer : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
},
cartItem : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "CartItem"
}],
total : Number
},{timestamps : true})
const Cart = mongoose.model("Cart", cartSchema)
export default Cart