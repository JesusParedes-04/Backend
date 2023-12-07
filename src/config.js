import "dotenv/config";


export const CONNECTION_LOCAL_MONGO = process.env.CONNECTION_LOCAL_MONGO;
export const REMOTE_MONGO_URL = process.env.REMOTE_MONGO_URL;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const LOG_ENV = process.env.LOG_ENV || "DEVELOPMENT";
export const PORT = process.env.PORT