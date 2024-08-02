import catchAsychError from "../middleware/catchAsychError.js";
import Food from "../model/foodModel.js"
import ErrorHandler from "../utils/errorHandler.js";
export const newFood =catchAsychError(async(req,res)=>{
    req.body.user = req.user._id
    const food = await Food.create(req.body)
    res.status(200).json({
        food
    })
})

//delete product
export const deleteFood = catchAsychError(async(req,res)=>{
    const {id} = req.params;
    const product = await Food.findById(id);
    if (!product) {
        return next(new ErrorHandler("Food not found"))
    }
    await Food.deleteOne();
    res.status(200).json({message : "Food deleted successfully"})
})

export const getResturantFood = catchAsychError(async(req,res,next)=>{
    const {vegetarian, nonveg, seasonal, foodCategory} = req.query;
    // const {resturantId} = req.resturant?._id;
 
    // if (vegetarian == true) {
    //     resturantId.isVegetarian = true
    // }
    // if (nonveg == true) resturantId.vegetarian = false
    // if (seasonal == true) resturantId.isSeasonal = true
    // if (foodCategory ) resturantId.foodCategory = foodCategory

const foods = await Food.find(req.resturant?._id)
.populate("ingredients")
.populate("resturant", "name _id")
// .populate([
//     {path :"ingredients", populate:{path : "category",select : "name"}},
//     foodCategory,
//     {path : "resturant", select : "name _id"}
// ])
res.status(200).json({foods})
})

export const searchFood = catchAsychError(async(req,res,next)=>{
    const {keyword} = req.query;
    let query = {}
    if (keyword) {
        query.$or = [
            {name : {$regex : keyword, $options : "i"}},
            {"foodCategory.name" : {$regex : keyword, $options : "i"}}
        ]
    }

    const food = await Food.find(query)
    res.status(200).json({food})
})

export const updateAvaibilityStatus = catchAsychError(async(req,res,next)=>{
    const food = await Food.findById(req.params.id).populate([
        {path : "ingredients", populate:{path : "category", select : "name"}},
        foodCategory,
        {path : "resturant", select : "name _id"}
    ])

    if (!food) {
        return next (new ErrorHandler("Food not found", 400))
    }
food.availabel = !food.availabel
food.save()
res.status(200).json({food})
})