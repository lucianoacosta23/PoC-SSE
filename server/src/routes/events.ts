import { Router } from "express";
import type { MatchService } from "../services/matchService";
import type { SseService } from "../sse/sseService";
import { handleEventsConnection } from "../controllers/matchController";

export function createEventsRouter(matchService: MatchService, sseService: SseService): Router {
  const router = Router();

  router.get("/events", (req, res) => handleEventsConnection(matchService, sseService, req, res));

  return router;
}
