import { Request, Response } from "express";
import {
  createRoomCategoryService,
  deleteRoomCategoryService,
  getAllRoomCategoriesService,
  getRoomCategoryByIdService,
  updateRoomCategoryService,
} from "../service/roomCategory.service.js";
import { sendSuccess } from "../utils/responses/app.response.js";

export async function createRoomCategoryController(req: Request, res: Response) {
  const response = await createRoomCategoryService(req.body);
  sendSuccess(res, response, 201, "Room Category Created Successfully");
}

export async function getRoomCategoryByIdController(req: Request, res: Response) {
  const response = await getRoomCategoryByIdService(Number(req.params.id));
  sendSuccess(res, response, 200, "Room Category Found Successfully");
}

export async function getAllRoomCategoriesController(_req: Request, res: Response) {
  const response = await getAllRoomCategoriesService();
  sendSuccess(res, response, 200, "Room Categories Found Successfully");
}

export async function updateRoomCategoryController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const response = await updateRoomCategoryService(id, req.body);
  sendSuccess(res, response, 200, "Room Category Updated Successfully");
}

export async function deleteRoomCategoryController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const response = await deleteRoomCategoryService(id);
  sendSuccess(res, response, 200, "Room Category Deleted Successfully");
}
