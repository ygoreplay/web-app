import React from "react";

import { Container, Grid } from "@mui/material";

import Layout from "@components/Layout";
import Paper from "@components/Paper";
import RecentMatches from "@components/RecentMatches";

import { OnSubscriptionDataOptions } from "@apollo/client";

import { MatchCountProps, MatchCountUpdatedComponent, MatchCountUpdatedSubscription, withMatchCount } from "@query";

import { Root } from "@routes/Home.styles";

interface HomeRouteProps extends MatchCountProps {}
interface HomeRouteStates {
    matchCount: number | null;
}

class HomeRoute extends React.Component<HomeRouteProps, HomeRouteStates> {
    public state: HomeRouteStates = {
        matchCount: null,
    };

    public componentDidUpdate(prevProps: Readonly<HomeRouteProps>) {
        if (this.props.data.loading !== prevProps.data.loading && !this.props.data.loading && typeof this.props.data.matchCount === "number") {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                matchCount: this.props.data.matchCount,
            });
        }
    }

    private handleMatchCountUpdated = ({ subscriptionData }: OnSubscriptionDataOptions<MatchCountUpdatedSubscription>) => {
        if (!subscriptionData.data || this.state.matchCount === null) {
            return;
        }

        this.setState({
            matchCount: subscriptionData.data.matchCountUpdated,
        });
    };

    public render() {
        const { matchCount } = this.state;

        return (
            <Layout>
                <Container>
                    <Root>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Paper loading={matchCount === null} title="Recent matches" subtitle={`${matchCount} Matches`}>
                                    <MatchCountUpdatedComponent onSubscriptionData={this.handleMatchCountUpdated} />
                                    <RecentMatches />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Root>
                </Container>
            </Layout>
        );
    }
}

export default withMatchCount()(HomeRoute);
