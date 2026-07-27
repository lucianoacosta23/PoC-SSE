import type { MatchEvent } from "../types";

interface Props {
  events: MatchEvent[];
}

const eventIcons: Record<string, string> = {
  goal: "⚽",
  yellow: "🟨",
  red: "🟥",
  penalty: "🟠",
  substitution: "🔄",
  break: "⏸️",
  start: "▶️",
  end: "⛔"
};

function formatEventDescription(event: MatchEvent): string {
  let description = event.description;

  if (event.team) {
    const team = event.team;

    // Remove the duplicated icon that is displayed separately in the UI.
    description = description.replace(/^[^\w\d\s]+\s*/, "");

    // Remove redundant team labels when the event is already shown on the team's side.
    const teamLabelRegex = new RegExp(`^(Gol de ${team}:\s*|${team}:\s*)`, "i");
    description = description.replace(teamLabelRegex, "");
    description = description.replace(new RegExp(`\s*\(${team}\)\s*$`, "i"), "");
  }

  return description;
}

export function Timeline({ events }: Props) {
  if (events.length === 0) {
    return <p className="timeline-empty">Esperando el primer evento...</p>;
  }

  return (
    <div className="timeline card">
      <h2>Minuto a minuto</h2>
      <ul>
        {events.slice().reverse().map((event, index) => {
          const isHome = event.team === "Boca";
          const isAway = event.team === "River";
          const minuteLabel =
            event.type === "break"
              ? "Entretiempo"
              : event.type === "end"
              ? "Finalizado"
              : `${event.minute}'`;
          const description = formatEventDescription(event);

          if (!event.team) {
            return (
              <li key={`${event.minute}-${index}`} className="timeline-item neutral-event">
                <div className="timeline-neutral">
                  <span className="timeline-badge">{minuteLabel}</span>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </li>
            );
          }

          return (
            <li key={`${event.minute}-${index}`} className={`timeline-item ${isHome ? "home-event" : "away-event"}`}>
              <div className="timeline-side timeline-side--left">
                {isHome ? (
                  <div className="timeline-event-card">
                    <span className="timeline-icon">{eventIcons[event.type] ?? "🔶"}</span>
                    <p className="timeline-description">{description}</p>
                  </div>
                ) : null}
              </div>

              <div className="timeline-center">
                <span className="timeline-badge">{minuteLabel}</span>
              </div>

              <div className="timeline-side timeline-side--right">
                {isAway ? (
                  <div className="timeline-event-card timeline-event-card--right">
                    <p className="timeline-description">{description}</p>
                    <span className="timeline-icon">{eventIcons[event.type] ?? "🔶"}</span>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
