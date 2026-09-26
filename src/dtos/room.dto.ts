import z from "zod";

const roomTypeEnum = z.enum(["SINGLE", "DOUBLE", "FAMILY", "DELUXE", "SUITE"]);

export const createRoomSchema = z.object({
  hotelId: z.number().int().positive(),
  roomCategoryId: z.number().int().positive(),
  dateOfAvailability: z.coerce.date(),
  price: z.number().int().positive(),
  roomType: roomTypeEnum,
  roomCount: z.number().int().positive(),
});

export const updateRoomSchema = createRoomSchema.partial();

export type CreateRoomDto = z.infer<typeof createRoomSchema>;
export type UpdateRoomDto = z.infer<typeof updateRoomSchema>;
