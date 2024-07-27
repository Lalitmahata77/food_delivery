import catchAsychError from "./catchAsychError.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken"
import User from "../model/userSchema.js";

export const isAuthenticated = catchAsychError(async(req,res,next)=>{
    const {token} = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Invalid token", 400))
    }
const decoded =  jwt.verify(token,process.env.JWT_SECRET)
req.user = await User.findById(decoded.id)
next()
})

export const authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role(${req.user.role}) is not allow to acess this resource`)
            )
        }
        next()
    }
}