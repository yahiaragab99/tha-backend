import express from "express";
import { isEmailRegistered } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/isEmailRegistered", isEmailRegistered);

export default userRouter;
