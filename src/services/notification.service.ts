import { Notification } from "../entities/notification.entity";
import { NotificationType } from "../entities/notificationType.entity";
import { logger } from "../utils/logger";

export const getUserNotificationsService = async (
  userId: string
): Promise<{ success: boolean; message: string; notifications?: Notification[] }> => {
  try {
    // const notifications = await Notification.find({
    //   where: {
    //     userId: userId,
    //   },
    // });
    const notifications = await Notification.createQueryBuilder("notification")
      .leftJoinAndSelect("notification.message", "message")
      .leftJoinAndSelect("notification.notificationType", "notificationType")
      .leftJoinAndSelect("notification.qrCode", "qrCode")
      .select([
        "notification.id as id",
        "notification.userId as userId",
        "notification.qrCodeId as qrCodeId",
        "notification.messageId as messageId",
        "notification.content as content",
        "notification.isRead as isRead",
        "notification.createdAt as createdAt",
        "notification.deletedAt as deletedAt",
        "message.message as message",
        "message.senderPhoneNumber as senderPhoneNumber",
        "notificationType.id as notificationTypeId",
        "notificationType.title as notificationTypeTitle",
        "notificationType.description as notificationTypeDescription",
        "qrCode.itemName as itemName",
        "qrCode.itemDetails as itemDetails",
      ])
      .where("notification.userId = :userId", { userId })
      .orderBy("notification.createdAt", "DESC")
      .getRawMany();
    logger.info({ notifications });
    if (!notifications || notifications.length === 0)
      return { success: false, message: "No notifications found for the user" };
    return { success: true, message: "User notifications found", notifications };
  } catch (error) {
    logger.error("Error getting user notifications:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const addNotificationService = async (
  userId: string,
  qrCodeId: string,
  notificationTypeId: string,
  messageId?: string,
  content?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const newNotification = Notification.create({
      userId: userId,
      qrCodeId: qrCodeId,
      messageId: messageId,
      notificationTypeId: notificationTypeId,
      content: content,
    });
    await newNotification.save();
    return { success: true, message: "Notification added" };
  } catch (error) {
    logger.error("Error adding notification:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const getNotificationTypesService = async (): Promise<{
  success: boolean;
  message: string;
  notificationTypes?: NotificationType[];
}> => {
  try {
    const notificationTypes = await NotificationType.find();
    if (!notificationTypes || notificationTypes.length === 0)
      return { success: false, message: "No notification types found" };
    return { success: true, message: "Notification types found", notificationTypes };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

export const deleteNotificationService = async (
  notificationId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const notification = await Notification.findOne({ where: { id: notificationId } });
    if (!notification) return { success: false, message: "Notification not found" };
    await Notification.delete({ id: notificationId });
    return { success: true, message: "Notification deleted" };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

export const readNotificationService = async (
  notificationId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const notification = await Notification.findOne({ where: { id: notificationId } });
    if (!notification) return { success: false, message: "Notification not found" };
    notification.isRead = true;
    await notification.save();
    return { success: true, message: "Notification marked as read" };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};
