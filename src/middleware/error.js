import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next)=>{
    let error = {
        statusCode : err?.statusCode || 500,
        message : err?.message || "Internal server error"
    };


    //vaidation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((values)=>values.message)
        error = new ErrorHandler(message, 400)
    }

    //handle invalid mongoose id error
    if (err.name === "CastError") {
       const message = `Resource not found. Invalid : ${err?.path} `
       error = new ErrorHandler(message, 404)
        
    }
//handle mongoose duplicate key error
if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    error = new ErrorHandler(message, 400)
}
//handle wrong jwt token
if (err.name === "jsonWebTokenError") {
    const message = "json web token is invalid. Try again!!!"
    error = new ErrorHandler(message, 400)
}
//handle jwt expired token
if (err.name === "TokenExpiredToken") {
    const message = "json web token is expired. Try again!!!"
    error = new ErrorHandler(message, 400)
}
   
        res.status(error.statusCode).json({
            message : error.message,
            error : err,
            stack : err?.stack,
        })
        
    
    // if (process.env.NODE_ENV === "PRODUCTION") {
    //     res.status(error.statusCode).json({
    //         message : error.message
    //     })
        
    // }

    

}