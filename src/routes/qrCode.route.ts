import express from "express";
import {
  updateQrCode,
  getQrCodeByCode,
  getQrCodeById,
  getUserQrCodes,
  isQrCodeClaimed,
  deleteQrCode,
} from "../controllers/qrcode.controller";

const qrCodeRouter = express.Router();

qrCodeRouter.get("/user/:userId", getUserQrCodes);
qrCodeRouter.get("/code/:code", getQrCodeByCode);
qrCodeRouter.get("/id/:id", getQrCodeById);

qrCodeRouter.post("/isclaimed/:id", isQrCodeClaimed);
qrCodeRouter.put("/:id", updateQrCode);

qrCodeRouter.delete("/:id", deleteQrCode);

export default qrCodeRouter;
