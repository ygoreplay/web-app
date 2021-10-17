import React from "react";
import moment from "moment";

import { Box, Tab, Tabs, Typography } from "@mui/material";

import MatchDeckView from "@routes/matches/views/Deck";

import Layout from "@components/Layout";

import { MatchType } from "queries/index";

import { Content, Field, FieldGroup, FieldTitle, FieldValue, Root, SideBar, Title, Wrapper } from "@routes/matches/Match.styles";

import { MatchDetail } from "@utils/type";

export interface MatchRouteProps {
    match: MatchDetail;
}
export interface MatchRouteStates {
    currentTab: "general" | "homeDeck" | "awayDeck";
}

export default class MatchRoute extends React.Component<MatchRouteProps, MatchRouteStates> {
    public state: MatchRouteStates = {
        currentTab: "homeDeck",
    };

    private handleTabChange = (_: any, value: MatchRouteStates["currentTab"]) => {
        this.setState({
            currentTab: value,
        });
    };

    private renderPlayerInformation = (playerDeck: MatchDetail["home"], groupName: string) => {
        return (
            <FieldGroup>
                <Field>
                    <FieldTitle>{groupName}</FieldTitle>
                </Field>
                <Field>
                    <FieldTitle>이름</FieldTitle>
                    <FieldValue>
                        <time>{playerDeck.player.name}</time>
                    </FieldValue>
                </Field>
                <Field>
                    <FieldTitle>사용 덱</FieldTitle>
                    <FieldValue>
                        <time>{playerDeck.deck.recognizedName}</time>
                    </FieldValue>
                </Field>
                {playerDeck.deck.recognizedDeckTags.length > 1 && (
                    <Field>
                        <FieldTitle>덱 태그</FieldTitle>
                        <FieldValue>
                            <time>{playerDeck.deck.recognizedDeckTags.join(", ")}</time>
                        </FieldValue>
                    </Field>
                )}
            </FieldGroup>
        );
    };
    private renderSideBar = () => {
        const { match } = this.props;

        return (
            <SideBar>
                <Title>
                    <Typography variant="h6">
                        {match.type === MatchType.Athletic ? "티어" : "일반"} 매치 #{match.id}
                    </Typography>
                </Title>
                {this.renderPlayerInformation(match.home, "홈 플레이어")}
                {this.renderPlayerInformation(match.away, "어웨이 플레이어")}
                <FieldGroup>
                    {match.winner && (
                        <Field>
                            <FieldTitle>승리 플레이어</FieldTitle>
                            <FieldValue>
                                <time>{match.winner.name}</time>
                            </FieldValue>
                        </Field>
                    )}
                    <Field>
                        <FieldTitle>적용 금제</FieldTitle>
                        <FieldValue>
                            <time>
                                {match.matchRule.banListDate} {match.matchRule.isTCG ? "TCG" : "OCG"}
                            </time>
                        </FieldValue>
                    </Field>
                    <Field>
                        <FieldTitle>라운드 수</FieldTitle>
                        <FieldValue>
                            <time>{match.roundCount}</time>
                        </FieldValue>
                    </Field>
                    <Field>
                        <FieldTitle>시작 시간</FieldTitle>
                        <FieldValue>
                            <time>{moment(match.startedAt).format("YYYY-MM-DD HH:mm:ss")}</time>
                        </FieldValue>
                    </Field>
                    <Field>
                        <FieldTitle>종료 시간</FieldTitle>
                        <FieldValue>
                            <time>{moment(match.finishedAt).format("YYYY-MM-DD HH:mm:ss")}</time>
                        </FieldValue>
                    </Field>
                </FieldGroup>
            </SideBar>
        );
    };
    public render() {
        const { match } = this.props;
        const { currentTab } = this.state;

        return (
            <Layout withoutPadding fullHeight>
                <Root>
                    {this.renderSideBar()}
                    <Wrapper>
                        <Box style={{ borderBottom: "1px solid #e0e5ee" }}>
                            <Tabs onChange={this.handleTabChange} value={currentTab}>
                                <Tab label="개요" />
                                <Tab value="homeDeck" label={`홈 플레이어 덱 (${match.home.deck.recognizedName})`} />
                                <Tab value="awayDeck" label={`어웨이 플레이어 덱 (${match.away.deck.recognizedName})`} />
                            </Tabs>
                        </Box>
                        <Content>{(currentTab === "homeDeck" || currentTab === "awayDeck") && <MatchDeckView match={match} currentTab={currentTab} />}</Content>
                    </Wrapper>
                </Root>
            </Layout>
        );
    }
}
