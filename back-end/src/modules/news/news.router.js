import express from "express";
import * as newsController from "../news/news.controller.js";
import { isAuth } from "../../middleware/authentication.js";



const newsRouter=express.Router();

newsRouter.get('/all', isAuth, newsController.getNewsForSubscribedSources);


export default newsRouter;

