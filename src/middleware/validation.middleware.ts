import { NextFunction, Request, Response } from "express";
import joi from "joi";

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.string().required(),
});
export const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};
