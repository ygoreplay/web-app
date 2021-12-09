import React from "react";

import { Card } from "@routes/tools/deck";

interface DeckEditorProviderProps {
    children: React.ReactNode;
    handleAddCardRequest(card: Card, side?: boolean): void;
}

interface DeckEditorContextValues {
    addCard(card: Card, side?: boolean): void;
}

const DeckEditorContext = React.createContext<DeckEditorContextValues>({
    addCard() {},
});

export default class DeckEditorProvider extends React.Component<DeckEditorProviderProps> {
    private contextValue: DeckEditorContextValues = {
        addCard: this.addCard.bind(this),
    };

    private addCard(card: Card, side?: boolean) {
        this.props.handleAddCardRequest(card, side);
    }

    public render() {
        const { children } = this.props;

        return <DeckEditorContext.Provider value={this.contextValue}>{children}</DeckEditorContext.Provider>;
    }
}

export function useDeckEditor() {
    return React.useContext(DeckEditorContext);
}
