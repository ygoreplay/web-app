import React from "react";

import { WinRate } from "queries/index";

import { DeckName, Item, Root, WinRate as WinRateSpan } from "@components/DeckWinRate.styles";

interface DeckWinRateProps {
    winRates: Pick<WinRate, "rate" | "deckName">[];
}
interface DeckWinRateStates {}

export default class DeckWinRate extends React.Component<DeckWinRateProps, DeckWinRateStates> {
    private renderWinRate = (winRate: WinRate) => {
        const value = Math.floor(winRate.rate * 1000) / 10;

        return (
            <Item key={winRate.deckName}>
                <DeckName>{winRate.deckName}</DeckName>
                <WinRateSpan winRateValue={value}>{value.toFixed(1)}%</WinRateSpan>
            </Item>
        );
    };

    public render() {
        const { winRates } = this.props;

        return <Root>{winRates.map(this.renderWinRate)}</Root>;
    }
}
