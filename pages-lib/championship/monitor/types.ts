import { ChampionshipForMonitor } from "@utils/type";

export interface ChampionshipTeam {
    name: string;
    participants: ChampionshipForMonitor["participants"];
}
