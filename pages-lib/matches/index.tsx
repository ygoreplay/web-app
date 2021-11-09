import React from "react";

import Layout from "@components/Layout";
import MatchList from "@components/MatchList";

import { Root } from "@routes/matches/index.styles";
import MatchListFilterForm, { MatchListFilterFormValues } from "@forms/MatchListFilter";

export interface MatchesRouteProps {
    banLists: string[];
    initialMatchListFilterOptions: MatchListFilterFormValues;
}
export interface MatchesRouteStates {
    filterValue: MatchListFilterFormValues;
}

export default class MatchesRoute extends React.Component<MatchesRouteProps, MatchesRouteStates> {
    public state: MatchesRouteStates = {
        filterValue: this.props.initialMatchListFilterOptions,
    };

    private handleSubmit = async (value: MatchListFilterFormValues) => {
        this.setState({
            filterValue: value,
        });
    };

    public render() {
        const { banLists } = this.props;
        const { filterValue } = this.state;

        return (
            <Layout>
                <Root>
                    <MatchListFilterForm
                        banLists={banLists}
                        onSubmit={this.handleSubmit}
                        value={filterValue}
                        initialValues={this.props.initialMatchListFilterOptions}
                    />
                    <MatchList infinite filterValue={filterValue} />
                </Root>
            </Layout>
        );
    }
}
