import { EventEmitter } from "events";
import { matchEvents } from "../match/events";
import type { MatchEvent, MatchState } from "../types/match";

const HOME_TEAM = "Boca Juniors";
const AWAY_TEAM = "River Plate";
const INITIAL_STATE: MatchState = {
  minute: 0,
  status: "not_started",
  homeTeam: HOME_TEAM,
  awayTeam: AWAY_TEAM,
  homeScore: 0,
  awayScore: 0,
  events: []
};

const MATCH_DURATION = Math.max(...matchEvents.map((event) => event.minute));

export class MatchService extends EventEmitter {
  private state: MatchState;
  private eventIndex = 0;
  private intervalId: NodeJS.Timeout | null = null;
  private intermissionTimeoutId: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.state = { ...INITIAL_STATE, events: [] };
    this.startMatch();
  }

  getState(): MatchState {
    return { ...this.state, events: [...this.state.events] };
  }

  private startMatch(): void {
    this.state = { ...INITIAL_STATE, events: [] };
    this.eventIndex = 0;
    // make sure any transient label is cleared
    delete this.state.displayLabel;
    this.state.status = "live";
    this.emitState();
    this.processEventsAtMinute(0);
    this.emitState();
    this.scheduleTick();
  }

  private scheduleTick(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  private pauseForIntermission(): void {
    // pause the ticking, set a display label and notify clients
    this.cleanupTimer();
    this.state.displayLabel = "Entretiempo";
    this.emitState();

    this.intermissionTimeoutId = setTimeout(() => {
      this.intermissionTimeoutId = null;
      // clear the intermission label and resume ticks
      delete this.state.displayLabel;
      this.emitState();
      if (this.state.status === "live") {
        this.scheduleTick();
      }
    }, 10000);
  }

  private tick(): void {
    if (this.state.status !== "live") {
      return;
    }

    if (this.state.minute >= MATCH_DURATION) {
      this.endMatch();
      return;
    }

    this.state.minute += 1;
    this.processEventsAtMinute(this.state.minute);

    if (this.state.status === "live") {
      this.emitState();
    }
  }

  private processEventsAtMinute(minute: number): void {
    while (this.eventIndex < matchEvents.length && matchEvents[this.eventIndex].minute === minute) {
      const event = matchEvents[this.eventIndex];
      this.applyEvent(event);
      this.state.events.push(event);
      this.eventIndex += 1;

      if (event.type === "break") {
        this.pauseForIntermission();
      }

      if (event.type === "end") {
        // set a final label so UI can show a single "Finalizado"
        this.state.displayLabel = "Finalizado";
        this.endMatch();
        return;
      }
    }
  }

  private applyEvent(event: MatchEvent): void {
    if (event.type === "goal") {
      if (event.team === "Boca") {
        this.state.homeScore += 1;
      } else if (event.team === "River") {
        this.state.awayScore += 1;
      }
    }
  }

  private emitState(): void {
    this.emit("stateUpdate", this.getState());
  }

  private endMatch(): void {
    this.state.status = "finished";
    this.emitState();
    this.cleanupTimer();
    setTimeout(() => {
      this.startMatch();
    }, 30000);
  }

  private cleanupTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.intermissionTimeoutId) {
      clearTimeout(this.intermissionTimeoutId);
      this.intermissionTimeoutId = null;
    }
  }
}
