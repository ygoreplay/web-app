import React from "react";
import Head from "next/head";

import { Global } from "@emotion/react";
import { Backdrop, Button, CircularProgress, Container, CssBaseline, Typography } from "@mui/material";
import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { withDialog, WithDialogProps } from "@dialogs/withDialog";

import ChampionshipInformation from "@routes/championship/submit/ChampionshipInformation";
import ParticipantList from "@routes/championship/submit/ParticipantList";
import { ParticipantData } from "@routes/championship/submit/types";
import ErrorList from "@routes/championship/submit/ErrorList";

import { Footer, GlobalStyles, Header, Root, Section, TeamNameInput } from "@routes/championship/submit/index.styles";

import { Championship } from "@utils/type";
import { checkIfParticipantDataIsValid } from "@utils/checkIfParticipantDataIsValid";
import {
    ChampionshipType,
    SubmitChampionshipParticipantsDocument,
    SubmitChampionshipParticipantsMutation,
    SubmitChampionshipParticipantsMutationVariables,
} from "queries/index";
import { Placeholder } from "@styles/Placeholder";
import CompleteDialog from "@routes/championship/submit/CompleteDialog";

export interface ChampionshipSubmitRouteProps {
    championship: Championship;
}
export interface ChampionshipSubmitRouteStates {
    participants: ParticipantData[];
    submitting: boolean;
    submitted: boolean;
    errors: string[];
    teamName: string;
}

class ChampionshipSubmitRoute extends React.Component<WithApolloClient<ChampionshipSubmitRouteProps> & WithDialogProps, ChampionshipSubmitRouteStates> {
    public state: ChampionshipSubmitRouteStates = {
        errors: [],
        teamName: "",
        submitting: false,
        submitted: false,
        participants: new Array(this.props.championship.type === ChampionshipType.Individual ? 1 : 3).fill(null).map(() => {
            return {
                deckFile: null,
                name: "",
            };
        }),
    };

    private handleClearClick = () => {
        this.setState({
            teamName: "",
            participants: new Array(this.props.championship.type === ChampionshipType.Individual ? 1 : 3).fill(null).map(() => {
                return {
                    deckFile: null,
                    name: "",
                };
            }),
        });
    };
    private handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            teamName: e.target.value,
        });
    };
    private handleChange = (participants: ParticipantData[]) => {
        this.setState({ participants });
    };
    private handleSubmitClick = async () => {
        const { client, showDialog, championship } = this.props;
        const { participants, teamName } = this.state;
        if (!client || !showDialog) {
            return;
        }

        this.setState({ submitting: true });
        const { data } = await client.mutate<SubmitChampionshipParticipantsMutation, SubmitChampionshipParticipantsMutationVariables>({
            mutation: SubmitChampionshipParticipantsDocument,
            variables: {
                teamName,
                championshipId: championship.id,
                args: participants.map(p => ({ name: p.name, deckFile: p.deckFile })),
            },
        });

        if (!data) {
            this.setState({ submitting: false, errors: [] });
            return;
        }

        if (!data.submitChampionshipParticipants.succeeded) {
            this.setState({
                errors: data.submitChampionshipParticipants.errors,
                submitting: false,
            });

            return;
        }

        this.setState({ submitting: false, submitted: true, errors: [] });
    };

    public render() {
        const { championship } = this.props;
        const { participants, submitting, errors, teamName, submitted } = this.state;

        return (
            <Root>
                <Head>
                    <title>{championship.name} 덱 제출</title>
                </Head>
                <CssBaseline />
                <Global styles={GlobalStyles} />
                <Container maxWidth="md">
                    <Section>
                        <Header>
                            <Typography variant="h6">{championship.name} 정보</Typography>
                        </Header>
                        <ChampionshipInformation championship={championship} />
                    </Section>
                    <Section>
                        <Header>
                            <Typography variant="h6">{championship.name} 덱 제출</Typography>
                        </Header>
                        {championship.type === ChampionshipType.Team && (
                            <TeamNameInput
                                disabled={submitted || submitting}
                                value={teamName}
                                onChange={this.handleTeamNameChange}
                                placeholder="팀 이름 입력..."
                            />
                        )}
                        <ParticipantList
                            disabled={submitting || submitted}
                            onChange={this.handleChange}
                            value={participants}
                            count={championship.type === ChampionshipType.Individual ? 1 : 3}
                        />
                        <Footer>
                            <Placeholder />
                            <Button onClick={this.handleClearClick} disabled={submitted}>
                                초기화
                            </Button>
                            <Button
                                onClick={this.handleSubmitClick}
                                disabled={!checkIfParticipantDataIsValid(participants) || submitted}
                                variant="contained"
                                disableElevation
                            >
                                제출
                            </Button>
                        </Footer>
                    </Section>
                    {errors.length > 0 && <ErrorList errors={errors} />}
                </Container>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={submitting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CompleteDialog open={submitted} />
            </Root>
        );
    }
}

export default withApollo<ChampionshipSubmitRouteProps>(withDialog(ChampionshipSubmitRoute));
