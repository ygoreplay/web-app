import React from "react";

import { Card } from "@routes/tools/deck";

interface DeckEditorProviderProps {
    children: React.ReactNode;
    handleAddCardRequest(card: Card, side?: boolean): void;
    handleRemoveCardRequest(index: number, type: DeckType): void;
    handleMoveCardRequest(dragIndex: number, hoverIndex: number, type: DeckType): void;
    handleSortCardsRequest(): void;
}
interface DeckEditorContextValues {
    addCard(card: Card, side?: boolean): void;
    removeCard(index: number, type: DeckType): void;
    moveCard(dragIndex: number, hoverIndex: number, type: DeckType): void;
    sortCards(): void;
}

export type DeckType = "main" | "extra" | "side";

const DeckEditorContext = React.createContext<DeckEditorContextValues>({
    addCard() {},
    removeCard() {},
    moveCard() {},
    sortCards() {},
});

export default class DeckEditorProvider extends React.Component<DeckEditorProviderProps> {
    private contextValue: DeckEditorContextValues = {
        addCard: this.addCard.bind(this),
        removeCard: this.removeCard.bind(this),
        moveCard: this.moveCard.bind(this),
        sortCards: this.sortCards.bind(this),
    };

    private addCard(card: Card, side?: boolean) {
        this.props.handleAddCardRequest(card, side);
    }
    private removeCard(index: number, type: DeckType) {
        this.props.handleRemoveCardRequest(index, type);
    }
    private moveCard(dragIndex: number, hoverIndex: number, type: DeckType) {
        this.props.handleMoveCardRequest(dragIndex, hoverIndex, type);
    }
    private sortCards() {
        this.props.handleSortCardsRequest();
    }

    public render() {
        const { children } = this.props;

        return <DeckEditorContext.Provider value={this.contextValue}>{children}</DeckEditorContext.Provider>;
    }
}

export function useDeckEditor() {
    return React.useContext(DeckEditorContext);
}
