import { Card } from "@routes/tools/deck";
import { Deck } from "@routes/tools/deck/types";

export function searchCardCountFromDeck(deck: Deck, card: Card) {
    return [...deck.main, ...deck.extra, ...deck.side].filter(c => (c.alias || c.id) === (card.alias || card.id)).length;
}
