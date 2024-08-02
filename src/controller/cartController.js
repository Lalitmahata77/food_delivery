
import catchAsychError from "../middleware/catchAsychError.js";
import Cart from "../model/cartModel.js";
import CartItem from "../model/cartItemModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import Food from "../model/foodModel.js";
export const createCard = catchAsychError(async(req,res,next)=>{
    const cart = await Cart.create(req.user?._id)
res.status(200).json({cart})
})

export const findCartByUserId = catchAsychError(async(req,res,next)=>{
    const userid = req.user?._id;
    const cart = await Cart.findOne(userid).populate([
        {
            path : "items",
            populate :{
                path : "food",
                populate:{
                    path : "resturant",
                  select : "_id"
                }
            }
        }
    ])
if (!cart) {
    return next(new ErrorHandler("Cart not found", 400))
}
let cartItem = await CartItem.find(req.cart?._id).populate("food")
let totalPrice =0;
let totalDiscountPrice = 0;
let totalItem = 0;

for(const item of cart.cartItem){
    totalPrice += item.price;
    totalDiscountPrice += item.discountPrice;
    totalItem +=item.quantity; 
}
cart.totalPrice = totalPrice
cart.totalItem = totalItem
cart.totalDiscountPrice = totalDiscountPrice
cart.discount = totalPrice - totalDiscountPrice

res.status(200).json({cart})
})

export const addtoFavorite = catchAsychError(async(req,res,next)=>{
    const cart = await Cart.findById(req.user?._id)
    const food = await Food.findById(req.params.id);
    const isPresent = await CartItem.findOne({
        cart : cart._id,
        food : food._id,
        user : req.user._id
    })

    if (!isPresent) {
        const cartItem = new CartItem({
            cart : cart._id,
            food : food._id,
            user : req.user._id,
            quantity : 1,
            totalPrice : food.price
        })
        const createdCardItem = cartItem.save()
        cart.cartItem.push(createdCardItem)
        res.status(200).json({createdCardItem})
    }
    res.status(200).json({isPresent})
})

export const updateCardItemQuantity = catchAsychError(async(req,res,next)=>{
    const {quantity,food} = req.body;
    const cartItem = await CartItem.findById(req.params?.id).populate([
        {
            path : "food",
            populate : {
                path : "resturant" ,
                select : "_id"
            }
        }
    ])
    if (cartItem) {
        return next(new ErrorHandler("CartItem not found with that id", 400))
    }
    cartItem.quantity = quantity
    cartItem.totalPrice = quantity * cartItem.food.price
await cartItem.save()
res.status(200).json({cartItem})
})

export const removeItemFromCart = catchAsychError(async(req,res,next)=>{
    const cart = await Cart.findById(req.user._id)
    if (!cart) {
        return next(new ErrorHandler("Cart not found with that id", 400))
    }
    cart.cartItem = cart.cartItem.filter((item)=> !item.equals(req.cartItem._id))

    await cart.save()
    res.status(200).json({cart})
})

export const clearCart = catchAsychError(async(req,res,next)=>{
    const cart = await Cart.findById(req.user._id);
    if (!cart) {
        return next(new ErrorHandler("cart not found with that id", 400))
    }
    cart.cartItem = []
    await cart.save()
    res.status(200).json({cart})
})

export const calculateCartTotal = catchAsychError(async(req,res,next)=>{
    const cart = await Cart.findById(req.params.id)
    let total = 0;
    for(let cartItem of cart.cartItem){
        total += cartItem.food.price * cartItem.quantity
     
    }
    res.status(200).json({cart})
})