import { TeamDeck } from "@routes/tools/deck/types";
import { getAllCardsFromDecks } from "@utils/getAllCardsFromDecks";
import { Card } from "@routes/tools/deck";
import { searchCardCountFromCards } from "@utils/searchCardCountFromCards";

export function searchCardCountFromDecks(decks: TeamDeck, card: Card) {
    return searchCardCountFromCards(getAllCardsFromDecks([decks.first, decks.second, decks.third]), card);
}
