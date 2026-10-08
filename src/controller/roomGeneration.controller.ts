import { Request, Response } from "express";
import { sendSuccess } from "../utils/responses/app.response.js";
import { addRoomGenerationJobToQueue } from "../producers/roomGeneration.producer.js";

export async function generateRoomController(req: Request, res: Response) {
  await addRoomGenerationJobToQueue(req.body);
  sendSuccess(res, "", 200, "Room generation request processed successfully");
}
