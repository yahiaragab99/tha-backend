import { Express } from "express";
import qrCodeRouter from "./qrcode.route";
import userRouter from "./user.route";
import categoryRouter from "./category.route";
import { protect } from "../utils/auth";

export const configureRoutes = (app: Express) => {
  app.use("/qrcode", protect, qrCodeRouter);
  app.use("/category", protect, categoryRouter);
  app.use("/auth", userRouter);

  app.get("/", (_req, res) => {
    res.send("THA server is running");
  });
};
