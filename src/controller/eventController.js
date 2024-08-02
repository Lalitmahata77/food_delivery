import catchAsychError from "../middleware/catchAsychError.js";
import Event from "../model/eventModel.js";
import Resturant from "../model/resturantModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createEvent = catchAsychError(async(req,res,next)=>{
    const {image,startedAt,endsAt,name,location} = req.body
    const resturant = await Resturant.findById(req.params?.id)
    // if (!resturant) {
    //     return next(new ErrorHandler("Resturant not found with that id", 400))
    // }

    const newEvent = await Event.create({
        resturant : req.resturant?._id,
        image ,
        startedAt,
        endsAt,
        name,
        location
    })
    res.status(200).json({newEvent})
})

export const findAllEvents = catchAsychError(async(req,res,next)=>{
    const events = await Event.find()
    if (!events) {
        return next(new ErrorHandler("Events not found with that id", 400))
    }
    res.status(200).json({events})
})

export const findEventsByResturantId = catchAsychError(async(req,res,next)=>{
    const resturant = await Event.findById(req.resturant?._id)
    if (!resturant) {
        return next(new ErrorHandler("resturant not found with that id",400))
    }
    res.status(200).json({resturant})
})

export const findEventsById  = catchAsychError(async(req,res,next)=>{
   const event = await Event.findById(req.params.id)
   if (!event) {
    return next(new ErrorHandler("Events not found with that id", 400))
}
res.status(200).json({event})
})

export const deleteEvent = catchAsychError(async(req,res,next)=>{
    let event = await Event.findById(req.params.id)
    if (!event) {
     return next(new ErrorHandler("Events not found with that id", 400))
 }
event = await Event.findByIdAndDelete(req.params.id)
event.save()
res.status(200).json({success : true})
})