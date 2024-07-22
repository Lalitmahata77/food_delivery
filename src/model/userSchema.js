import mongoose from "mongoose";
import becrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },
    order : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Order"
    }],
    favorites : [{
       name : String,
       description : String,
       image : []

    }],
    address : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address"
    }]
    

},{timestamps:true})

//encryption
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next()
    }
    this.password = await becrypt.hash(this.password, 10)
})

//jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET,{
        expiresIn : "15d"
    })
}

//compare password
userSchema.methods.isPasswordCorrect = function(enteredPassword){
    return  becrypt.compare(enteredPassword,this.password)
}
const User = mongoose.model("User", userSchema)
export default User