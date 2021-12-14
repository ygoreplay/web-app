import { Championship } from "@utils/type";
import { ChampionshipType } from "@query";

export function checkIfTeamChampionship(championship: Championship | undefined | null): championship is Championship {
    return typeof championship === "object" && championship !== null && championship.type === ChampionshipType.Team;
}
