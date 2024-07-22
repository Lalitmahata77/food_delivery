import mongoose from "mongoose"
const resturantModel = new mongoose.Schema({
owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
},
name : {
    type : String,
    required : true
},
description : {
    type : String,
    required : true
},
cuisineType : String,
address : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Address"
},
contactInformation : {},
openingHourse : Boolean,
orders : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Order"
}],
rating : Number,
images : [String],
registratonDate : {
    type : Date,
    default : Date.now()
},
open : Boolean,
foods : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Food"
}]
},{timestamps : true})

const Resturant = mongoose.model("Resturant", resturantModel)
export default Resturant