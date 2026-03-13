import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  mfaEnabled:{
    type:Boolean,
    default:true
  },

  otp:{
    type:String
  },

  otpExpires:{
    type:Date
  }

});

const User= mongoose.model('User', UserSchema);
export default User
