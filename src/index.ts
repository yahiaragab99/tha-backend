// Import required modules
import express, { Request, Response, NextFunction } from "express";
import "dotenv/config"; // Loads environment variables from a .env file
import { redisClient } from "./redis"; // Redis client instance
import RedisStore from "connect-redis"; // Middleware for storing sessions in Redis
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import qrCodeRouter from "./routes/qrcode.route"; // Router for QR code-related endpoints
import userRouter from "./routes/user.route"; // Router for QR code-related endpoints
import { AppDataSource } from "./datasource"; // TypeORM data source
import { initializeApp } from "firebase/app";
import session from "express-session";
import { COOKIE_NAME } from "./constants";
import bodyParser from "body-parser";
import morgan from "morgan";
import { logger } from "./utils/logger";

/*
  TODO clean up routes
  
  
  TODO add error monitoring middleware
*/
const main = async () => {
  const app = express(); // Initialize an Express application
  const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
  const sessionConfig = {
    secret: process.env.SESSION_SECRET!,
    name: COOKIE_NAME!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "strict" as "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
    store: new RedisStore({ client: redisClient }),
  };

  // Log critical environment variables for debugging (ensure these variables are set in your .env file)
  logger.info("INITIALIZING APP");
  logger.info(`REDIS URL: ${process.env.REDIS_URL}`);
  logger.info(`DATABASE URL ${process.env.DATABASE_URL}`);
  logger.info(`PORT ${process.env.PORT}`);

  // Connect to the Redis client

  // Check if the Redis client is already connected or connecting
  if (redisClient.status === "ready") {
    try {
      await redisClient.connect();
      logger.info("Redis client connected successfully.");
    } catch (err) {
      logger.error("Error connecting to Redis:", err);
      process.exit(1); // Exit the application if Redis connection fails
    }
  } else {
    logger.info("Redis client is already connected.");
  }

  // Initialize the TypeORM data source
  AppDataSource.initialize()
    .then(() => {
      logger.info("Data Source has been initialized!");
    })
    .catch((err) => {
      logger.error("Error during Data Source initialization", err);
    });

  // Initialize Firebase app for notifs
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };
  const firebaseApp = initializeApp(firebaseConfig);
  logger.info("INITIALIZED FIREBASE");

  // Middleware to set CORS headers for all requests
  app.use(morgan("dev"));
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  // Middleware to parse cookies
  app.use(cookieParser());
  app.use(
    cors({
      origin: [process.env.CLIENT_URI!, process.env.IOS_CLIENT_URI!],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
  // Additional CORS configuration for specific allowed origins

  app.use(session(sessionConfig));
  app.use(bodyParser.json());

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Mount QR code routes under "/qrCode"
  app.use("/qr-code", qrCodeRouter);
  app.use("/auth", userRouter);

  // Default route to check if the server is running
  app.get("/", (_req: Request, res: Response) => {
    res.send("THA server is running");
  });

  // Start the Express server on the specified port
  const port = process.env.PORT || 3000; // Default to port 3000 if not specified
  app.listen(port, () => {
    logger.info(`THA server is listening on port ${port}`);
  });
};

// Execute the main function and handle any errors
main().catch((err) => logger.error("Application initialization error:", err));
