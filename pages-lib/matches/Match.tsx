import React from "react";
import moment from "moment";

import { Typography } from "@mui/material";

import Layout from "@components/Layout";

import { Content, Field, FieldGroup, FieldTitle, FieldValue, Root, SideBar, Title } from "@routes/matches/Match.styles";

import { MatchDetail } from "@utils/type";
import { MatchType } from "queries/index";
import DeckRecipe from "@components/DeckRecipe";

export interface MatchRouteProps {
    match: MatchDetail;
}
export interface MatchRouteStates {}

export default class MatchRoute extends React.Component<MatchRouteProps, MatchRouteStates> {
    private renderPlayerInformation = (player: MatchDetail["players"][0], groupName: string) => {
        const playerDeck = this.props.match.rounds[0].playerDecks.find(pd => pd.player.id === player.id);
        if (!playerDeck) {
            return null;
        }

        return (
            <FieldGroup>
                <Field>
                    <FieldTitle>{groupName}</FieldTitle>
                </Field>
                <Field>
                    <FieldTitle>이름</FieldTitle>
                    <FieldValue>
                        <time>{player.name}</time>
                    </FieldValue>
                </Field>
                <Field>
                    <FieldTitle>사용 덱</FieldTitle>
                    <FieldValue>
                        <time>{playerDeck.deck.recognizedName}</time>
                    </FieldValue>
                </Field>
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
                {this.renderPlayerInformation(match.players[0], "홈 플레이어")}
                {this.renderPlayerInformation(match.players[1], "어웨이 플레이어")}
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
                            <time>{match.rounds.length}</time>
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

        return (
            <Layout withoutPadding fullHeight>
                <Root>
                    {this.renderSideBar()}
                    <Content>
                        <DeckRecipe type="list" deck={match.rounds[0].playerDecks[0].deck} />
                    </Content>
                </Root>
            </Layout>
        );
    }
}
