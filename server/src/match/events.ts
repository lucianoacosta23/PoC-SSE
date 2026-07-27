import { MatchEvent } from "../types/match";

export const matchEvents: MatchEvent[] = [
  { minute: 0, type: "start", description: "Arranca el partido en La Bombonera." },
  { minute: 13, type: "goal", team: "Boca", player: "Walter Bou", description: "Walter Bou (0-1)." },
  { minute: 33, type: "yellow", team: "River", player: "Sebastián Driussi", description: "Sebastián Driussi." },
  { minute: 33, type: "goal", team: "River", player: "Sebastián Driussi", description: "Sebastián Driussi (1-1)." },
  { minute: 39, type: "goal", team: "River", player: "Lucas Alario", description: "Lucas Alario (2-1)." },
  { minute: 45, type: "break", description: "Entretiempo: River 2-1 Boca." },
  { minute: 59, type: "substitution", team: "River", description: "Iván Rossi ↔ Andrés D'Alessandro." },
  { minute: 61, type: "goal", team: "Boca", player: "Carlos Tevez", description: "Carlos Tevez (2-2)." },
  { minute: 66, type: "substitution", team: "Boca", description: "Ricardo Centurión ↔ Walter Bou." },
  { minute: 67, type: "substitution", team: "River", description: "Rodrigo Mora ↔ Gonzalo Martínez." },
  { minute: 74, type: "substitution", team: "River", description: "Tomás Andrade ↔ Sebastián Driussi." },
  { minute: 81, type: "goal", team: "Boca", player: "Carlos Tevez", description: "Carlos Tevez (2-3)." },
  { minute: 82, type: "substitution", team: "Boca", description: "Sebastián Pérez ↔ Pablo Pérez." },
  { minute: 84, type: "substitution", team: "Boca", description: "Leonardo Jara ↔ Cristian Pavón." },
  { minute: 93, type: "goal", team: "Boca", player: "Ricardo Centurión", description: "Ricardo Centurión (2-4)." },
  { minute: 95, type: "yellow", team: "Boca", player: "Ricardo Centurión", description: "Ricardo Centurión." },
  { minute: 95, type: "end", description: "Final del partido." }
];
