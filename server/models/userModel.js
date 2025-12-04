import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
        maxlength:55
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
},{timestamps:true})

userSchema.methods.comparePassword= function(password){
    return bcrypt.compareSync(password,this.password)
}

const User = mongoose.model("User",userSchema);

export default User;