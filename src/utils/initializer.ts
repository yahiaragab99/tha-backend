import { AppDataSource } from "../datasource";
import { redisClient } from "../redis";
import { logger } from "./logger";
import { initializeApp } from "firebase/app";

export const initializeAppDependencies = async () => {
  // Redis
  if (redisClient.status === "ready") {
    try {
      await redisClient.connect();
      logger.info("Redis client connected successfully.");
    } catch (err) {
      logger.error("Error connecting to Redis:", err);
      throw new Error("Redis connection failed.");
    }
  }

  // TypeORM
  try {
    await AppDataSource.initialize();
    logger.info("Data Source has been initialized!");
  } catch (err) {
    logger.error("Error during Data Source initialization", err);
    throw new Error("Database connection failed.");
  }

  // Firebase
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  initializeApp(firebaseConfig);
  logger.info("Firebase initialized.");
};
