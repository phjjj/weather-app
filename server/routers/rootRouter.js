import express from "express";

import { getImage } from "../controllers/imageController.js";
const rootRouter = express.Router();

rootRouter.get("/imgcollection", getImage);

export default rootRouter;
