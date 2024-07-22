import mongoose from "mongoose"
const resturantModel = new mongoose.Schema({
owner : {
    type : mongoose.Schema.Types.ObjectId,

}
},{timestamps : true})

const Resturant = mongoose.model("Resturant", resturantModel)
export default Resturant