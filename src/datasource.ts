import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  logging: true,
  synchronize: false,
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
});
