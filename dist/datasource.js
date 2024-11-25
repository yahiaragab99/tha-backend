"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    logging: true,
    synchronize: false,
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: ["./src/entities/*.ts"],
    //   migrations: ["./src/migrations/*.ts"],
});
