import React from "react";

import { Global } from "@emotion/react";
import { Backdrop, Button, CircularProgress, Container, CssBaseline, Typography } from "@mui/material";
import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { withDialog, WithDialogProps } from "@dialogs/withDialog";

import ParticipantList from "@routes/championship/submit/ParticipantList";
import { ParticipantData } from "@routes/championship/submit/types";

import { Footer, GlobalStyles, Header, Root, Section } from "@routes/championship/submit/index.styles";

import { Championship } from "@utils/type";
import { checkIfParticipantDataIsValid } from "@utils/checkIfParticipantDataIsValid";
import {
    ChampionshipType,
    SubmitChampionshipParticipantsDocument,
    SubmitChampionshipParticipantsMutation,
    SubmitChampionshipParticipantsMutationVariables,
} from "queries/index";
import { Placeholder } from "@styles/Placeholder";

export interface ChampionshipSubmitRouteProps {
    championship: Championship;
}
export interface ChampionshipSubmitRouteStates {
    participants: ParticipantData[];
    submitting: boolean;
}

class ChampionshipSubmitRoute extends React.Component<WithApolloClient<ChampionshipSubmitRouteProps> & WithDialogProps, ChampionshipSubmitRouteStates> {
    public state: ChampionshipSubmitRouteStates = {
        submitting: false,
        participants: new Array(this.props.championship.type === ChampionshipType.Individual ? 1 : 3).fill(null).map(() => {
            return {
                deckFile: null,
                name: "",
            };
        }),
    };

    private handleChange = (participants: ParticipantData[]) => {
        this.setState({ participants });
    };
    private handleSubmitClick = async () => {
        const { client, showDialog, championship } = this.props;
        const { participants } = this.state;
        if (!client || !showDialog) {
            return;
        }

        this.setState({ submitting: true });
        const { data } = await client.mutate<SubmitChampionshipParticipantsMutation, SubmitChampionshipParticipantsMutationVariables>({
            mutation: SubmitChampionshipParticipantsDocument,
            variables: {
                championshipId: championship.id,
                args: participants.map(p => ({ name: p.name, deckFile: p.deckFile })),
            },
        });

        if (!data) {
            this.setState({ submitting: false });
            return;
        }

        this.setState({ submitting: false });
    };

    public render() {
        const { championship } = this.props;
        const { participants, submitting } = this.state;

        return (
            <Root>
                <CssBaseline />
                <Global styles={GlobalStyles} />
                <Container maxWidth="md">
                    <Section>
                        <Header>
                            <Typography variant="h6">{championship.name} 덱 제출</Typography>
                        </Header>
                        <ParticipantList onChange={this.handleChange} value={participants} count={championship.type === ChampionshipType.Individual ? 1 : 3} />
                        <Footer>
                            <Placeholder />
                            <Button
                                onClick={this.handleSubmitClick}
                                disabled={!checkIfParticipantDataIsValid(participants)}
                                variant="contained"
                                disableElevation
                            >
                                제출
                            </Button>
                        </Footer>
                    </Section>
                </Container>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={submitting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Root>
        );
    }
}

export default withApollo<ChampionshipSubmitRouteProps>(withDialog(ChampionshipSubmitRoute));
