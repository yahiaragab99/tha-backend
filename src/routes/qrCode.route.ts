import express from "express";
import {
  updateQrCode,
  getQrCodeByCode,
  getQrCodeById,
  getQrCodesByUserId,
  isQrCodeClaimed,
} from "../controllers/qrCode.controller";

const qrCodeRouter = express.Router();

qrCodeRouter.get("/user-qrs/:userId", getQrCodesByUserId);
qrCodeRouter.get("/code/:qrCodeCode", getQrCodeByCode);
qrCodeRouter.get("/id/:qrCodeId", getQrCodeById);
qrCodeRouter.get("/isClaimed/:qrCodeId", isQrCodeClaimed);
qrCodeRouter.put("/claim/:qrCodeCode", updateQrCode);

export default qrCodeRouter;
