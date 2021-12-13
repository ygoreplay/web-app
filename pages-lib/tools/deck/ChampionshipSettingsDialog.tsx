import React from "react";

import { Backdrop, CircularProgress, createTheme, Dialog, ThemeProvider } from "@mui/material";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import ChampionshipSettingsForm, { ChampionshipSettingsFormValues } from "./ChampionshipSettingsForm";

import { Root } from "@routes/tools/deck/ChampionshipSettingsDialog.styles";

import { ChampionshipType, CreateChampionshipDocument, CreateChampionshipMutation, CreateChampionshipMutationVariables } from "@query";

export interface ChampionshipSettingsDialogProps {
    open: boolean;
    onClose(): void;
    banLists: string[];
}
export interface ChampionshipSettingsDialogStates {
    championshipSubmitting: boolean;
}

export const deckToolDialogTheme = createTheme({
    typography: {
        fontFamily: `'Spoqa Han Sans Neo', sans-serif`,
        fontSize: 14,
    },
});

class ChampionshipSettingsDialog extends React.Component<WithApolloClient<ChampionshipSettingsDialogProps>, ChampionshipSettingsDialogStates> {
    public state: ChampionshipSettingsDialogStates = {
        championshipSubmitting: false,
    };

    private handleSubmit = async (value: ChampionshipSettingsFormValues) => {
        const { client } = this.props;
        if (!client) {
            throw new Error("Apollo client is not initialized while creating championship instance!");
        }

        this.setState({ championshipSubmitting: true });

        const { data } = await client.mutate<CreateChampionshipMutation, CreateChampionshipMutationVariables>({
            mutation: CreateChampionshipDocument,
            variables: {
                data: {
                    shareCardCount: value.shareCardCount,
                    shareBanLists: value.shareBanLists,
                    banList: value.banList,
                    type: value.type === "team" ? ChampionshipType.Team : ChampionshipType.Individual,
                    title: value.title,
                },
            },
        });

        if (!data) {
            throw new Error("Error was occurred while creating championship instance!");
        }

        this.setState({ championshipSubmitting: false });
        return data.createChampionship;
    };

    public render() {
        const { open, banLists } = this.props;
        const { championshipSubmitting } = this.state;

        return (
            <ThemeProvider theme={deckToolDialogTheme}>
                <Dialog maxWidth="sm" fullWidth open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <Root>
                        <ChampionshipSettingsForm onSubmit={this.handleSubmit} banLists={banLists} />
                    </Root>
                </Dialog>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={championshipSubmitting}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </ThemeProvider>
        );
    }
}

export default withApollo<ChampionshipSettingsDialogProps>(ChampionshipSettingsDialog);
