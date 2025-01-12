import { User } from "../entities/users.entity";
import { logger } from "../utils/logger";
import jwt from "jsonwebtoken";
import bucket from "../storage";
import { comparePasswords, createJwt, hashPassword, verifyJwt } from "../utils/auth";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const isEmailRegisteredService = async (email: string) => {
  return await User.findOne({
    where: {
      email: email,
    },
  });
};

export const createUserService = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
): Promise<{ success: boolean; message: string; token?: string; user?: User }> => {
  try {
    const existingUser = await isEmailRegisteredService(email);
    if (existingUser) return { success: false, message: "Email already exists" };
    const hashedPassword = await hashPassword(password);
    const newUser = User.create({
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });
    await newUser.save();
    // logger.info(`New user created: ${newUser}`);
    if (!JWT_SECRET) {
      return { success: false, message: "Internal server error" };
    }
    const token = createJwt(newUser);
    return { success: true, message: "User created successfully", token, user: newUser };
  } catch (err) {
    return { success: false, message: "Internal server error" };
  }
};

export const logInUserService = async (
  email: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User; token?: string }> => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }
    const token = createJwt(user);
    return {
      success: true,
      message: "Login successful",
      token,
      user,
    };
  } catch (error) {
    logger.error("Error logging in user:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const getUserByIdService = async (
  userId: string
): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, message: "User found", user };
  } catch (error) {
    logger.error(`Error getting user by ID: ${error}`);
    return { success: false, message: "Internal server error" };
  }
};

export const updateUserByIdService = async (
  userId: string,
  newUserData: any,
  profilePic?: any
): Promise<{ success: boolean; message: string }> => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (profilePic) {
      logger.info(`GOT PROFILE PICTURE FILE --  ${profilePic}`);

      if (user.profilePicUrl) {
        const oldFileName = user.profilePicUrl;
        const oldFile = bucket.file(oldFileName);
        try {
          await oldFile.delete();
        } catch (error) {
          logger.error(`Error deleting old file: ${error}`);
        }
      }
      try {
        const file = bucket.file(`userPfps/${userId}-${profilePic.originalname}`);
        const fileBuffer = profilePic.buffer;

        // save image
        await file.save(fileBuffer, {
          metadata: {
            contentType: profilePic.mimetype,
          },
        });

        newUserData["profilePicUrl"] = file.name;
      } catch (error) {
        logger.error(`Error saving profile picture: ${error}`);
      }
    }

    await User.update({ id: userId }, newUserData);
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    logger.error(`Error updating user by ID: ${error}`);
    return { success: false, message: "Internal server error" };
  }
};

export const logOutUserByIdService = async (): Promise<{ success: boolean; message: string }> => {
  try {
    return { success: true, message: "User logged out successfully" };
  } catch (error) {
    logger.error(`Error logging out user: ${error}`);
    return { success: false, message: "Internal server error" };
  }
};

export const getCurrentUserService = async (
  token: string
): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    logger.info("AUTO LOGGING IN USER");
    const payload: any = verifyJwt(token);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, message: "User found", user };
  } catch (error) {
    logger.error(`Error getting current user: ${error}`);
    return { success: false, message: "Internal server error" };
  }
};
