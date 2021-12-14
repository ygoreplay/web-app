import React from "react";

import { Backdrop, CircularProgress, Dialog, ThemeProvider, Typography } from "@mui/material";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { deckToolDialogTheme } from "@routes/tools/deck/ChampionshipSettingsDialog";
import TeamChampionshipForm, { TeamChampionshipFormValues } from "@routes/tools/deck/TeamChampionshipForm";
import IndividualChampionshipForm, { IndividualChampionshipFormValues } from "@routes/tools/deck/IndividualChampionshipForm";

import { Content, Root } from "@routes/tools/deck/ChampionshipJoinDialog.styles";
import { Title } from "@routes/tools/deck/ChampionshipSettingsForm.styles";

import { Championship } from "@utils/type";
import { ChampionshipType } from "@query";

export type ChampionshipJoinDialogValue = IndividualChampionshipFormValues | TeamChampionshipFormValues;

export interface ChampionshipJoinDialogProps {
    open: boolean;
    championship: Championship;

    onSubmit(value: ChampionshipJoinDialogValue): void;
}
export interface ChampionshipJoinDialogStates {
    championshipSubmitting: boolean;
}

class ChampionshipSettingsDialog extends React.Component<WithApolloClient<ChampionshipJoinDialogProps>, ChampionshipJoinDialogStates> {
    public state: ChampionshipJoinDialogStates = {
        championshipSubmitting: false,
    };

    public render() {
        const { open, championship } = this.props;
        const { championshipSubmitting } = this.state;

        return (
            <ThemeProvider theme={deckToolDialogTheme}>
                <Dialog maxWidth="sm" fullWidth open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <Root>
                        <Title>
                            <Typography variant="h6">{championship.name} 참가 정보 작성</Typography>
                        </Title>
                        <Content>
                            {championship.type === ChampionshipType.Individual && <IndividualChampionshipForm onSubmit={this.props.onSubmit} />}
                            {championship.type === ChampionshipType.Team && <TeamChampionshipForm onSubmit={this.props.onSubmit} />}
                        </Content>
                    </Root>
                </Dialog>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={championshipSubmitting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </ThemeProvider>
        );
    }
}

export default withApollo<ChampionshipJoinDialogProps>(ChampionshipSettingsDialog);
