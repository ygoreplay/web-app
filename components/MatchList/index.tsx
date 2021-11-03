import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { CircularProgress } from "@mui/material";

import MatchListItem from "@components/MatchList/Item";

import { LoaderWrapper, Root } from "@components/MatchList/index.styles";

import { MatchesDocument, MatchesQuery, MatchesQueryVariables } from "@query";

import { Match } from "@utils/type";

export interface MatchListProps {
    infinite: boolean;
}
export interface MatchListStates {
    matches: Match[];
    hasMore: boolean;
}

const MINIMAL_COUNT = 15;

class MatchList extends React.Component<WithApolloClient<MatchListProps>, MatchListStates> {
    public state: MatchListStates = {
        matches: [],
        hasMore: true,
    };

    public async componentDidMount() {
        const { client } = this.props;
        const { matches } = this.state;
        if (!client) {
            return;
        }

        const { data } = await client.query<MatchesQuery, MatchesQueryVariables>({
            query: MatchesDocument,
            variables: {
                count: MINIMAL_COUNT,
                after: matches[matches.length - 1]?.id,
            },
            fetchPolicy: "no-cache",
        });

        this.setState((prevState: MatchListStates) => ({
            matches: [...prevState.matches, ...data.matches],
        }));
    }

    private ensureFetch = async (page: number) => {
        const { client } = this.props;
        const { matches } = this.state;
        if (!client) {
            return;
        }

        const { data } = await client.query<MatchesQuery, MatchesQueryVariables>({
            query: MatchesDocument,
            variables: {
                count: MINIMAL_COUNT,
                after: matches[page * MINIMAL_COUNT - 1].id,
            },
            fetchPolicy: "no-cache",
        });

        this.setState((prevState: MatchListStates) => ({
            matches: [...prevState.matches, ...data.matches],
            hasMore: data.matches.length >= MINIMAL_COUNT,
        }));
    };

    private renderLoader = () => {
        return (
            <LoaderWrapper>
                <CircularProgress size={24} />
            </LoaderWrapper>
        );
    };
    private renderListItem = (match: Match) => {
        return <MatchListItem key={match.id} match={match} />;
    };
    public render() {
        const { infinite } = this.props;
        const { matches, hasMore } = this.state;

        if (!matches.length) {
            return (
                <Root>
                    {new Array(MINIMAL_COUNT).fill(null).map((_, index) => {
                        return <MatchListItem loading key={+index} />;
                    })}
                </Root>
            );
        }

        let content: React.ReactNode = matches.map(this.renderListItem);
        if (infinite) {
            content = (
                <InfiniteScroll pageStart={0} threshold={300} loadMore={this.ensureFetch} hasMore={hasMore} loader={this.renderLoader()}>
                    {content}
                </InfiniteScroll>
            );
        }

        return <Root>{content}</Root>;
    }
}

export default withApollo<MatchListProps>(MatchList);
