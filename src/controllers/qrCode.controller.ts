import { Request, Response, NextFunction } from "express";
import { QrCode } from "../entities/qrCode.entity";
import { User } from "../entities/users.entity";

// Controller to fetch all QR codes associated with a specific user ID
export const getQrCodesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.params.userId;

    // Validate input: Ensure user ID is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch QR codes from the database for the specified user
    const qrCodes = await QrCode.find({
      where: { user_id: userId },
    });

    // Handle case where no QR codes are found
    if (!qrCodes || qrCodes.length === 0) {
      return res.status(404).json({ message: "No QR codes found for this user" });
    }

    // Return the found QR codes
    res.status(200).json(qrCodes);
  } catch (error) {
    console.error("Error getting QR codes", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    next(); // Ensure next middleware is called
  }
};

// Controller to fetch a QR code by its unique code
export const getQrCodeByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const reqQrCode = req.params.qrCodeCode;

    // Validate input: Ensure QR code is provided
    if (!reqQrCode) {
      return res.status(400).json({ message: "QR Code is required" });
    }

    // Fetch QR code from the database
    const qrCode = await QrCode.findOne({
      where: { code: reqQrCode },
    });

    // Handle case where QR code is not found
    if (!qrCode) {
      return res.status(404).json({ message: "QR Code not found" });
    }

    // Return the found QR code
    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Error getting QR code", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    next(); // Ensure next middleware is called
  }
};

// Controller to fetch a QR code by its ID
export const getQrCodeById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const qrCodeId = req.params.qrCodeId;

    // Validate input: Ensure QR code ID is provided
    if (!qrCodeId) {
      return res.status(400).json({ message: "QR Code ID is required" });
    }

    // Fetch QR code by ID
    const qrCode = await QrCode.findOne({
      where: { id: qrCodeId },
    });

    // Handle case where QR code is not found
    if (!qrCode) {
      return res.status(404).json({ message: "QR Code not found" });
    }

    // Return the found QR code
    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Error getting QR code", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    next(); // Ensure next middleware is called
  }
};

// Controller to update a QR code's details
export const updateQrCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const reqQrCode = req.params.qrCodeCode;
    const { email: userEmail, itemName, isClaimed } = req.body;

    // Validate required fields
    if (!reqQrCode) return res.status(400).json({ message: "QR code ID is required" });
    if (!userEmail) return res.status(400).json({ message: "User email is required" });
    if (!itemName) return res.status(400).json({ message: "Item Name is required" });

    // Fetch QR code by code
    const qrCode = await QrCode.findOne({ where: { code: reqQrCode } });
    if (!qrCode) return res.status(404).json({ message: "QR Code not found" });

    // Find user ID based on email
    const userId = await User.findOne({ select: { id: true }, where: { email: userEmail } });
    if (!userId) return res.status(404).json({ message: "User not found" });

    // Update QR code details
    const updatedData = {
      user_id: userId.id,
      itemName,
      isClaimed,
    };
    const updateResponse = await QrCode.update({ id: qrCode.id }, updatedData);

    res.status(200).json(updateResponse);
  } catch (error) {
    console.error("Error updating QR code", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    next(); // Ensure next middleware is called
  }
};

// Controller to check if a QR code is claimed
export const isQrCodeClaimed = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const qrCodeId = req.params.qrCodeId;

    // Validate input: Ensure QR code ID is provided
    if (!qrCodeId) {
      return res.status(400).json({ message: "QR code ID is required" });
    }

    // Fetch QR code by ID
    const qrCode = await QrCode.findOne({ where: { id: qrCodeId } });
    if (!qrCode) return res.status(404).json({ message: "QR Code not found" });

    // Return claim status
    res.status(200).json({ isClaimed: qrCode.isClaimed });
  } catch (error) {
    console.error("Error checking QR code claim status", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    next(); // Ensure next middleware is called
  }
};
