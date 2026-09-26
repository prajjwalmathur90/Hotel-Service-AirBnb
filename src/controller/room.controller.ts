import { Request, Response } from "express";
import {
  createRoomService,
  deleteRoomService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomService,
} from "../service/room.service.js";
import { sendSuccess } from "../utils/responses/app.response.js";

export async function createRoomController(req: Request, res: Response) {
  const roomResponse = await createRoomService(req.body);
  sendSuccess(res, roomResponse, 201, "Room Created Successfully");
}

export async function getRoomByIdController(req: Request, res: Response) {
  const roomResponse = await getRoomByIdService(Number(req.params.id));
  sendSuccess(res, roomResponse, 200, "Room Found Successfully");
}

export async function getAllRoomsController(_req: Request, res: Response) {
  const roomResponse = await getAllRoomsService();
  sendSuccess(res, roomResponse, 200, "Rooms Found Successfully");
}

export async function updateRoomController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const roomResponse = await updateRoomService(id, req.body);
  sendSuccess(res, roomResponse, 200, "Room Updated Successfully");
}

export async function deleteRoomController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const roomResponse = await deleteRoomService(id);
  sendSuccess(res, roomResponse, 200, "Room Deleted Successfully");
}
