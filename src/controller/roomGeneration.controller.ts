import { Request, Response } from "express";
import { sendSuccess } from "../utils/responses/app.response.js";
import { generateRoom } from "../service/roomGeneration.service.js";

export async function generateRoomController(req: Request, res: Response) {
  const roomResponse = await generateRoom(req.body);
  sendSuccess(res, roomResponse, 201, "Rooms generated successfully");
}
