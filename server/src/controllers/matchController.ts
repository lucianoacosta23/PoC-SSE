import type { Request, Response } from "express";
import type { MatchService } from "../services/matchService";
import type { SseService } from "../sse/sseService";

export function handleEventsConnection(matchService: MatchService, sseService: SseService, req: Request, res: Response): void {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  res.flushHeaders();

  sseService.addClient(res);
  sseService.sendToClient(res, matchService.getState());

  req.on("close", () => {
    sseService.removeClient(res);
  });
}

export function handleStateRequest(matchService: MatchService, req: Request, res: Response): void {
  res.json(matchService.getState());
}
