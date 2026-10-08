import logger from "../config/logger.config.js";
import prisma from "../config/prisma.js";
import {
  CreateRoomCategoryDto,
  UpdateRoomCategoryDto,
} from "../dtos/roomCategory.dto.js";
import { notFound } from "../utils/errors/app.error.js";

export async function createRoomCategory(data: CreateRoomCategoryDto) {
  const roomCategory = await prisma.roomCategory.create({
    data,
  });

  logger.info(`RoomCategory created: ${roomCategory.id}`);

  return roomCategory;
}

export async function getRoomCategoryById(id: number) {
  const roomCategory = await prisma.roomCategory.findUnique({
    where: {
      id,
    },
  });

  if (!roomCategory) {
    throw notFound("Room category not found");
  }

  logger.info(`RoomCategory found: ${roomCategory.id}`);

  return roomCategory;
}

export async function getAllRoomCategories() {
  const categories = await prisma.roomCategory.findMany({
    where: {
      deletedAt: null,
    },
  });

  if (!categories) {
    throw notFound("No room categories found");
  }

  logger.info("Room categories found");

  return categories;
}

export async function updateRoomCategory(
  id: number,
  data: UpdateRoomCategoryDto,
) {
  const roomCategory = await getRoomCategoryById(id);

  if (!roomCategory) {
    throw notFound("Room category not found");
  }

  const updatedCategory = await prisma.roomCategory.update({
    where: {
      id,
    },
    data,
  });

  logger.info(`RoomCategory updated: ${updatedCategory.id}`);

  return updatedCategory;
}

export async function softDeleteRoomCategory(id: number) {
  const category = await getRoomCategoryById(id);

  if (!category) {
    throw notFound("Room category not found");
  }

  const deletedCategory = await prisma.roomCategory.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  logger.info(`RoomCategory soft deleted: ${deletedCategory.id}`);

  return deletedCategory;
}
