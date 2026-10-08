import { RoomGenerationJobDto } from "../dtos/roomGeneration.dto.js";
import { roomGenerationQueue } from "../queues/roomGeneration.queue.js";

export const ROOM_GENERATION_PAYLOAD = "payload-room-generation";

export const addRoomGenerationJobToQueue = async (
  payload: RoomGenerationJobDto,
) => {
  await roomGenerationQueue.add(ROOM_GENERATION_PAYLOAD, payload);
};
