import React from "react";

import Layout from "@components/Layout";
import MatchList from "@components/MatchList";

import { Root } from "@routes/matches/index.styles";
import MatchListFilterForm, { MatchListFilterFormValues } from "@forms/MatchListFilter";

export interface MatchesRouteProps {}
export interface MatchesRouteStates {
    filterValue: MatchListFilterFormValues;
}

const INITIAL_MATCH_LIST_FILTER_OPTIONS: MatchListFilterFormValues = {
    includeNormalMatches: true,
    includeTierMatches: true,
    includeMatches: true,
    includeSingles: true,
};

export default class MatchesRoute extends React.Component<MatchesRouteProps, MatchesRouteStates> {
    public state: MatchesRouteStates = {
        filterValue: INITIAL_MATCH_LIST_FILTER_OPTIONS,
    };

    private handleSubmit = async (value: MatchListFilterFormValues) => {
        this.setState({
            filterValue: value,
        });
    };

    public render() {
        const { filterValue } = this.state;

        return (
            <Layout>
                <Root>
                    <MatchListFilterForm onSubmit={this.handleSubmit} value={filterValue} initialValues={INITIAL_MATCH_LIST_FILTER_OPTIONS} />
                    <MatchList infinite filterValue={filterValue} />
                </Root>
            </Layout>
        );
    }
}
