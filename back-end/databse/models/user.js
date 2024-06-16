import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
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
    code:{
      type:String,
      default:null

    },
    subscribedSources: [{
      type: String, 
      ref: 'Source'
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);

