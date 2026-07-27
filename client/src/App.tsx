import { Scoreboard } from "./components/Scoreboard";
import { Timeline } from "./components/Timeline";
import { useMatchState } from "./hooks/useMatchState";

function App() {
  const { matchState, error } = useMatchState();

  return (
    <main className="app-shell">
      <section className="page-intro card">
        <div>
          <span className="tag">PoC SSE</span>
          <h1>Marcador en vivo</h1>
          <p>
            Simulación automática de Boca Juniors vs River Plate con estado único en el servidor.
            Cada segundo real equivale a un minuto de partido.
          </p>
        </div>
      </section>

      <Scoreboard matchState={matchState} />

      {error ? <div className="alert">{error}</div> : null}

      <Timeline events={matchState.events} />
    </main>
  );
}

export default App;
