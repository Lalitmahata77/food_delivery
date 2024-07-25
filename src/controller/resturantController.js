import catchAsychError from "../middleware/catchAsychError.js";
import Address from "../model/addressModel.js"
import Resturant from "../model/resturantModel.js";
import ErrorHandler from "../utils/errorHandler.js";
export const createResturant = catchAsychError(async(req,res,next)=>{
    const {name,description,cuisineType,contactInformation,openingHourse,images,registratonDate} = req.body;
 

    const address = await Address.create({
        city:req.body.city ,
        country:req.body.country ,
        fullname:req.body.fullname ,
        streetAddress :req.body.streetAddress,
        state:req.body.state ,
        postalCode : req.body.postalCode
    })
   
    const resturant = await Resturant.create({
        address : address,
        name,
        description,
        cuisineType,
        contactInformation,
        openingHourse,
        images,
        registratonDate,
       owner :req.user?._id
    })
    
    res.status(200).json({resturant})
})

export const getAllResturant = catchAsychError(async(req,res,next)=>{
    const resturant = await Resturant.find()
    if (!resturant) {
      return  next(new ErrorHandler("Resturant not found", 400))
    }
    res.status(200).json({resturant})
})

export const getResturantById = catchAsychError(async(req,res,next)=>{
    const resturant = await Resturant.findById(req.params.id);
    if (!resturant) {
        return  next(new ErrorHandler("Resturant not found", 400))
      }
      res.status(200).json({resturant})
})

export const deleteResturant = catchAsychError(async(req,res,next)=>{
    const resturant = await Resturant.findById(req.params.id)
    if (!resturant) {
        return  next(new ErrorHandler("Resturant not found", 400))
      }

     await Resturant.deleteOne()
     res.status(200).json({message : "Resturant deleted successfully"})
})

export const getResturantByUserId = catchAsychError(async(req,res,next)=>{
    const userId = req.user?._id;
    const resturant = await Resturant.findOne({userId}).populate("owner").populate("address")
if (!resturant) {
    return  next(new ErrorHandler("Resturant not found", 400))
}
res.status(200).json({resturant})
})


export const searchResturant = catchAsychError(async(req,res,next)=>{
    const {Keyboard} = req.query;
    const resturants = await Resturant.find({
        $or : [{
            name : {$regex : Keyboard, $options : "i"},
            description :{$regex : Keyboard, $options : "i"},
            cuisineType : {$regex : Keyboard, $options : "i"}
        }]
    })
    res.status(200).json({resturants})
})

export const favoritesResturant = catchAsychError(async(req,res,next)=>{
    const {id} = req.params;
    const user = req.user
    const resturant = await Resturant.findById(id);
    const dto = {
        _id : resturant._id,
        title : resturant.name,
        images : resturant.images,
        description : resturant.description
    }

    const favorites = user.favorites || [];
    const index = favorites.findIndex(favorites=>favorites._id == resturant._id)
    if (index !== -1) {
        favorites.splice(index,1)
    }else{
        favorites.push(dto)
    }

    user.favorites = favorites;
    await user.save()
    res.status(200).json({dto})
})

export const updateResturantStatus = catchAsychError(async(req,res,next)=>{
    const resturant = await Resturant.findById(req.params.id).populate("owner").populate("address");
    if (!resturant) {
        return next(new ErrorHandler("Resturant not found", 400))
    }
    resturant.open = !resturant.open;
    await resturant.save();
    res.status(200).json({resturant})

})