import React from "react";

import DeckRecipe from "@components/DeckRecipe";

import { Root } from "@routes/matches/views/Deck.styles";

import { MatchDetail } from "@utils/type";

interface MatchDeckViewProps {
    match: MatchDetail;
    currentTab: "homeDeck" | "awayDeck";
}
interface MatchDeckViewStates {}

export default class MatchDeckView extends React.Component<MatchDeckViewProps, MatchDeckViewStates> {
    public render() {
        const { match, currentTab } = this.props;
        const targetPlayerDeck = currentTab === "homeDeck" ? match.home : match.away;

        return (
            <Root>
                <DeckRecipe type="list" deck={targetPlayerDeck.deck} />
            </Root>
        );
    }
}
