import type { MatchState } from "../types";

interface Props {
  matchState: MatchState;
}

function teamLogo(team: string): string {
  return team.includes("Boca") ? "/boca.png" : "/river.png";
}

export function Scoreboard({ matchState }: Props) {
  return (
    <section className="scoreboard card">
      <div className="team-card">
        <img src={teamLogo(matchState.homeTeam)} alt={matchState.homeTeam} className="team-logo" />
        <div>
          <p className="team-name">{matchState.homeTeam}</p>
          <p className="team-score">{matchState.homeScore}</p>
        </div>
      </div>

      <div className="match-details">
        <p className="match-minute">
          {matchState.displayLabel ? matchState.displayLabel : matchState.status === "live" ? `${matchState.minute}'` : ""}
        </p>
        <p className="match-status">
          {matchState.status === "live" ? "En vivo" : matchState.status === "finished" ? "Finalizado" : "No iniciado"}
        </p>
      </div>

      <div className="team-card team-card-right">
        <img src={teamLogo(matchState.awayTeam)} alt={matchState.awayTeam} className="team-logo" />
        <div>
          <p className="team-name">{matchState.awayTeam}</p>
          <p className="team-score">{matchState.awayScore}</p>
        </div>
      </div>
    </section>
  );
}
