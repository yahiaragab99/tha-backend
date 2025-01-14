import { Request, Response } from "express";
import {
  addMessageService,
  deleteMessageService,
  getPresetsService,
  getUserMessagesService,
} from "../services/message.service";
import { logger } from "../utils/logger";

export const getUserMessages = async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const { success, message, items } = await getUserMessagesService(userId);
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message, items });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<any> => {
  const recipientId = req.params.userId;
  const messageBody = req.body.message;
  const presetId = req.body.presetId;
  const qrCodeId = req.body.qrCodeId;
  const senderPhoneNumber = req.body.senderPhoneNumber;
  if (!recipientId || !messageBody || !qrCodeId || !senderPhoneNumber)
    return res.status(400).json({ message: "Missing required fields" });
  try {
    const { success, message, messageId } = await addMessageService(
      recipientId,
      qrCodeId,
      presetId,
      messageBody,
      senderPhoneNumber
    );
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message, messageId });
  } catch (error) {}
};

export const getMessagePresets = async (req: Request, res: Response): Promise<any> => {
  try {
    const { success, message, items } = await getPresetsService();
    if (!success) return res.status(404).json({ message });
    logger.info(message);
    return res.status(200).json({ message, items });
  } catch (error) {}
};

export const deleteMessage = async (req: Request, res: Response): Promise<any> => {
  const messageId = req.params.id;
  if (!messageId) return res.status(400).json({ message: "Message ID is required" });
  try {
    const { success, message } = await deleteMessageService(messageId);
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message });
  } catch (error) {}
};
