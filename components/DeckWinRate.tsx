import React from "react";
import tinygradient from "tinygradient";

import { WinRate } from "queries/index";

import { CardImage, DeckName, DeckNameContent, Item, Root, WinRate as WinRateSpan, WinRateContainer } from "@components/DeckWinRate.styles";
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
        const backgroundImage = winRate.titleCard
            ? `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-usage-list-item/${winRate.titleCard.id}.png)`
            : undefined;

        return (
            <Item key={winRate.deckName}>
                <DeckName>
                    <CardImage style={{ backgroundImage }} />
                    <DeckNameContent>{winRate.deckName}</DeckNameContent>
                </DeckName>
                <WinRateContainer>
                    <WinRateSpan style={{ color: `#${colors[index].toHex()}` }}>{value.toFixed(1)}%</WinRateSpan>
                </WinRateContainer>
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
