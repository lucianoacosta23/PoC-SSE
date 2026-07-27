import { useEffect, useState } from "react";
import type { MatchState } from "../types";
import { createMatchEventSource } from "../services/sse";

const initialState: MatchState = {
  minute: 0,
  status: "not_started",
  homeTeam: "Boca Juniors",
  awayTeam: "River Plate",
  homeScore: 0,
  awayScore: 0,
  events: []
};

export function useMatchState() {
  const [matchState, setMatchState] = useState<MatchState>(initialState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = createMatchEventSource(
      (state) => {
        setMatchState(state);
        setError(null);
      },
      (message) => {
        setError(message);
      }
    );

    return () => {
      source.close();
    };
  }, []);

  return { matchState, error };
}
