import _ from "lodash";
import { Deck } from "@routes/tools/deck/types";

export function getAllCardsFromDecks(decks: Deck[]) {
    return _.chain(decks)
        .map(d => [...d.main, ...d.extra, ...d.side])
        .flatten()
        .value();
}
