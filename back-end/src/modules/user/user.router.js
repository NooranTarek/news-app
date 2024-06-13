import express from "express";
import * as userController from "../user/user.controller.js";



const userRouter=express.Router();

userRouter.post("/register",userController.signup);
userRouter.post("/login",userController.signin);
userRouter.post("/forget",userController.forgetPassword);
userRouter.post("/reset",userController.resetPassword);



export default userRouter;