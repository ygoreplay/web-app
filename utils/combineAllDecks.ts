import { Deck, TeamDeck } from "@routes/tools/deck/types";

export function combineAllDecks(decks: TeamDeck): Deck {
    return {
        side: [...decks.first.side, ...decks.second.side, ...decks.third.side],
        extra: [...decks.first.extra, ...decks.second.extra, ...decks.third.extra],
        main: [...decks.first.main, ...decks.second.main, ...decks.third.main],
    };
}
