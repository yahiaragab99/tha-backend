import { Request, Response, NextFunction } from "express";
import { JWT_COOKIE_NAME, MAX_AGE_COOKIE } from "../constants";
import {
  createUserService,
  getCurrentUserService,
  getUserByIdService,
  isEmailRegisteredService,
  logInUserService,
  logOutUserByIdService,
  updateUserByIdService,
} from "../services/user.service";
import { logger } from "../utils/logger";

export const isEmailRegistered = async (req: Request, res: Response): Promise<any> => {
  const email = req.params.email;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const user = await isEmailRegisteredService(email);
    res.status(200).json(!!user);
  } catch (error) {
    logger.error("Error checking if email is registered", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signUpUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  if (!email || !password || !firstName || !lastName || !phoneNumber)
    return res.status(400).json({ message: "All fields are required" });
  try {
    const { success, message, token, user } = await createUserService(
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    );
    logger.info({ message });
    if (!success) return res.status(409).json({ message });
    res.status(201).json({
      message,
      user,
      token,
    });
  } catch (error) {
    logger.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logInUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });
  try {
    const { success, message, user, token } = await logInUserService(email, password);
    if (!success) return res.status(401).json({ message });
    req.session.userId = user?.id;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving cookie" });
      } else {
        logger.info(`USER LOGGED IN -- ${req.session.userId}`);
      }
    });
    const maxAge = MAX_AGE_COOKIE;
    res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(200).json({ message, user, token });
  } catch (error) {
    logger.error("Error logging in user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.id;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const { success, message, user } = await getUserByIdService(userId);
    if (!success) return res.status(404).json({ message });
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const userId = req.params.id;
  const { newUserData } = req.body;
  const profilePicFile = req.file;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const { success, message } = await updateUserByIdService(userId, newUserData, profilePicFile);
    if (!success) return res.status(404).json({ message });
    res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logOutUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, message } = await logOutUserByIdService();
    if (!success) return res.status(404).json({ message });
    req.session.destroy((err) => {
      if (err) {
        logger.error(`Error destroying session: ${err}`);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.clearCookie(JWT_COOKIE_NAME);
        return res.status(200).json({ message });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies[JWT_COOKIE_NAME];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const { success, message, user } = await getCurrentUserService(token);
    if (!success) return res.status(404).json({ message });
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
//TODO ADD NOTIFICATION TOKEN TO USER

//TODO REMOVE NOTIFICATION TOKEN FROM USER

//TODO SEND RESET PASSWORD EMAIL
