import express from "express";
import {
  updateQrCode,
  getQrCodeByCode,
  getQrCodeById,
  getQrCodesByUserId,
  isQrCodeClaimed,
  deleteQrCode,
  getItemCategories,
} from "../controllers/qrcode.controller";

const qrCodeRouter = express.Router();

qrCodeRouter.get("/user-qrs/:userId", getQrCodesByUserId);
qrCodeRouter.get("/code/:qrCodeCode", getQrCodeByCode);
qrCodeRouter.get("/id/:qrCodeId", getQrCodeById);
qrCodeRouter.get("/is-claimed/:qrCodeId", isQrCodeClaimed);
qrCodeRouter.put("/claim/:qrCodeCode", updateQrCode);
qrCodeRouter.delete("/delete/:qrCodeId", deleteQrCode);
qrCodeRouter.get("/categories", getItemCategories);

export default qrCodeRouter;
