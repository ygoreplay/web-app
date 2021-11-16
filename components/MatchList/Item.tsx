import React from "react";
import Link from "next/link";

import { Skeleton } from "@mui/material";

import { DeckName, Part, PlayerName, Root, TierIndicator, TitleCard, Versus } from "@components/MatchList/Item.styles";

import { Match } from "@utils/type";
import { MatchType } from "queries/index";

export interface SkeletonMatchListItemProps {
    loading: true;
}
export interface NormalMatchListItemProps {
    loading?: false;
    match: Match;
    imageUrl?: string;
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

        const { match, imageUrl } = this.props;

        return (
            <Link href="/matches/[id]" as={`/matches/${match.id}`} passHref>
                <Root>
                    <Part won={match.home.player.id === match.winner?.id}>
                        <PlayerName>{match.home.player.name}</PlayerName>
                        <DeckName>{match.home.deck.recognizedName}</DeckName>
                        {(imageUrl || match.home.deck.titleCard) && (
                            <TitleCard
                                style={{
                                    backgroundImage: imageUrl
                                        ? `url(${imageUrl})`
                                        : `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/304x304/${match.home.deck.titleCard!.cardId}.jpg)`,
                                }}
                            />
                        )}
                    </Part>
                    <Versus>VS</Versus>
                    <Part won={match.away.player.id === match.winner?.id}>
                        <DeckName>{match.away.deck.recognizedName}</DeckName>
                        <PlayerName>{match.away.player.name}</PlayerName>
                        {(imageUrl || match.away.deck.titleCard) && (
                            <TitleCard
                                style={{
                                    backgroundImage: imageUrl
                                        ? `url(${imageUrl})`
                                        : `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/304x304/${match.away.deck.titleCard!.cardId}.jpg)`,
                                }}
                            />
                        )}
                    </Part>
                    {match.type === MatchType.Athletic && <TierIndicator />}
                </Root>
            </Link>
        );
    }
}
