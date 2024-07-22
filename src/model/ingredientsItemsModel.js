import mongoose from "mongoose";

const ingredientsschema = new mongoose.Schema({
name : String,
category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "IngredientsCategory"
},
resturant : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Resturant"
},
inStoke : {
    type : Boolean,
    default : true
}
})
const IngredientsItem = mongoose.model("IngredientsItem", ingredientsschema)
export default IngredientsItem