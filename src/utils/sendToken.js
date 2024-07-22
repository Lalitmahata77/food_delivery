export default (user,statusCode,res)=>{
    const token = user.getJwtToken()

    const option = {
        expires : new Date(Date.now() + process.env.COKKIE_EXPIRE_TIME *24 *60*60*100),
        httpOnly : true
    }
    res.status(statusCode).cookie("token", token, option).json({token})

}