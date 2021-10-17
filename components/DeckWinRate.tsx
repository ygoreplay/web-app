import React from "react";
import tinygradient from "tinygradient";

import { WinRate } from "queries/index";

import { DeckName, Item, Root, WinRate as WinRateSpan } from "@components/DeckWinRate.styles";
import { Skeleton } from "@mui/material";

interface DeckWinRateProps {
    winRates: Pick<WinRate, "rate" | "deckName">[] | undefined;
}
interface DeckWinRateStates {}

const gradient = tinygradient(["#1ec600", "#ecde13", "#ff3d00"]);
const colors = gradient.rgb(10);

export default class DeckWinRate extends React.Component<DeckWinRateProps, DeckWinRateStates> {
    private renderSkeleton = () => {
        const result: React.ReactNode[] = [];

        for (let i = 0; i < 10; i++) {
            result.push(
                <Item key={i}>
                    <DeckName>
                        <Skeleton animation="wave" width={50} />
                    </DeckName>
                    <WinRateSpan>
                        <Skeleton animation="wave" width={50} />
                    </WinRateSpan>
                </Item>,
            );
        }

        return result;
    };
    private renderWinRate = (winRate: WinRate, index: number) => {
        const value = Math.floor(winRate.rate * 1000) / 10;

        return (
            <Item key={winRate.deckName}>
                <DeckName>{winRate.deckName}</DeckName>
                <WinRateSpan style={{ color: `#${colors[index].toHex()}` }}>{value.toFixed(1)}%</WinRateSpan>
            </Item>
        );
    };

    public render() {
        const { winRates } = this.props;

        return (
            <Root>
                {!winRates && this.renderSkeleton()}
                {winRates && winRates.map(this.renderWinRate)}
            </Root>
        );
    }
}
