import React from "react";

import { CardUsageData } from "@utils/type";

import { Root, CardName, Item, UsageCount, CardImage } from "./CardUsage.styles";
import FlipMove from "react-flip-move";

export interface CardUsageProps {
    usages: CardUsageData[];
}
export interface CardUsageStates {}

export default class CardUsage extends React.Component<CardUsageProps, CardUsageStates> {
    private renderItem = (usage: CardUsageData) => {
        return (
            <Item key={usage.card.id}>
                <CardImage style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/304x304/${usage.card.id}.jpg)` }} />
                <CardName>{usage.card.text.name}</CardName>
                <UsageCount>
                    <span>{usage.count.toLocaleString()}</span>
                </UsageCount>
            </Item>
        );
    };

    public render() {
        const { usages } = this.props;

        return (
            <Root>
                <FlipMove>{usages.map(this.renderItem)}</FlipMove>
            </Root>
        );
    }
}
