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
        const index = currentTab === "homeDeck" ? 0 : 1;
        const targetPlayer = match.players[index];
        const playerDeck = match.rounds[0].playerDecks.find(pd => pd.player.id === targetPlayer.id);
        if (!playerDeck) {
            return null;
        }

        return (
            <Root>
                <DeckRecipe type="list" deck={playerDeck.deck} />
            </Root>
        );
    }
}
