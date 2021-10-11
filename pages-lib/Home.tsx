import React from "react";

import { Container, Grid } from "@mui/material";

import Layout from "@components/Layout";
import Paper from "@components/Paper";
import RecentMatches from "@components/RecentMatches";

import { Root } from "@routes/Home.styles";

interface HomeRouteProps {}
interface HomeRouteStates {}

export default class HomeRoute extends React.Component<HomeRouteProps, HomeRouteStates> {
    public render() {
        return (
            <Layout>
                <Container>
                    <Root>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Paper title="Recent matches">
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
