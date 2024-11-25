import { Request, Response, NextFunction } from "express";
import { QrCode } from "../entities/qrCode.entity";
import { User } from "../entities/users.entity";

export const isEmailRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(user);
    res.status(200).json(!!user);
    next();
  } catch (error) {
    console.error("Error checking if email is registered", error);
    res.status(500).json({ message: "Internal server error" });
    next();
  }
};

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  } catch (error) {}
};
