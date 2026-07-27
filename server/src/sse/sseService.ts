import type { Response } from "express";
import type { MatchState } from "../types/match";

export class SseService {
  private clients: Response[] = [];

  addClient(res: Response): void {
    this.clients.push(res);
  }

  removeClient(res: Response): void {
    this.clients = this.clients.filter((client) => client !== res);
  }

  broadcast(state: MatchState): void {
    const payload = `data: ${JSON.stringify(state)}\n\n`;
    this.clients.forEach((client) => {
      try {
        client.write(payload);
      } catch (_) {
        // ignore broken connections, they are cleaned up on close
      }
    });
  }

  sendToClient(res: Response, state: MatchState): void {
    const payload = `data: ${JSON.stringify(state)}\n\n`;
    res.write(payload);
  }
}
