import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    fullname : String,
    streetAddress : String,
    city : String,
    state : String,
    postalCode : String,
    country : String
},{timestamps:true})
const Address = mongoose.model("Address", addressSchema)
export default Address