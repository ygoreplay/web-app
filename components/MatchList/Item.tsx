import React from "react";
import Link from "next/link";

import { Skeleton } from "@mui/material";

import { DeckName, Part, PlayerName, Root, TierIndicator, Versus } from "@components/MatchList/Item.styles";

import { Match } from "@utils/type";
import { MatchType } from "queries/index";

export interface SkeletonMatchListItemProps {
    loading: true;
}
export interface NormalMatchListItemProps {
    loading?: false;
    match: Match;
}
export interface MatchListItemStates {}

export type MatchListItemProps = SkeletonMatchListItemProps | NormalMatchListItemProps;

export default class MatchListItem extends React.Component<MatchListItemProps, MatchListItemStates> {
    public renderSkeleton() {
        return (
            <Root>
                <Part>
                    <Skeleton width={100} />
                </Part>
                <Versus>VS</Versus>
                <Part>
                    <Skeleton width={100} />
                </Part>
            </Root>
        );
    }
    public render() {
        if (!("match" in this.props)) {
            return this.renderSkeleton();
        }

        const { match } = this.props;

        return (
            <Link href="/matches/[id]" as={`/matches/${match.id}`} passHref>
                <Root>
                    <Part won={match.home.player.id === match.winner?.id}>
                        <PlayerName>{match.home.player.name}</PlayerName>
                        <DeckName>{match.home.deck.recognizedName}</DeckName>
                    </Part>
                    <Versus>VS</Versus>
                    <Part won={match.away.player.id === match.winner?.id}>
                        <DeckName>{match.away.deck.recognizedName}</DeckName>
                        <PlayerName>{match.away.player.name}</PlayerName>
                    </Part>
                    {match.type === MatchType.Athletic && <TierIndicator />}
                </Root>
            </Link>
        );
    }
}
