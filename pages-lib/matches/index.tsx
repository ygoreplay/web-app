import React from "react";

import { Container, Grid } from "@mui/material";

import Layout from "@components/Layout";
import MatchList from "@components/MatchList";

import { Root } from "@routes/matches/index.styles";
import MatchListFilterForm from "@forms/MatchListFilter";

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
                                <MatchListFilterForm />
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
