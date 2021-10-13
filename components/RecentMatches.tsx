import React from "react";
import Link from "next/link";
import * as _ from "lodash";

import { OnSubscriptionDataOptions } from "@apollo/client";

import { MatchesProps, NewMatchCreatedComponent, NewMatchCreatedSubscription, withMatches } from "@query";

import { DeckName, Entry, Item, PlayerName, Root, Symbol } from "@components/RecentMatches.styles";
import { Skeleton } from "@mui/material";

interface RecentMatchesStates {
    matches: Array<Exclude<MatchesProps["data"]["matches"], undefined>[0]> | null;
}

class RecentMatches extends React.Component<MatchesProps, RecentMatchesStates> {
    public state: RecentMatchesStates = {
        matches: null,
    };

    public componentDidUpdate(prevProps: Readonly<MatchesProps>) {
        if (this.props.data.loading !== prevProps.data.loading && !this.props.data.loading && this.props.data.matches) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                matches: [...this.props.data.matches],
            });
        }
    }

    private handleNewMatchCreated = ({ subscriptionData }: OnSubscriptionDataOptions<NewMatchCreatedSubscription>) => {
        if (!subscriptionData.data) {
            return;
        }

        if (!this.state.matches) {
            return;
        }

        console.info(subscriptionData.data.newMatchCreated.id);

        this.setState((prevState: RecentMatchesStates) => ({
            matches: prevState.matches ? _.uniqBy([subscriptionData.data!.newMatchCreated, ...prevState.matches], item => item.id).slice(0, 10) : null,
        }));
    };

    private renderLoading = () => {
        const result: React.ReactNode[] = [];
        for (let i = 0; i < 10; i++) {
            result.push(
                <Item key={i}>
                    <Entry>
                        <PlayerName>
                            <Skeleton animation="wave" width={50} />
                        </PlayerName>
                        <DeckName>
                            <Skeleton animation="wave" width={100} />
                        </DeckName>
                    </Entry>
                    <Symbol>vs</Symbol>
                    <Entry>
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
    private renderMatch = (match: Exclude<MatchesProps["data"]["matches"], undefined>[0]) => {
        const firstRound = match.rounds[0];
        const playerNames = firstRound.playerDecks;

        return (
            <Link href="/matches/[id]" as={`/matches/${match.id}`} passHref>
                <Item key={match.id}>
                    <Entry>
                        <PlayerName>{playerNames[0].player.name}</PlayerName>
                        <DeckName>{playerNames[0].deck.recognizedName}</DeckName>
                    </Entry>
                    <Symbol>vs</Symbol>
                    <Entry>
                        <PlayerName>{playerNames[1].player.name}</PlayerName>
                        <DeckName>{playerNames[1].deck.recognizedName}</DeckName>
                    </Entry>
                </Item>
            </Link>
        );
    };
    private renderItems = (matches: Exclude<MatchesProps["data"]["matches"], undefined>) => {
        return matches.map(this.renderMatch);
    };

    render() {
        const { matches } = this.state;

        return (
            <Root>
                {matches && <NewMatchCreatedComponent onSubscriptionData={this.handleNewMatchCreated} />}
                {!matches && this.renderLoading()}
                {matches && this.renderItems(matches)}
            </Root>
        );
    }
}

export default withMatches({
    options: {
        variables: {
            count: 10,
        },
    },
})(RecentMatches);
