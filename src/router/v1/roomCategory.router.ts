import { Router } from "express";
import {
  createRoomCategoryController,
  deleteRoomCategoryController,
  getAllRoomCategoriesController,
  getRoomCategoryByIdController,
  updateRoomCategoryController,
} from "../../controller/roomCategory.controller.js";
import { validate } from "../../middleware/validate.js";
import { createRoomCategorySchema, updateRoomCategorySchema } from "../../dtos/roomCategory.dto.js";

const roomCategoryRouter = Router();

roomCategoryRouter.post("/", validate(createRoomCategorySchema), createRoomCategoryController);
roomCategoryRouter.get("/", getAllRoomCategoriesController);
roomCategoryRouter.get("/:id", getRoomCategoryByIdController);
roomCategoryRouter.put("/:id", validate(updateRoomCategorySchema), updateRoomCategoryController);
roomCategoryRouter.delete("/:id", deleteRoomCategoryController);

export default roomCategoryRouter;
