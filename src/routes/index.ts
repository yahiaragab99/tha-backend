import { Express } from "express";
import qrCodeRouter from "./qrcode.route";
import userRouter from "./user.route";
import categoryRouter from "./category.route";
import messageRouter from "./message.route";
import { protect } from "../utils/auth";
import notificationRouter from "./notification.route";

export const configureRoutes = (app: Express) => {
  app.use("/qrcode", qrCodeRouter);
  app.use("/message", messageRouter);
  app.use("/notification", notificationRouter);
  app.use("/category", protect, categoryRouter);
  app.use("/auth", userRouter);

  app.get("/", (_req, res) => {
    res.send("THA server is running");
  });
};
