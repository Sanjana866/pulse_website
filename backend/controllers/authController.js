import UserModel from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { sendOTPEmail } from "../config/email.js";

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


export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
                .json({message:"Please check your details again", success:false});
        }

        const isPassEqual = await bcrypt.compare(password,user.password);

        if(!isPassEqual){
            return res.status(403)
                .json({message:"Please check your details again", success:false});
        }
        const otp = Math.floor(100000 + Math.random()*900000).toString();

        user.otp = otp;
        user.otpExpires = Date.now() + 5*60*1000;

        await user.save();

        await sendOTPEmail(user.email, otp);

        res.status(200).json({
            message:"OTP sent to email",
            success:true,
            userId:user._id
        });

    } catch (err) {
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

export const verifyOTP = async(req,res)=>{
    try {

        const {userId, otp} = req.body;

        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        if(user.otp !== otp){
            return res.status(400).json({message:"Invalid OTP"});
        }

        if(user.otpExpires < Date.now()){
            return res.status(400).json({message:"OTP expired"});
        }

        user.otp = null;
        user.otpExpires = null;

        await user.save();

        const jwtToken = jwt.sign(
            {email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );

        res.status(200).json({
            message:"Login Successful",
            success:true,
            jwtToken,
            email:user.email,
            name:user.name
        });

    } catch (err) {
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}