import { CreateRoomDto, UpdateRoomDto } from "../dtos/room.dto.js";
import {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  softDeleteRoom,
} from "../repository/room.repository.js";

export async function createRoomService(roomData: CreateRoomDto) {
  return await createRoom(roomData);
}

export async function getRoomByIdService(id: number) {
  return await getRoomById(id);
}

export async function getAllRoomsService() {
  return await getAllRooms();
}

export async function updateRoomService(id: number, roomData: UpdateRoomDto) {
  return await updateRoom(id, roomData);
}

export async function deleteRoomService(id: number) {
  return await softDeleteRoom(id);
}
