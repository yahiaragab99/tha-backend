import { Message } from "../entities/message.entity";
import { MessagePreset } from "../entities/messagePreset.entity";
import { logger } from "../utils/logger";

export const getUserMessagesService = async (
  userId: string
): Promise<{ success: boolean; message: string; items?: Partial<Message>[] }> => {
  try {
    const messages = await Message.createQueryBuilder("message")
      .leftJoinAndSelect("message.qrCode", "qrCode")
      .select(["message", "qrCode.itemName", "qrCode.itemDetails"])
      .where("message.recipientId = :userId", { userId })
      .getMany();
    if (!messages || messages.length === 0) return { success: false, message: "No messages found" };
    return { success: true, message: "Messages found", items: messages };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

export const addMessageService = async (
  recipientId: string,
  qrCodeId: string,
  presetId: string,
  message: string,
  senderPhoneNumber?: string
): Promise<{ success: boolean; message: string; messageId?: string }> => {
  try {
    const newMessage = Message.create({
      recipientId: recipientId,
      qrCodeId: qrCodeId,
      message: message,
      senderPhoneNumber: senderPhoneNumber,
      presetId: presetId,
      isPreset: !!presetId,
    });
    await newMessage.save();
    return {
      success: true,
      message: "Message added",
      messageId: newMessage.id,
    };
  } catch (error) {
    logger.error("Error adding message:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

export const getPresetsService = async (): Promise<{
  success: boolean;
  message: string;
  items?: MessagePreset[];
}> => {
  try {
    const presets = await MessagePreset.find();
    if (!presets || presets.length === 0) return { success: false, message: "No presets found" };
    return { success: true, message: "Presets found", items: presets };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

export const deleteMessageService = async (
  messageId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await Message.delete({ id: messageId });
    return { success: true, message: "Message deleted" };
  } catch (error) {
    logger.error("Error deleting message:", error);
    return { success: false, message: "Internal server error" };
  }
};
