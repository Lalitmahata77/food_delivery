import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    image : String,
    startedAt : String,
    endsAt : String,
    name : String,
    resturant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resturant"
    },
    location : String
})
const Event = mongoose.model("Event", eventSchema)
export default Event