import { Job, Worker } from "bullmq";
import { RoomGenerationJobDto } from "../dtos/roomGeneration.dto.js";
import { ROOM_GENERATION_QUEUE } from "../queues/roomGeneration.queue.js";
import { getRedisConnectionObj } from "../config/redis.config.js";
import { ROOM_GENERATION_PAYLOAD } from "../producers/roomGeneration.producer.js";
import logger from "../config/logger.config.js";
import { generateRoom } from "../service/roomGeneration.service.js";
import { badRequest } from "../utils/errors/app.error.js";

export const setupRoomGenerationWorker = () => {
  const roomGenerationProcessor = new Worker<RoomGenerationJobDto>(
    ROOM_GENERATION_QUEUE,
    async (job: Job) => {
      if (job.name !== ROOM_GENERATION_PAYLOAD) {
        throw badRequest("Invalid job");
      }

      const payload = job.data;

      await generateRoom(payload);

      logger.info(
        `Room generation processed successfully with payload : ${payload}`,
      );
    },
    {
      connection: getRedisConnectionObj(),
    },
  );

  roomGenerationProcessor.on("failed", () => {
    console.log("Room generation processing failed");
  });

  roomGenerationProcessor.on("completed", () => {
    console.log("Room generation processed successfully");
  });
};
