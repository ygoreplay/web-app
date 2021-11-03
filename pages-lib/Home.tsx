import React from "react";
import * as _ from "lodash";

import { Container, Grid } from "@mui/material";

import Layout from "@components/Layout";
import Paper from "@components/Paper";
import RecentMatches from "@components/RecentMatches";
import DeckWinRate from "@components/DeckWinRate";

import { OnSubscriptionDataOptions } from "@apollo/client";
import {
    MatchCountUpdatedComponent,
    MatchCountUpdatedSubscription,
    HomeDataProps,
    NewMatchCreatedComponent,
    NewMatchCreatedSubscription,
    withHomeData,
} from "@query";

import { Root } from "@routes/Home.styles";

import { Match } from "@utils/type";

interface HomeRouteProps extends HomeDataProps {}
interface HomeRouteStates {
    matchCount: number | null;
    matches: Match[] | null;
}

class HomeRoute extends React.Component<HomeRouteProps, HomeRouteStates> {
    public state: HomeRouteStates = {
        matchCount: null,
        matches: null,
    };

    private handleMatchCountUpdated = ({ subscriptionData }: OnSubscriptionDataOptions<MatchCountUpdatedSubscription>) => {
        if (!subscriptionData || !subscriptionData.data?.matchCountUpdated) {
            return;
        }

        this.setState({
            matchCount: subscriptionData.data.matchCountUpdated,
        });
    };
    private handleNewMatchCreated = ({ subscriptionData: { data } }: OnSubscriptionDataOptions<NewMatchCreatedSubscription>) => {
        const {
            data: { matches },
        } = this.props;

        if (!data || !matches) {
            return;
        }

        this.setState((prevState: HomeRouteStates) => ({
            matches: _.uniqBy([data.newMatchCreated, ...(prevState.matches || []), ...matches], m => m.id).slice(0, 10),
        }));
    };

    public render() {
        const { data } = this.props;
        const { matchCount, matches } = this.state;

        return (
            <Layout>
                {!data.loading && (
                    <>
                        <MatchCountUpdatedComponent onSubscriptionData={this.handleMatchCountUpdated} />
                        <NewMatchCreatedComponent onSubscriptionData={this.handleNewMatchCreated} />
                    </>
                )}
                <Container>
                    <Root>
                        <Grid container spacing={2}>
                            <Grid item lg={8} xs={12}>
                                <Paper
                                    loading={data.loading}
                                    title="최근 경기"
                                    subtitle={data.matchCount ? `총 ${(matchCount || data.matchCount).toLocaleString()}회` : ""}
                                >
                                    <RecentMatches matches={matches || data.matches || null} />
                                </Paper>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <Paper loading={data.loading} title="덱 승률">
                                    <DeckWinRate winRates={data.winRate} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Root>
                </Container>
            </Layout>
        );
    }
}

export default withHomeData({
    options: {
        fetchPolicy: "network-only",
        variables: {
            count: 10,
        },
    },
})(HomeRoute);
