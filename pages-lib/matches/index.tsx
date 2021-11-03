import React from "react";

import { Button, Checkbox, Container, FormControlLabel, FormGroup, Grid } from "@mui/material";

import Layout from "@components/Layout";
import MatchList from "@components/MatchList";
import OptionBox from "@components/OptionBox";

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
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        필터 설정
                                    </Grid>
                                    <Grid item xs={12}>
                                        <OptionBox title="매치 타입">
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox size="small" />} label="티어" />
                                                <FormControlLabel control={<Checkbox size="small" />} label="일반" />
                                            </FormGroup>
                                        </OptionBox>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="outlined" fullWidth>
                                            필터 적용
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth>필터 초기화</Button>
                                    </Grid>
                                </Grid>
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
