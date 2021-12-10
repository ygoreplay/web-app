import React from "react";
import update from "immutability-helper";
import _ from "lodash";

import { Card, Deck } from "@routes/tools/deck";
import { sortCardByLevel } from "@utils/sortCardByLevel";
import { loadDeckFromString } from "@utils/loadDeckFromString";

interface DeckEditorProviderProps {
    children: React.ReactNode;
    deck: Deck;
    cards: Card[] | null;
    onDeckChange(deck: Deck): void;
}
export interface DeckEditorContextValues {
    addCard(card: Card, side?: boolean): void;
    removeCard(index: number, type: DeckType): void;
    moveCard(dragIndex: number, hoverIndex: number, type: DeckType): void;
    sortCards(): void;
    importYDKFile(file: File): void;
    exportYDKFile(): void;
}

export type DeckType = "main" | "extra" | "side";

const DeckEditorContext = React.createContext<DeckEditorContextValues>({
    addCard() {},
    removeCard() {},
    moveCard() {},
    sortCards() {},
    importYDKFile() {},
    exportYDKFile() {},
});

export default class DeckEditorProvider extends React.Component<DeckEditorProviderProps> {
    private contextValue: DeckEditorContextValues = {
        addCard: this.addCard.bind(this),
        removeCard: this.removeCard.bind(this),
        moveCard: this.moveCard.bind(this),
        sortCards: this.sortCards.bind(this),
        importYDKFile: this.importYDKFile.bind(this),
        exportYDKFile: this.exportYDKFile.bind(this),
    };

    private addCard(card: Card, side?: boolean) {
        const { deck: previousDeck, onDeckChange } = this.props;
        const cardCount = [...previousDeck.main, ...previousDeck.extra, ...previousDeck.side].filter(
            c => c.id === card.id || c.alias === card.id || card.alias === c.id,
        ).length;

        if (cardCount >= 3) {
            return;
        }

        const deck = _.cloneDeep(previousDeck);
        if (side && deck.side.length < 15) {
            deck.side.push(card);
        } else if (card.isExtra && deck.extra.length < 15 && !side) {
            deck.extra.push(card);
        } else if (deck.main.length < 60 && !side) {
            deck.main.push(card);
        }

        onDeckChange(deck);
    }
    private removeCard(index: number, type: DeckType) {
        const { deck, onDeckChange } = this.props;

        onDeckChange({
            ...deck,
            [type]: deck[type].filter((__, i) => i !== index),
        });
    }
    private moveCard(dragIndex: number, hoverIndex: number, type: DeckType) {
        const { deck, onDeckChange } = this.props;
        const dragCard = deck[type][dragIndex];

        onDeckChange({
            ...deck,
            [type]: update(deck[type], {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        });
    }
    private sortCards() {
        const { onDeckChange, deck } = this.props;

        onDeckChange({
            main: deck.main.sort(sortCardByLevel),
            extra: deck.extra.sort(sortCardByLevel),
            side: deck.side.sort(sortCardByLevel),
        });
    }
    private importYDKFile(file: File) {
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const { cards, onDeckChange } = this.props;
            if (!e.target || typeof e.target.result !== "string" || !cards) {
                return;
            }

            const loadedDeck = loadDeckFromString(e.target.result, cards);
            onDeckChange(loadedDeck);
        };

        fileReader.readAsBinaryString(file);
    }
    private exportYDKFile() {}

    public render() {
        const { children } = this.props;

        return <DeckEditorContext.Provider value={this.contextValue}>{children}</DeckEditorContext.Provider>;
    }
}

export function useDeckEditor() {
    return React.useContext(DeckEditorContext);
}
