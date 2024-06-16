import express from "express";
import * as historyController from "./history.controller.js";
import { isAuth } from "../../middleware/authentication.js";



const historyRouter=express.Router();

historyRouter.get('/all', isAuth, historyController.getAllLoginLogs);


export default historyRouter;

