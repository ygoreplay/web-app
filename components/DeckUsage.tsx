import React from "react";

import { Skeleton } from "@mui/material";

import { Root, DeckName, Item, UsageCount, DeckImage } from "@components/DeckUsage.styles";

import { DeckUsageData } from "@utils/type";

interface DeckUsageProps {
    loading: boolean;
    usages: DeckUsageData[];
}
interface DeckUsageStates {}

export default class DeckUsage extends React.Component<DeckUsageProps, DeckUsageStates> {
    private renderSkeleton = () => {
        const result: React.ReactNode[] = [];

        for (let i = 0; i < 10; i++) {
            result.push(
                <Item key={i}>
                    <DeckName>
                        <Skeleton animation="wave" width={50} />
                    </DeckName>
                    <UsageCount>
                        <Skeleton animation="wave" width={50} />
                    </UsageCount>
                </Item>,
            );
        }

        return result;
    };
    private renderUsage = ({ deckName, count }: DeckUsageData) => {
        return (
            <Item key={deckName}>
                <DeckImage />
                <DeckName>{deckName}</DeckName>
                <UsageCount>
                    <span>{count.toLocaleString()}</span>
                </UsageCount>
            </Item>
        );
    };

    public render() {
        const { loading, usages } = this.props;

        return (
            <Root>
                {(!usages || loading) && this.renderSkeleton()}
                {!loading && usages && usages.map(this.renderUsage)}
            </Root>
        );
    }
}
