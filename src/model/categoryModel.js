import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String
    },
    resturant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resturant"
    }
},{timestamps : true})
const Category = mongoose.model("Category", categorySchema)
export default Category