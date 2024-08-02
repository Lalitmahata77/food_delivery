import catchAsychError from "../middleware/catchAsychError.js";
import Category from "../model/categoryModel.js";
import Resturant from "../model/resturantModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createCategory = catchAsychError(async(req,res,next)=>{
    const {name} = req.body;
    const resturant = await Resturant.findOne({owner : req.user?._id})
    if (!resturant) {
        return next(new ErrorHandler("Resturant not found with that user id",400))
    }
    const category = await Category.create({
        name  ,
        resturant : resturant._id
    })
res.status(200).json({category})

})

export const findCategoryByResturantId = catchAsychError(async(req,res,next)=>{
    const category = await Category.find({resturant : req.resturant?._id})
    if (!category) {
        return next(new ErrorHandler("Category not found with that resturant id", 400))
    }
    res.status(200).json({category})
})

export const findCategoryById = catchAsychError(async(req,res,next)=>{
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler("category not found with that id", 400))
    }
    res.status(200).json({category})
})
