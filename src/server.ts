import express from "express";
import { serverConfig } from "./config/index.js";
import v1Router from "./router/v1/index.router.js";
import { genericErrorHandler } from "./middleware/error.middleware.js";
import { routeNotFound } from "./middleware/route-not-found.js";
import { attachCorrelationId } from "./middleware/correlation.middleware.js";
import { connectDB } from "./config/prisma.js";
import { setupRoomGenerationWorker } from "./processors/roomGeneration.processor.js";
import { initRoomGenerationScheduler } from "./schedulers/roomGeneration.scheduler.js";

const app = express();

app.use(express.json());

app.use(attachCorrelationId);

app.use("/api/v1", v1Router);

app.use(routeNotFound);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
  await connectDB();
  setupRoomGenerationWorker();
  console.log("Room-Generation worker set up successfully");
  initRoomGenerationScheduler();
  console.log("Room-Generation scheduler set up successfully");
  console.log(`Server is running on port ${serverConfig.PORT}`);
});
