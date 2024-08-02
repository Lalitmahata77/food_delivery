import mongoose from "mongoose";

const ingredientsModelSchema = new mongoose.Schema({
name :{
    type : String
} ,
resturant : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Resturant"
},
ingredients : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "IngredientsItem"
}]
},{timestamps : true})
const IngredientsCategory = mongoose.model("IngredientsCategory", ingredientsModelSchema)
export default IngredientsCategory