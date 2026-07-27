export type MatchStatus = "not_started" | "live" | "finished";

export type MatchEventType = "start" | "goal" | "yellow" | "red" | "penalty" | "substitution" | "break" | "end";

export interface MatchEvent {
  minute: number;
  type: MatchEventType;
  team?: "Boca" | "River";
  player?: string;
  description: string;
}

export interface MatchState {
  minute: number;
  status: MatchStatus;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];

  // optional transient label set by server (e.g. 'Entretiempo', 'Finalizado')
  displayLabel?: string;
}
