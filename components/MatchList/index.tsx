import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { CircularProgress } from "@mui/material";

import MatchListItem from "@components/MatchList/Item";
import { MatchListFilterFormValues } from "@forms/MatchListFilter";

import { EmptyMessage, LoaderWrapper, Root } from "@components/MatchList/index.styles";

import { MatchesDocument, MatchesQuery, MatchesQueryVariables } from "@query";

import { convertMatchFilterValueToInput } from "@utils/convertMatchFilterValueToInput";
import { Match } from "@utils/type";

export interface MatchListProps {
    infinite: boolean;
    filterValue: MatchListFilterFormValues;
}
export interface MatchListStates {
    matches: Match[];
    hasMore: boolean;
    empty: boolean;
}

const MINIMAL_COUNT = 15;

class MatchList extends React.Component<WithApolloClient<MatchListProps>, MatchListStates> {
    public state: MatchListStates = {
        matches: [],
        hasMore: true,
        empty: false,
    };

    public async componentDidMount() {
        await this.ensureFetch(0, true);
    }
    public async componentDidUpdate(prevProps: Readonly<WithApolloClient<MatchListProps>>) {
        if (this.props.filterValue !== prevProps.filterValue) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(
                {
                    matches: [],
                },
                () => {
                    this.ensureFetch(0, true);
                },
            );
        }
    }

    private ensureFetch = async (page: number, shouldExist: boolean = false) => {
        const { client, filterValue } = this.props;
        const { matches } = this.state;
        if (!client) {
            return;
        }

        const { data } = await client.query<MatchesQuery, MatchesQueryVariables>({
            query: MatchesDocument,
            variables: {
                count: MINIMAL_COUNT,
                after: page > 0 ? matches[page * MINIMAL_COUNT - 1].id : undefined,
                filter: convertMatchFilterValueToInput(filterValue),
            },
            fetchPolicy: "no-cache",
        });

        this.setState((prevState: MatchListStates) => ({
            matches: [...prevState.matches, ...data.matches],
            hasMore: data.matches.length >= MINIMAL_COUNT,
            empty: data.matches.length === 0 && shouldExist,
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
        const { matches, hasMore, empty } = this.state;

        if (empty) {
            return (
                <Root>
                    <EmptyMessage>해당 조건에 맞는 데이터가 없습니다.</EmptyMessage>
                </Root>
            );
        }

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
