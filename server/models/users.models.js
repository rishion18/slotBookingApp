import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    fullName:{
        type: String,
        require: [true , 'Name is required'],
        minLength:[3 , 'Minimum 3 characters are required'],
        maxLength:[20 , 'Maximum 20 characters allowed'],
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        require:[true , 'e-mail is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
       type: String,
       required: [true , 'Password is required'],
       minLength: [8 , 'minimum 8 characters required'],
       select: false
    },
    role:{
        type: String,
        enum: ['USER' , 'ADMIN'],
        required: [true , 'Please select a role']  
    }
} , {timestamps: true})

userSchema.methods = {
    generateJWTToken: function(){
        return jwt.sign(
         {id: this._id , role: this.role},
         process.env.JWT_Password,
         {expiresIn: process.env.JWT_Expiry}
        )
    }
 }

 const users = model('users' , userSchema);
 export default users;