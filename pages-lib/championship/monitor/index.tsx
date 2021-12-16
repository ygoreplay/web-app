import React from "react";
import _ from "lodash";

import { Backdrop, CircularProgress, Container, CssBaseline, Typography } from "@mui/material";
import { Global } from "@emotion/react";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { withDialog, WithDialogProps } from "@dialogs/withDialog";
import { DialogCloseReason, DialogType } from "@dialogs/types";

import SubmitInformation from "@routes/championship/monitor/SubmitInformation";
import TeamParticipantList from "@routes/championship/monitor/TeamParticipantList";
import { ChampionshipTeam } from "@routes/championship/monitor/types";

import { Header, Root, Section } from "@routes/championship/monitor/index.styles";
import { GlobalStyles } from "@routes/championship/submit/index.styles";

import { ChampionshipForMonitor } from "@utils/type";
import {
    ChampionshipForMonitorDocument,
    ChampionshipForMonitorQuery,
    ChampionshipForMonitorQueryVariables,
    ChampionshipType,
    DeleteParticipantDocument,
    DeleteParticipantMutation,
    DeleteParticipantMutationVariables,
} from "queries/index";

export interface ChampionshipMonitorRouteProps {
    championship: ChampionshipForMonitor;
    teams: ChampionshipTeam[];
    code: string;
}
export interface ChampionshipMonitorRouteStates {
    deleting: boolean;
    championship: ChampionshipForMonitor;
    teams: ChampionshipTeam[];
}

class ChampionshipMonitorRoute extends React.Component<WithApolloClient<ChampionshipMonitorRouteProps> & WithDialogProps, ChampionshipMonitorRouteStates> {
    public state: ChampionshipMonitorRouteStates = {
        deleting: false,
        championship: this.props.championship,
        teams: this.props.teams,
    };

    private invalidateData = async () => {
        const { client } = this.props;
        if (!client) {
            return;
        }

        const { data } = await client.query<ChampionshipForMonitorQuery, ChampionshipForMonitorQueryVariables>({
            query: ChampionshipForMonitorDocument,
            variables: {
                code: this.props.code,
            },
        });

        if (!data || !data.championship) {
            return;
        }

        const result: ChampionshipTeam[] = [];
        if (data.championship.type === ChampionshipType.Team) {
            const teamMap = _.chain(data.championship.participants)
                .groupBy(p => p.teamName)
                .value();

            const teamNames = Object.keys(teamMap);
            for (let i = 0; i < teamNames.length; i++) {
                const teamName = teamNames[i];
                result.push({
                    name: teamName,
                    participants: teamMap[teamName],
                });
            }
        }

        this.setState({
            championship: data.championship,
            teams: result,
        });
    };
    private handleDeleteTeam = async (team: ChampionshipTeam) => {
        const { showDialog } = this.props;
        if (!showDialog || !this.props.client) {
            return;
        }

        const { reason } = await showDialog(DialogType.YesNo, `정말 '${team.name}' 팀의 덱 제출 데이터를 삭제 하시겠습니까?`, {
            title: "덱 제출 데이터 삭제",
            positiveButtonLabel: "삭제",
            negativeButtonLabel: "취소",
        });

        if (reason !== DialogCloseReason.Yes) {
            return;
        }

        this.setState({ deleting: true });

        const { data } = await this.props.client.mutate<DeleteParticipantMutation, DeleteParticipantMutationVariables>({
            mutation: DeleteParticipantDocument,
            variables: {
                participantId: team.participants[0].id,
            },
        });

        if (!data || !data.deleteParticipant.succeeded) {
            // TODO: 에러 처리
            this.setState({ deleting: false });
            return;
        }

        await this.invalidateData();
        this.setState({ deleting: false });
    };

    public render() {
        const { deleting, championship, teams } = this.state;

        return (
            <Root>
                <CssBaseline />
                <Global styles={GlobalStyles} />
                <Container maxWidth="md">
                    <Section>
                        <Header>
                            <Typography variant="h6">{championship.name} 덱 제출 현황</Typography>
                        </Header>
                        <SubmitInformation championship={championship} />
                    </Section>
                    <Section>
                        <Header style={{ borderBottom: 0 }}>
                            <Typography variant="body1">제출한 {championship.type === ChampionshipType.Team ? "팀" : "참가자"} 목록</Typography>
                        </Header>
                    </Section>
                    <TeamParticipantList onDeleteTeam={this.handleDeleteTeam} teams={teams} />
                </Container>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={deleting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Root>
        );
    }
}

export default withApollo<ChampionshipMonitorRouteProps>(withDialog(ChampionshipMonitorRoute));
