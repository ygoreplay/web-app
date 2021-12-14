import { ParticipantType } from "@routes/tools/deck/types";
import { Card, Deck } from "@routes/tools/deck";
import { searchCardCountFromDeck } from "@utils/searchCardCountFromDeck";
import { TeamChampionshipFormValues } from "@routes/tools/deck/TeamChampionshipForm";

export function generateCardCountString(decks: { [type in ParticipantType]: Deck }, card: Card, championshipJoinValue: TeamChampionshipFormValues) {
    return [
        `${championshipJoinValue.firstParticipantName}: ${searchCardCountFromDeck(decks.first, card)}`,
        `${championshipJoinValue.secondParticipantName}: ${searchCardCountFromDeck(decks.second, card)}`,
        `${championshipJoinValue.thirdParticipantName}: ${searchCardCountFromDeck(decks.third, card)}`,
    ].join(", ");
}
