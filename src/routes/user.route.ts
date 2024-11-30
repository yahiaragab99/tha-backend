import express from "express";
import {
  isEmailRegistered,
  signUpUser,
  logInUser,
  getUser,
  updateUser,
  logOutUser,
} from "../controllers/user.controller";
import upload from "../multer";
import multerUpload from "../multer";

const userRouter = express.Router();

userRouter.post("/is-email-registered", isEmailRegistered);
userRouter.post("/sign-up", signUpUser);
userRouter.post("/update-user", multerUpload.single("profilePicUrl"), updateUser);
userRouter.post("/log-in", logInUser);
userRouter.post("/log-out", logOutUser);
userRouter.get("/get-user/:userId", getUser);

export default userRouter;
