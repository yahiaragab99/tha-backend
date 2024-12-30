import express from "express";
import {
  addNotification,
  deleteNotification,
  getNotificationTypes,
  getUserNotifications,
  readNotification,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get("/user/:userId", getUserNotifications);
notificationRouter.get("/types", getNotificationTypes);
notificationRouter.post("/new", addNotification);

notificationRouter.delete("/:id", deleteNotification);
notificationRouter.put("/read/:id", readNotification);

export default notificationRouter;
