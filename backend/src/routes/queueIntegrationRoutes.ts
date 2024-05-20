import { Router } from "express";
import isAuth from "../middleware/isAuth";

import * as QueueIntegrationController from "../controllers/QueueIntegrationController";

const queueIntegrationRoutes = Router();

queueIntegrationRoutes.get("/queueIntegration", isAuth, QueueIntegrationController.index);

queueIntegrationRoutes.post("/queueIntegration", isAuth, QueueIntegrationController.store);

queueIntegrationRoutes.get("/queueIntegration/:integrationId", isAuth, QueueIntegrationController.show);

queueIntegrationRoutes.put("/queueIntegration/:integrationId", isAuth, QueueIntegrationController.update);

queueIntegrationRoutes.delete("/queueIntegration/:integrationId", isAuth, QueueIntegrationController.remove);

export default queueIntegrationRoutes;