import { Request, Response, NextFunction } from "express";
import { QrCode } from "../entities/qrCode.entity";
import { User } from "../entities/users.entity";
import { ItemCategory } from "../entities/itemCategory.entity";

// Controller to fetch all QR codes associated with a specific user ID
export const getQrCodesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log("GETTING QR CODES BY USER ID", req.params);
    const userId = req.params.userId;

    // Validate input: Ensure user ID is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch QR codes from the database for the specified user
    const qrCodes = await QrCode.find({
      where: { user_id: userId },
      select: {
        id: true,
        code: true,
        user_id: true,
        itemName: true,
        itemDetails: true,
        qrCodeType: {
          id: true,
        },
        itemCategory: {
          id: true,
        },
        isClaimed: true,
        // Add other fields you want to select
      },
      relations: {
        qrCodeType: true,
        itemCategory: true,
      },
    });

    // Handle case where no QR codes are found
    if (!qrCodes || qrCodes.length === 0) {
      return res.status(404).json({ message: "No QR codes found for this user" });
    }
    const qrCodesReturn = qrCodes.map((qrCode) => {
      return {
        ...qrCode,
        itemCategory: qrCode.itemCategory?.id,
        qrCodeType: qrCode.qrCodeType?.id,
      };
    });
    // Return the found QR codes
    console.log("QR CODES RETURN", qrCodesReturn);
    res.status(200).json(qrCodesReturn);
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
    console.log(req.body);
    const { email: userEmail, itemName, itemDetails, itemCategory, isClaimed } = req.body;

    // Validate required fields
    if (!reqQrCode) return res.status(400).json({ message: "QR code ID is required" });
    if (!userEmail) return res.status(400).json({ message: "User email is required" });
    // if (!itemName) return res.status(400).json({ message: "Item Name is required" });

    // Fetch QR code by code
    const qrCode = await QrCode.findOne({
      where: { code: reqQrCode },
      select: {
        id: true,
        code: true,
        user_id: true,
        qrCodeType: {
          id: true,
        },
        itemCategory: {
          id: true,
        },
        isClaimed: true,
        // Add other fields you want to select
      },
      relations: {
        qrCodeType: true,
        itemCategory: true,
      },
    });
    if (!qrCode) return res.status(404).json({ message: "QR Code not found" });
    console.log("qrCode", qrCode);
    // Find user ID based on email
    const userId = await User.findOne({ select: { id: true }, where: { email: userEmail } });
    if (!userId) return res.status(404).json({ message: "User not found" });
    console.log("userId", userId);
    // Update QR code details
    const updatedData = {
      user_id: userId.id,
      itemName: qrCode.itemName || itemName,
      itemDetails: qrCode.itemDetails || itemDetails,
      itemCategory: qrCode.itemCategory?.id || itemCategory,
      isClaimed,
    };
    console.log("updatedData", updatedData);
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

export const deleteQrCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const qrCodeId = req.params.qrCodeId;
    const qrCode = await QrCode.findOne({ where: { id: qrCodeId } });
    if (!qrCode) return res.status(404).json({ message: "QR Code not found" });
    await QrCode.delete({ id: qrCode.id });
    res.status(200).json({ message: "QR Code deleted successfully" });
  } catch (error) {
    console.error("Error deleting QR code", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    next(); // Ensure next middleware is called
  }
};
