import React from "react";
import Link from "next/link";

import { Skeleton } from "@mui/material";

import { DeckName, Entry, Item, PlayerName, Root, Symbol, Type } from "@components/RecentMatches.styles";

import { Match } from "@utils/type";
import { MatchType } from "queries/index";

interface RecentMatchesProps {
    matches: Match[] | null;
}
interface RecentMatchesStates {}

export default class RecentMatches extends React.Component<RecentMatchesProps, RecentMatchesStates> {
    private renderLoading = () => {
        const result: React.ReactNode[] = [];
        for (let i = 0; i < 10; i++) {
            result.push(
                <Item key={i}>
                    <Type>
                        <Skeleton animation="wave" width={40} />
                    </Type>
                    <Entry won={false}>
                        <PlayerName>
                            <Skeleton animation="wave" width={50} />
                        </PlayerName>
                        <DeckName>
                            <Skeleton animation="wave" width={100} />
                        </DeckName>
                    </Entry>
                    <Symbol>vs</Symbol>
                    <Entry won={false}>
                        <PlayerName>
                            <Skeleton animation="wave" width={100} />
                        </PlayerName>
                        <DeckName>
                            <Skeleton animation="wave" width={50} />
                        </DeckName>
                    </Entry>
                </Item>,
            );
        }

        return result;
    };
    private renderMatch = (match: Match) => {
        return (
            <Link key={match.id} href="/matches/[id]" as={`/matches/${match.id}`} passHref>
                <Item>
                    <Type>{match.type === MatchType.Athletic ? "티어" : "일반"}</Type>
                    <Entry won={match.home.player.id === match.winner?.id}>
                        <PlayerName>{match.home.player.name}</PlayerName>
                        <DeckName>{match.home.deck.recognizedName}</DeckName>
                    </Entry>
                    <Symbol>vs</Symbol>
                    <Entry won={match.away.player.id === match.winner?.id}>
                        <PlayerName>{match.away.player.name}</PlayerName>
                        <DeckName>{match.away.deck.recognizedName}</DeckName>
                    </Entry>
                </Item>
            </Link>
        );
    };
    private renderItems = (matches: Match[]) => {
        return matches.map(this.renderMatch);
    };

    render() {
        const { matches } = this.props;

        return (
            <Root>
                {!matches && this.renderLoading()}
                {matches && this.renderItems(matches)}
            </Root>
        );
    }
}
