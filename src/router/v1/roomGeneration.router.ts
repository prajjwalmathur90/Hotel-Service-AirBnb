import { Router } from "express";
import { RoomGenerationJobSchema } from "../../dtos/roomGeneration.dto.js";
import { generateRoomController } from "../../controller/roomGeneration.controller.js";
import { validate } from "../../middleware/validate.js";

const RoomGenerationRouter = Router();

RoomGenerationRouter.post(
  "/",
  validate(RoomGenerationJobSchema),
  generateRoomController,
);

export default RoomGenerationRouter;
