import { CreateRoomCategoryDto, UpdateRoomCategoryDto } from "../dtos/roomCategory.dto.js";
import {
  createRoomCategory,
  getRoomCategoryById,
  getAllRoomCategories,
  updateRoomCategory,
  softDeleteRoomCategory,
} from "../repository/roomCategory.repository.js";

export async function createRoomCategoryService(data: CreateRoomCategoryDto) {
  return await createRoomCategory(data);
}

export async function getRoomCategoryByIdService(id: number) {
  return await getRoomCategoryById(id);
}

export async function getAllRoomCategoriesService() {
  return await getAllRoomCategories();
}

export async function updateRoomCategoryService(id: number, data: UpdateRoomCategoryDto) {
  return await updateRoomCategory(id, data);
}

export async function deleteRoomCategoryService(id: number) {
  return await softDeleteRoomCategory(id);
}
