import React from "react";

import { Deck } from "@routes/tools/deck";
import DeckViewList from "@routes/tools/deck/DeckViewList";

import { Root } from "./DeckView.styles";

export interface DeckViewProps {
    deck: Deck;
}
export interface DeckViewStates {}

export default class DeckView extends React.Component<DeckViewProps, DeckViewStates> {
    public state: DeckViewStates = {};

    public render() {
        const { deck } = this.props;

        return (
            <Root>
                <DeckViewList type="main" cards={deck.main} />
                <DeckViewList type="extra" cards={deck.extra} />
                <DeckViewList type="side" cards={deck.side} />
            </Root>
        );
    }
}
