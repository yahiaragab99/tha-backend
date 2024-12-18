import express from "express";
import { get } from "http";
import { getItemCategories } from "../controllers/category.controller";

const categoryRouter = express.Router();

categoryRouter.get("/", getItemCategories);
