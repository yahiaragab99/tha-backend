import express from "express";
import {
  deleteMessage,
  getMessagePresets,
  getUserMessages,
  sendMessage,
} from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.get("/user/:userId", getUserMessages);
messageRouter.post("/new/:userId", sendMessage);
messageRouter.get("/presets", getMessagePresets);
messageRouter.delete("/:id", deleteMessage);

export default messageRouter;
