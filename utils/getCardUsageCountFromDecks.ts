import _ from "lodash";
import { TeamDeck } from "@routes/tools/deck/types";
import { getAllCardsFromDecks } from "@utils/getAllCardsFromDecks";

export function getCardUsageCountFromDecks(decks: TeamDeck) {
    const allCards = getAllCardsFromDecks([decks.first, decks.second, decks.third]);

    return _.chain(allCards)
        .countBy(c => c.alias || c.id)
        .value();
}
