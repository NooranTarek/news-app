import express from "express";
import * as userController from "../user/user.controller.js";



const userRouter=express.Router();

userRouter.post("/register",userController.signup);



export default userRouter;