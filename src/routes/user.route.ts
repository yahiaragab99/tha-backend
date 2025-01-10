import express from "express";
import {
  isEmailRegistered,
  signUpUser,
  logInUser,
  getUser,
  updateUser,
  logOutUser,
  getCurrentUser,
} from "../controllers/user.controller";
import { validateSignUp } from "../middleware/validation.middleware";

const userRouter = express.Router();

/*
  Auth routes
*/
userRouter.post("/signup", validateSignUp, signUpUser);
userRouter.post("/login", logInUser);
userRouter.post("/logout", logOutUser);

userRouter.get("/user/me", getCurrentUser);

userRouter.put("/user/:id", updateUser);
userRouter.get("/user/:id", getUser);
userRouter.post("/isemailregistered/:email", isEmailRegistered);

export default userRouter;
