import React from "react";

import { Card, Container, Grid } from "@mui/material";

import Layout from "@components/Layout";
import MatchList from "@components/MatchList";

import { Root } from "@routes/matches/index.styles";

export interface MatchesRouteProps {}
export interface MatchesRouteStates {}

export default class MatchesRoute extends React.Component<MatchesRouteProps, MatchesRouteStates> {
    public render() {
        return (
            <Layout>
                <Container maxWidth="xl">
                    <Root>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Card elevation={0}>123</Card>
                            </Grid>
                            <Grid item xs={9}>
                                <MatchList infinite />
                            </Grid>
                        </Grid>
                    </Root>
                </Container>
            </Layout>
        );
    }
}
