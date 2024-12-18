import express from "express";
import { getItemCategories } from "../controllers/category.controller";

const categoryRouter = express.Router();

categoryRouter.get("/", getItemCategories);

export default categoryRouter;
