import express, { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import morgan from "morgan";
import { redisClient } from "../redis";
import RedisStore from "connect-redis";
import { COOKIE_NAME } from "../constants";

export const configureMiddleware = (app: Express) => {
  const sessionConfig = {
    secret: process.env.SESSION_SECRET!,
    name: COOKIE_NAME!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "strict" as const,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
    store: new RedisStore({ client: redisClient }),
  };

  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(
    cors({
      origin: [process.env.CLIENT_URI!, process.env.IOS_CLIENT_URI!],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
  app.use(session(sessionConfig));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
};
