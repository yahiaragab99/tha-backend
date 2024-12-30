import { Request, Response } from "express";
import {
  addNotificationService,
  deleteNotificationService,
  getNotificationTypesService,
  getUserNotificationsService,
  readNotificationService,
} from "../services/notification.service";
export const getUserNotifications = async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const { success, message, notifications } = await getUserNotificationsService(userId);
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message, items: notifications });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addNotification = async (req: Request, res: Response): Promise<any> => {
  const userId = req.body.userId;
  const qrCodeId = req.body.qrCodeId;
  const messageId = req.body.messageId;
  const notificationTypeId = req.body.notificationTypeId;
  const content = req.body.content;
  if (!userId || !qrCodeId || !notificationTypeId)
    return res.status(400).json({ message: "Notification is required" });
  try {
    const { success, message } = await addNotificationService(
      userId,
      qrCodeId,
      notificationTypeId,
      messageId,
      content
    );
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotificationTypes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { success, message, notificationTypes } = await getNotificationTypesService();
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message, items: notificationTypes });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<any> => {
  const notificationId = req.params.id;
  if (!notificationId) return res.status(400).json({ message: "Notification ID is required" });
  try {
    const { success, message } = await deleteNotificationService(notificationId);
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const readNotification = async (req: Request, res: Response): Promise<any> => {
  const notificationId = req.params.id;
  if (!notificationId) return res.status(400).json({ message: "Notification ID is required" });
  try {
    const { success, message } = await readNotificationService(notificationId);
    if (!success) return res.status(404).json({ message });
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
