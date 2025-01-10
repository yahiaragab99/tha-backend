import { QrCode } from "../entities/qrCode.entity";
import { logger } from "../utils/logger";

export const getUserQrCodesService = async (
  userId: string
): Promise<{ success: boolean; message: string; qrCodes?: QrCode[] }> => {
  try {
    const userQrCodes = await QrCode.find({
      where: { user_id: userId },
    });
    // logger.info({ userQrCodes });
    if (!userQrCodes || userQrCodes.length === 0)
      return { success: false, message: "No QR codes found for the user" };
    return { success: true, message: "User QR codes found", qrCodes: userQrCodes };
  } catch (error) {
    logger.error("Error getting user QR codes:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const getQrCodeByCodeService = async (
  code: string
): Promise<{ success: boolean; message: string; qrCode?: QrCode }> => {
  try {
    const qrCode = await QrCode.findOne({ where: { code: code } });
    if (!qrCode) return { success: false, message: "QR code not found" };
    return { success: true, message: "QR code found", qrCode };
  } catch (error) {
    logger.error("Error getting QR code:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const getQrCodeByIdService = async (
  id: string
): Promise<{ success: boolean; message: string; qrCode?: QrCode }> => {
  try {
    const qrCode = await QrCode.findOne({ where: { id: id } });
    if (!qrCode) return { success: false, message: "QR code not found" };
    return { success: true, message: "QR code found", qrCode };
  } catch (error) {
    logger.error("Error getting QR code:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const updateQrCodeService = async (
  code: string,
  name?: string,
  details?: string,
  categoryId?: string,
  isClaimed?: boolean,
  userId?: string
): Promise<{ success: boolean; message: string; qrCode?: Partial<QrCode> }> => {
  try {
    const qrCode = await QrCode.findOne({ where: { id: code } });
    logger.info({ qrCode });
    if (!qrCode) return { success: false, message: "QR code not found" };
    const updatedQrCode: Partial<QrCode> = {
      ...qrCode,
      itemName: name ?? qrCode.itemName,
      itemDetails: details ?? qrCode.itemDetails,
      itemCategoryId: categoryId ?? qrCode.itemCategoryId,
      isClaimed: isClaimed ?? qrCode.isClaimed,
      user_id: userId ?? qrCode.user_id,
    };
    logger.info({ updatedQrCode });
    await QrCode.save(updatedQrCode);
    return { success: true, message: "QR code updated", qrCode: updatedQrCode };
  } catch (error) {
    logger.error("Error updating QR code:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const isQrCodeClaimedService = async (
  id: string
): Promise<{ success: boolean; message: string; qrCode?: QrCode }> => {
  try {
    const qrCode = await QrCode.findOne({ where: { id: id } });
    if (!qrCode) return { success: false, message: "QR code not found" };
    return { success: true, message: "QR code found", qrCode: qrCode };
  } catch (error) {
    logger.error("Error getting QR code:", error);
    return { success: false, message: "Internal server error" };
  }
};

export const deleteQrCodeService = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const qrCode = await QrCode.findOne({ where: { id: id } });
    logger.info({ qrCode });
    if (!qrCode) return { success: false, message: "QR code not found" };
    await QrCode.delete({ id: qrCode.id });
    return { success: true, message: "QR code deleted" };
  } catch (error) {
    logger.error("Error deleting QR code:", error);
    return { success: false, message: "Internal server error" };
  }
};
