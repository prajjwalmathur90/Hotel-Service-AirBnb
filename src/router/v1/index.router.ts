import { Router } from "express";
import pingRouter from "./ping.router.js";
import { validate } from "../../middleware/validate.js";
import { pingValidateSchema } from "../../dtos/ping.dto.js";
import hotelRouter from "./hotel.router.js";
import roomRouter from "./room.router.js";
import roomCategoryRouter from "./roomCategory.router.js";

const v1Router = Router();

v1Router.use("/ping", validate(pingValidateSchema), pingRouter);
v1Router.use("/hotel", hotelRouter);
v1Router.use("/room", roomRouter);
v1Router.use("/room-category", roomCategoryRouter);

export default v1Router;
