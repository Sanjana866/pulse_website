import UserModel from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
export const signup=async(req,res)=>{
    try {
        const {name, email, password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:"User already exists", success:false});
        }
        const userModel=new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
            .json({message:"Signup successful",success:true})
    } catch (err) {
        res.status(500)
            .json({
                message:"Internal server error",
                success:false
            })
        
    }
}


export const login =async(req,res)=>{
    try {
        const {name, email, password}=req.body;
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(403)
                .json({message:"Please check your details again", success:false});
        }
        const isPassEqual=await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message:"Please check your details again", success:false});
        }
        const jwtToken=jwt.sign({email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        res.status(200)
            .json({message:"Login Successful",success:true,
                jwtToken,
                email,
                name:user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message:"Internal server error",
                success:false
            })
        
    }
}