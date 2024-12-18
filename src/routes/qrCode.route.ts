import express from "express";
import {
  updateQrCode,
  getQrCodeByCode,
  getQrCodeById,
  getQrCodesByUserId,
  isQrCodeClaimed,
  deleteQrCode,
} from "../controllers/qrcode.controller";

const qrCodeRouter = express.Router();

qrCodeRouter.get("/:userId", getQrCodesByUserId);
qrCodeRouter.get("/:code", getQrCodeByCode);
qrCodeRouter.get("/:id", getQrCodeById);

qrCodeRouter.post("/:id", isQrCodeClaimed);
qrCodeRouter.put("/:code", updateQrCode);

qrCodeRouter.delete("/:id", deleteQrCode);

export default qrCodeRouter;
