import jwt from "jsonwebtoken";
import { User } from "../entities/users.entity";
import { NextFunction, Response } from "express";
import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import { JWT_EXPIRATION } from "../constants";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const createJwt = (user: User) => {
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRATION!,
  });
  return token;
};

export const protect = (req: any, res: Response, next: NextFunction): any => {
  const token = req.cookies.jwt;
  // logger.info(`Token: ${token}`);
  if (!token) return res.sendStatus(401).json({ message: "Unauthorized" });
  // const user = jwt.verify(token, JWT_SECRET!);
  // logger.info(`User: ${user}`);

  try {
    const user = jwt.verify(token, JWT_SECRET!);
    req.user = user;
    next();
  } catch (error) {
    logger.error("Error verifying token:", error);
    return res.sendStatus(401).json({ message: "Unauthorized" });
  }
};

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, JWT_SECRET!);
};
