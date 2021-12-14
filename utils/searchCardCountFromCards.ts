import { Card } from "@routes/tools/deck";

export function searchCardCountFromCards(cards: Card[], card: Card) {
    return cards.filter(c => (c.alias || c.id) === (card.alias || card.id)).length;
}
