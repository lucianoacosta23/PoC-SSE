import type { MatchState } from "../types";

const EVENTS_URL = import.meta.env.VITE_EVENTS_URL || "http://localhost:4000/events";

export function createMatchEventSource(onState: (state: MatchState) => void, onError: (message: string) => void): EventSource {
  const source = new EventSource(EVENTS_URL);

  source.onmessage = (event) => {
    try {
      const state = JSON.parse(event.data) as MatchState;
      onState(state);
    } catch {
      onError("No se pudo leer el estado del servidor.");
    }
  };

  source.onerror = () => {
    onError("Error de conexión. Reintentando...");
  };

  return source;
}
