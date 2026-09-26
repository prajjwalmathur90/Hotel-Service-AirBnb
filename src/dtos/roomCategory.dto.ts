import z from "zod";

const roomTypeEnum = z.enum(["SINGLE", "DOUBLE", "FAMILY", "DELUXE", "SUITE"]);

export const createRoomCategorySchema = z.object({
  hotelId: z.number().int().positive(),
  price: z.number().int().positive(),
  roomType: roomTypeEnum,
  roomCount: z.number().int().positive(),
});

export const updateRoomCategorySchema = createRoomCategorySchema.partial();

export type CreateRoomCategoryDto = z.infer<typeof createRoomCategorySchema>;
export type UpdateRoomCategoryDto = z.infer<typeof updateRoomCategorySchema>;
