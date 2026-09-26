import { Router } from "express";
import {
  createRoomController,
  deleteRoomController,
  getAllRoomsController,
  getRoomByIdController,
  updateRoomController,
} from "../../controller/room.controller.js";
import { validate } from "../../middleware/validate.js";
import { createRoomSchema, updateRoomSchema } from "../../dtos/room.dto.js";

const roomRouter = Router();

roomRouter.post("/", validate(createRoomSchema), createRoomController);
roomRouter.get("/", getAllRoomsController);
roomRouter.get("/:id", getRoomByIdController);
roomRouter.put("/:id", validate(updateRoomSchema), updateRoomController);
roomRouter.delete("/:id", deleteRoomController);

export default roomRouter;
