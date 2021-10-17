import React from "react";
import tinygradient from "tinygradient";

import { WinRate } from "queries/index";

import { DeckName, Item, Root, WinRate as WinRateSpan } from "@components/DeckWinRate.styles";

interface DeckWinRateProps {
    winRates: Pick<WinRate, "rate" | "deckName">[];
}
interface DeckWinRateStates {}

const gradient = tinygradient(["#1ec600", "#ecde13", "#ff3d00"]);
const colors = gradient.rgb(10);

export default class DeckWinRate extends React.Component<DeckWinRateProps, DeckWinRateStates> {
    private renderWinRate = (winRate: WinRate, index: number) => {
        const value = Math.floor(winRate.rate * 1000) / 10;

        return (
            <Item key={winRate.deckName}>
                <DeckName>{winRate.deckName}</DeckName>
                <WinRateSpan winRateValue={value} style={{ color: `#${colors[index].toHex()}` }}>
                    {value.toFixed(1)}%
                </WinRateSpan>
            </Item>
        );
    };

    public render() {
        const { winRates } = this.props;

        return <Root>{winRates.map(this.renderWinRate)}</Root>;
    }
}
