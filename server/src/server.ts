import express from "express";
import cors from "cors";
import { MatchService } from "./services/matchService";
import { SseService } from "./sse/sseService";
import { createEventsRouter } from "./routes/events";
import { createStateRouter } from "./routes/state";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
const matchService = new MatchService();
const sseService = new SseService();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(createEventsRouter(matchService, sseService));
app.use(createStateRouter(matchService));

matchService.on("stateUpdate", (state) => {
  sseService.broadcast(state);
});

app.get("/", (req, res) => {
  res.send("SSE soccer match server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
