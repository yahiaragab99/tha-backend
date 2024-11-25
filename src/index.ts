// Import required modules
import express, { Request, Response, NextFunction } from "express";
import "dotenv/config"; // Loads environment variables from a .env file
import { redisClient } from "./redis"; // Redis client instance
import RedisStore from "connect-redis"; // Middleware for storing sessions in Redis
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import qrCodeRouter from "./routes/qrCode.route"; // Router for QR code-related endpoints
import userRouter from "./routes/user.route"; // Router for QR code-related endpoints
import { AppDataSource } from "./datasource"; // TypeORM data source
import { initializeApp } from "firebase/app";

const main = async () => {
  const app = express(); // Initialize an Express application

  // Log critical environment variables for debugging (ensure these variables are set in your .env file)
  console.log("INITIALIZING APP");
  console.log("REDIS URL:", process.env.REDIS_URL);
  console.log("DATABASE URL:", process.env.DATABASE_URL);
  console.log("PORT:", process.env.PORT);

  // Connect to the Redis client

  // Check if the Redis client is already connected or connecting
  if (redisClient.status === "ready") {
    try {
      await redisClient.connect();
      console.log("Redis client connected successfully.");
    } catch (err) {
      console.error("Error connecting to Redis:", err);
      process.exit(1); // Exit the application if Redis connection fails
    }
  } else {
    console.log("Redis client is already connected.");
  }

  // Initialize the TypeORM data source
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
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
  console.log("INITIALIZED FIREBASE");

  // Middleware to set CORS headers for all requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  // Additional CORS configuration for specific allowed origins
  app.use(
    cors({
      origin: [process.env.CLIENT_URI!],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true, // Enable credentials for CORS
    })
  );

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Mount QR code routes under "/qrCode"
  app.use("/qrCode", qrCodeRouter);
  app.use("/user", userRouter);

  // Default route to check if the server is running
  app.get("/", (_req: Request, res: Response) => {
    res.send("THA server is running");
  });

  // Start the Express server on the specified port
  const port = process.env.PORT || 3000; // Default to port 3000 if not specified
  app.listen(port, () => {
    console.log(`THA server is listening on port ${port}`);
  });
};

// Execute the main function and handle any errors
main().catch((err) => console.error("Application initialization error:", err));
