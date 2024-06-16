import express from "express";
import * as sourceController from "../source/source.controller.js";
import { isAuth } from "../../middleware/authentication.js";



const sourceRouter=express.Router();

sourceRouter.post("/subscribe",isAuth,sourceController.subscribeToSource);
sourceRouter.post("/unsubscribe",isAuth,sourceController.unsubscribeFromSource);
sourceRouter.get("/all",isAuth,sourceController.getAllSources);

export default sourceRouter;

