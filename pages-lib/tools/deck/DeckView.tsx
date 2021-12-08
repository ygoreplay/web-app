import React from "react";

import { Deck } from "@routes/tools/deck";
import DeckViewList from "@routes/tools/deck/DeckViewList";
import { Card } from "@routes/tools/deck/CardExplorer";

import { Root } from "./DeckView.styles";

export interface DeckViewProps {
    deck: Deck;
    onAddCardRequest(card: Card, side: boolean): void;
}
export interface DeckViewStates {}

export default class DeckView extends React.Component<DeckViewProps, DeckViewStates> {
    public state: DeckViewStates = {};

    public render() {
        const { deck, onAddCardRequest } = this.props;

        return (
            <Root>
                <DeckViewList onAddCardRequest={onAddCardRequest} type="main" cards={deck.main} />
                <DeckViewList onAddCardRequest={onAddCardRequest} type="extra" cards={deck.extra} />
                <DeckViewList onAddCardRequest={onAddCardRequest} type="side" cards={deck.side} />
            </Root>
        );
    }
}
