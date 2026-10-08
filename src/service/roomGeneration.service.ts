import { Prisma } from "../../generated/prisma/client.js";
import { RoomGenerationJobDto } from "../dtos/roomGeneration.dto.js";
import { CreateRoomDto } from "../dtos/room.dto.js";
import {
  bulkCreate,
  findByRoomcategoryAndDate,
} from "../repository/room.repository.js";
import { getRoomCategoryById } from "../repository/roomCategory.repository.js";
import { badRequest, notFound } from "../utils/errors/app.error.js";
import logger from "../config/logger.config.js";

type RoomCategory = Prisma.RoomCategoryGetPayload<{}>;

export async function generateRoom(jobData: RoomGenerationJobDto) {
  let totalRoomsCreated = 0;
  let totalDatesProcessed = 0;

  const roomCategory = await getRoomCategoryById(jobData.roomCategoryId);

  if (!roomCategory) {
    throw notFound("Room category not found");
  }

  const startDate = new Date(jobData.startDate);
  const endDate = new Date(jobData.endDate);

  if (startDate > endDate) {
    throw badRequest("Start date must be before end date");
  }

  if (startDate < new Date()) {
    throw badRequest("Start date cannot be in the past");
  }

  const totalDays =
    Math.ceil(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  logger.info(`Generating rooms for ${totalDays} days`);

  const batchSize = jobData.batchSize || Number(process.env.BATCH_SIZE);

  const currDate = new Date(startDate);

  while (currDate < endDate) {
    const batchEndDate = new Date(endDate);

    batchEndDate.setDate(batchEndDate.getDate() + batchSize);

    if (batchEndDate > endDate) {
      batchEndDate.setTime(endDate.getTime());
    }

    const batchResult = await processDateBatch(
      roomCategory,
      currDate,
      batchEndDate,
      jobData.priceOverride,
    );

    totalRoomsCreated += batchResult.roomsCreated;
    totalDatesProcessed += batchResult.dateProcessed;

    currDate.setTime(currDate.getTime() + batchSize);
  }

  return {
    totalRoomsCreated,
    totalDatesProcessed,
  };
}

export async function processDateBatch(
  roomCategory: RoomCategory,
  startDate: Date,
  endDate: Date,
  priceOverride?: number,
) {
  let roomsCreated = 0;
  let dateProcessed = 0;
  const roomsToCreate: CreateRoomDto[] = [];

  const currDate = new Date(startDate);

  while (currDate <= endDate) {
    const existingRoom = await findByRoomcategoryAndDate(
      roomCategory.id,
      currDate,
    );

    if (!existingRoom) {
      roomsToCreate.push({
        hotelId: roomCategory.hotelId,
        roomCategoryId: roomCategory.id,
        dateOfAvailability: new Date(currDate),
        price: priceOverride || roomCategory.price,
        roomType: roomCategory.roomType,
        roomCount: roomCategory.roomCount,
      });
    }

    currDate.setDate(currDate.getDate() + 1);
    dateProcessed++;
  }

  if (roomsToCreate.length > 0) {
    await bulkCreate(roomsToCreate);
    roomsCreated += roomsToCreate.length;
  }

  return {
    roomsCreated,
    dateProcessed,
  };
}
