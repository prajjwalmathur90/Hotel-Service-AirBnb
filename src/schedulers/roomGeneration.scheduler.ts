import cron from "node-cron";
import prisma from "../config/prisma.js";
import logger from "../config/logger.config.js";

export function initRoomGenerationScheduler() {
  // Run every day at 12:00 AM midnight
  cron.schedule(process.env.ROOM_CRON || "0 0 * * *", async () => {
    logger.info("Running room generation scheduler...");
    try {
      // Find the last date of availability for each room category
      const latestRooms = await prisma.room.groupBy({
        by: ["roomCategoryId"],
        _max: {
          dateOfAvailability: true,
        },
      });

      const roomsToCreate = [];

      for (const roomGroup of latestRooms) {
        if (roomGroup._max.dateOfAvailability) {
          const roomCategory = await prisma.roomCategory.findUnique({
            where: { id: roomGroup.roomCategoryId },
          });

          if (!roomCategory) continue;

          const nextDate = new Date(roomGroup._max.dateOfAvailability);
          nextDate.setDate(nextDate.getDate() + 1);

          roomsToCreate.push({
            hotelId: roomCategory.hotelId,
            roomCategoryId: roomCategory.id,
            dateOfAvailability: nextDate,
            price: roomCategory.price,
            roomType: roomCategory.roomType,
            roomCount: roomCategory.roomCount,
          });
        }
      }

      if (roomsToCreate.length > 0) {
        const result = await prisma.room.createMany({
          data: roomsToCreate,
          skipDuplicates: true,
        });
        logger.info(`Scheduler added ${result.count} new room instances.`);
      } else {
        logger.info("No new room instances to add.");
      }
    } catch (error) {
      logger.error("Error in room generation scheduler: ", error);
    }
  });
}
