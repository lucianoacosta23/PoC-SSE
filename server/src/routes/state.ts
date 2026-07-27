import { Router } from "express";
import type { MatchService } from "../services/matchService";
import { handleStateRequest } from "../controllers/matchController";

export function createStateRouter(matchService: MatchService): Router {
  const router = Router();

  router.get("/api/state", (req, res) => handleStateRequest(matchService, req, res));

  return router;
}
