import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_CLUSTER = process.env.DB_CLUSTER;
