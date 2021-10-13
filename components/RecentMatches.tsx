import * as _ from "lodash";
import React from "react";

import { OnSubscriptionDataOptions } from "@apollo/client";

import { MatchesProps, NewMatchCreatedComponent, NewMatchCreatedSubscription, withMatches } from "@query";

import { DeckName, Entry, Item, PlayerName, Root, Symbol } from "@components/RecentMatches.styles";

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
        return "loading";
    };
    private renderMatch = (match: Exclude<MatchesProps["data"]["matches"], undefined>[0]) => {
        const firstRound = match.rounds[0];
        const playerNames = firstRound.playerDecks;

        return (
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
