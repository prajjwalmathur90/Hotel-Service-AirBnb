import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  REDIS_PORT: number;
  REDIS_HOST: string;
  REDIS_PASSWORD?: string;
};

dotenv.config();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "redispassword",
};
