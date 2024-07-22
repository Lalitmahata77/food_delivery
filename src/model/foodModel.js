import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    name : String,
    description : String,
    price : Number,
    foodCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    images : [String],
    resturant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resturant"
    },
    availabel : Boolean,
    isVegitarian : Boolean,
    isSesonal : Boolean,
    ingredients : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "IngredientsItem"
    }]

},{timestamps : true})

const Food = mongoose.model("Food", foodSchema)
export default Food