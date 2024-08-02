import catchAsychError from "../middleware/catchAsychError.js";
import IngredientsCategory from "../model/ingredientsCategoryModel.js";
import IngredientsItem from "../model/ingredientsItemsModel.js";
import Resturant from "../model/resturantModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createIngredients = catchAsychError(async(req,res,next)=>{

    const category = await IngredientsCategory.find({
        resturant : req.resturant?._id,
        name : req.body.name
    })
    // if (category) {
    //     res.status(200).json({category})
    // }

    // const resturant = await Resturant.findById(req.params.id);
    // if (!resturant) {
    //     return next(new ErrorHandler("Resturant not found with that id ", 400))
    // }

    const createCategory = await IngredientsCategory.create({
        name : req.body.name,
        resturant : req.resturant?._id
    })

    res.status(200).json({createCategory})
})

export const findIngredientsCategoryById = catchAsychError(async(req,res,next)=>{
    const ingredientsCategory = await IngredientsCategory.findById(req.params.id);
    if (!ingredientsCategory) {
        return next(new ErrorHandler("Ingredients category not found", 400))
    }
    res.status(200).json({ingredientsCategory})
})

export const findResturantIngredients = catchAsychError(async(req,res,next)=>{
    const items = await IngredientsItem.find({resturant : req.resturant?._id}).populate("category");
    if (!items) {
        return next(new ErrorHandler("Item not found with that resturant id", 400))
    }
    res.status(200).json({items})
})

export const createIngredientsItem = catchAsychError(async(req,res,next)=>{
    const category = await IngredientsCategory.findById(req.params.id)
    // if (!category) {
    //     return next(new ErrorHandler("Category not found with that id",400))
    // }

    let item = await IngredientsItem.find({
        resturant : req.resturant?._id,
        name : req.body.name,
        category : req.category?._id
    })
    if (item) {
       return res.status(200).json({item})
    }
item = await IngredientsItem.create({
    resturant : req.resturant?._id,
    name : req.body.name,
    category : req.category?._id
})
// category.ingredients.push(item)
res.status(200).json({item})
})

export const updateStock = catchAsychError(async(req,res,next)=>{
    const item = await IngredientsItem.findById(req.params.id).populate("category")
    // if (item) {
    //     return next(new ErrorHandler("item not found with that id", 400))
    // }
item.inStoke = !item.inStoke
await item.save()
res.status(200).json({item})
})