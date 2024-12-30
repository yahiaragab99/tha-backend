import { Request, Response } from "express";
import { logger } from "../utils/logger";
import {
  deleteQrCodeService,
  getQrCodeByCodeService,
  getQrCodeByIdService,
  getUserQrCodesService,
  isQrCodeClaimedService,
  updateQrCodeService,
} from "../services/qrcode.service";

// Controller to fetch all QR codes associated with a specific user ID
export const getUserQrCodes = async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const { success, message, qrCodes } = await getUserQrCodesService(userId);
    if (!success) return res.status(404).json({ message });
    logger.info(message);
    return res.status(200).json({ message, items: qrCodes });
  } catch (error) {
    console.error("Error getting QR codes", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to fetch a QR code by its unique code
export const getQrCodeByCode = async (req: Request, res: Response): Promise<any> => {
  const reqQrCode = req.params.code;
  if (!reqQrCode) return res.status(400).json({ message: "QR Code is required" });
  try {
    const { success, message, qrCode } = await getQrCodeByCodeService(reqQrCode);
    if (!success) return res.status(404).json({ message });
    logger.info(message);
    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Error getting QR code", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to fetch a QR code by its ID
export const getQrCodeById = async (req: Request, res: Response): Promise<any> => {
  const qrCodeId = req.params.id;
  if (!qrCodeId) return res.status(400).json({ message: "QR Code ID is required" });
  try {
    const { success, message, qrCode } = await getQrCodeByIdService(qrCodeId);
    if (!success) return res.status(404).json({ message });
    logger.info(message);
    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Error getting QR code", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to update a QR code's details
export const updateQrCode = async (req: Request, res: Response): Promise<any> => {
  const qrCodeId = req.params.id;
  const { itemName, itemDetails, itemCategoryId, isClaimed, userId } = req.body;
  if (!qrCodeId) return res.status(400).json({ message: "QR code ID is required" });
  try {
    const { success, message, qrCode } = await updateQrCodeService(
      qrCodeId,
      itemName,
      itemDetails,
      itemCategoryId,
      isClaimed,
      userId
    );
    if (!success) return res.status(404).json({ message });
    logger.info(message);
    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Error updating QR code", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to check if a QR code is claimed
export const isQrCodeClaimed = async (req: Request, res: Response): Promise<any> => {
  const qrCodeId = req.params.id;
  if (!qrCodeId) return res.status(400).json({ message: "QR code ID is required" });
  try {
    const { success, message, qrCode } = await isQrCodeClaimedService(qrCodeId);
    if (!success) return res.status(404).json({ message });
    logger.info(message);
    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Error checking QR code claim status", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to delete a QR code
export const deleteQrCode = async (req: Request, res: Response): Promise<any> => {
  const qrCodeId = req.params.id;
  if (!qrCodeId) return res.status(400).json({ message: "QR code ID is required" });
  logger.info({ qrCodeId });
  try {
    const { success, message } = await deleteQrCodeService(qrCodeId);
    if (!success) return res.status(404).json({ message });
    logger.info(message);
    res.status(200).json(message);
  } catch (error) {
    console.error("Error deleting QR code", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
