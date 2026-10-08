import { Queue } from "bullmq";
import { getRedisConnectionObj } from "../config/redis.config.js";

export const ROOM_GENERATION_QUEUE = "queue-room-generation";

export const roomGenerationQueue = new Queue(ROOM_GENERATION_QUEUE, {
  connection: getRedisConnectionObj(),
});
