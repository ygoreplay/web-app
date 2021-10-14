import _ from "lodash";

import { DeckBase } from "@utils/type";
import { CardType } from "@query";

function idSelector(card: DeckBase["main"][0]) {
    return card.id;
}

function cardNameSelector(card: DeckBase["main"][0]) {
    return card.text.name;
}

function cardTypeSorter(card: DeckBase["main"][0]) {
    switch (card.type) {
        case CardType.Monster:
            return 0;

        case CardType.Spell:
            return 1;

        default:
            return 2;
    }
}

function generateCardCount(deck: DeckBase["main"], map: _.Dictionary<number>) {
    return _.chain(deck)
        .uniqBy(idSelector)
        .sortBy(cardNameSelector)
        .sortBy(cardTypeSorter)
        .map(c => ({ card: c, count: map[c.id] }))
        .value();
}

export function parseDeckData(deck: DeckBase) {
    const mainMap = _.countBy(deck.main, idSelector);
    const extraMap = _.countBy(deck.extra, idSelector);
    const sideMap = _.countBy(deck.side, idSelector);

    return {
        main: generateCardCount(deck.main, mainMap),
        extra: generateCardCount(deck.extra, extraMap),
        side: generateCardCount(deck.side, sideMap),
    };
}
