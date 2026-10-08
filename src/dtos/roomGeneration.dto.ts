import z from "zod";

export const RoomgenerationRequestSchema = z.object({
  roomCategoryId: z.number().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  scheduledType: z.enum(["immediate", "scheduled"]).default("immediate"),
  scheduledAt: z.string().datetime().optional(),
  priceOverride: z.number().positive().optional(),
});

export type RoomGenerationRequestDto = z.infer<
  typeof RoomgenerationRequestSchema
>;

export const RoomGenerationJobSchema = z.object({
  roomCategoryId: z.number().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  priceOverride: z.number().positive().optional(),
  batchSize: z.number().positive().default(100),
});

export type RoomGenerationJobDto = z.infer<typeof RoomGenerationJobSchema>;

export interface RoomgenerationResponse {
  success: boolean;
  totalRoomsCreated: number;
  totalRoomsProcessed: number;
  errors: string[];
  jobId: string;
}
