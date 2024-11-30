import { Request, Response, NextFunction } from "express";
import { User } from "../entities/users.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bucket from "../storage";
import { JWT_COOKIE_NAME, COOKIE_NAME } from "../constants";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
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

export const signUpUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;
    console.log("GOT USER DATA -- ", req.body);
    // Validate required fields
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Email, password, first name, last name, and phone number are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = User.create({
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });
    await newUser.save();

    console.log("New user created:", newUser);

    // Ensure the JWT_SECRET is defined
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    // Generate a JWT token for the new user
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send a successful response with the token
    res.status(201).json({
      message: "User created successfully",
      token,
    });
    next();
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logInUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (JWT_SECRET === undefined) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true, maxAge: 1000 });
    // delete user.passwordHash || null
    return res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(500).json({ message: "Internal server error" });
    next();
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile retrieved successfully",
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      profilePicUrl: user.profilePicUrl,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
    next();
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // const userId = req.session.id;
    const userId = req.body.id; //TODO -- CHANGE THIS TO GET USER ID FROM SESSION
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    console.log("UPDATE USER DATA FOR USER -- ", userId);

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newUserData = req.body;
    // Handle optional profile picture upload
    // let picUrl = "";
    if (req.file) {
      console.log("GOT PROFILE PICTURE FILE -- ", req.file);

      if (user.profilePicUrl) {
        const oldFileName = user.profilePicUrl;
        const oldFile = bucket.file(oldFileName);
        try {
          await oldFile.delete();
        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }

      try {
        const file = bucket.file(`userPfps/${userId}-${req.file.originalname}`);
        const fileBuffer = req.file.buffer;

        // save image
        await file.save(fileBuffer, {
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        newUserData["profilePicUrl"] = file.name;
      } catch (error) {
        console.error("Error uploading profile picture", error);
      }
    }

    await User.update({ id: userId }, newUserData);
    res.status(200).json({ message: "User updated successfully" });
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
    next();
  }
};

//TODO UNTESTED BECAUSE NO SESSION/FRONTEND YET
export const logOutUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // const userId = req.session.id;
    const userId = req.body.id; //TODO CHANGE TO GET USER ID FROM SESSION
    console.log("LOGGING OUT USER -- ", userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.clearCookie(JWT_COOKIE_NAME);
        res.clearCookie(COOKIE_NAME);
        res.status(200).json({ message: "Logout successful" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//TODO ADD NOTIFICATION TOKEN TO USER

//TODO REMOVE NOTIFICATION TOKEN FROM USER

//TODO SEND RESET PASSWORD EMAIL
