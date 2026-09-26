import logger from "../config/logger.config.js";
import prisma from "../config/prisma.js";
import { CreateRoomDto, UpdateRoomDto } from "../dtos/room.dto.js";
import { notFound } from "../utils/errors/app.error.js";

export async function createRoom(roomData: CreateRoomDto) {
  const room = await prisma.room.create({
    data: roomData,
  });

  logger.info(`Room created: ${room.id}`);

  return room;
}

export async function getRoomById(id: number) {
  const room = await prisma.room.findUnique({
    where: {
      id,
    },
  });

  if (!room) {
    throw notFound("Room not found");
  }

  logger.info(`Room found: ${room.id}`);

  return room;
}

export async function getAllRooms() {
  const rooms = await prisma.room.findMany({
    where: {
      deletedAt: null,
    },
  });

  if (!rooms) {
    throw notFound("No rooms found");
  }

  logger.info("Rooms found");

  return rooms;
}

export async function updateRoom(id: number, roomData: UpdateRoomDto) {
  await getRoomById(id);

  const updatedRoom = await prisma.room.update({
    where: {
      id,
    },
    data: roomData,
  });

  logger.info(`Room updated: ${updatedRoom.id}`);

  return updatedRoom;
}

export async function softDeleteRoom(id: number) {
  const room = await getRoomById(id);

  if (!room) {
    throw notFound("Room not found");
  }

  const deletedRoom = await prisma.room.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  logger.info(`Room soft deleted: ${deletedRoom.id}`);

  return deletedRoom;
}
