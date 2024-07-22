import catchAsychError from "../middleware/catchAsychError.js";
import User from "../model/userSchema.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

export const register = catchAsychError(async(req,res,next)=>{
  try {
      const {fullname, email, password, role} = req.body;
  
      if (!email || !password) {
          return next(new ErrorHandler("email or password is required", 400))
      }
      const existedUser = await User.findOne({email})
      if (existedUser) {
          return next(new ErrorHandler("User already exist", 400))
      }
      if (password.length < 6) {
          return next(new ErrorHandler("password must be required at least 6 characte", 400))
      }
      const user = await User.create({
          fullname,
          email,
          password,
          role
      })
      sendToken(user, 201, res)
   
  } catch (error) {
    console.log("Error in signup controller", error.message);
   return next(new ErrorHandler("Internal server error", 500))
  }
})

export const login = catchAsychError(async(req,res,next)=>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Email or Password is required", 400))
        }
        const user = await User.findOne({email});
       if(!user) {
            return next (new ErrorHandler("User not found", 400))
        }
        const isPasswordPasswordMatch = await user.isPasswordCorrect(password)
        if (!isPasswordPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 400))
        }
        sendToken(user, 201, res)
    } catch (error) {
        console.log("Error in signup controller", error.message);
        return next(new ErrorHandler("Internal server error", 500))
    }
})

export const logout = catchAsychError(async(req,res,next)=>{
res.cookie("token", null, {
    expires : new Date(Date.now()),
    httpOnly : true
})
res.status(200).json({
    message : "Logout successfully"
})
})

export const getUserProfile = catchAsychError(async(req,res,next)=>{
    const user = await User.findById(req.user?._id)
    if (!user) {
        return next(new ErrorHandler("User not found with that is", 400))
    }
    res.status(200).json({user})
})

export const getAllUser = catchAsychError(async(req,res,next)=>{
    const user = await User.find()
    if (!user) {
        return next(new ErrorHandler("User not found with that is", 400))
    }
    res.status(200).json({user})
})

export const updatePassword = catchAsychError(async(req,res,next)=>{
    const user = await User.findById(req?.user?._id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }
    const isPasswordMatch = await user.isPasswordCorrect(req.body?.oldPassword)
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400))
    }
    user.password = req.body.password;
    user.save()
    res.status(200).json({
        success : true
      })
})

//update user
export const updateUser = catchAsychError(async(req,res,next)=>{
    const newData = {
        fullname : req.body.fullname,
        email : req.body.email,
        role : req.body.role
    }
    const newUser = await User.findByIdAndUpdate(req.user?._id, newData, {new : true})
    res.status(200).json({newUser})
})