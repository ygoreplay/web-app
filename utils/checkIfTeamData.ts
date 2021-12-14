import { TeamChampionshipFormValues } from "@routes/tools/deck/TeamChampionshipForm";
import { IndividualChampionshipFormValues } from "@routes/tools/deck/IndividualChampionshipForm";

export function checkIfTeamData(data: TeamChampionshipFormValues | IndividualChampionshipFormValues | null | undefined): data is TeamChampionshipFormValues {
    return typeof data === "object" && data !== null && "firstParticipantName" in data;
}
