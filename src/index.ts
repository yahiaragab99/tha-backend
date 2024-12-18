import express from "express";
import "dotenv/config";
import { initializeAppDependencies } from "./utils/initializer";
import { configureMiddleware } from "./middleware";
import { configureRoutes } from "./routes";
import { logger } from "./utils/logger";

const main = async () => {
  const app = express();

  logger.info("INITIALIZING APP");

  try {
    await initializeAppDependencies();
    configureMiddleware(app);
    configureRoutes(app);

    const port = process.env.PORT || 3000;
    app.listen(port, () => logger.info(`Server is listening on port ${port}`));
  } catch (error) {
    logger.error("Application initialization error:", error);
    process.exit(1);
  }
};

main();
