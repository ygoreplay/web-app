import React from "react";

import { AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ChampionshipTeam } from "@routes/championship/monitor/types";

import { ButtonContainer, DeckList, Item, ParticipantSection, Root, Card, DeckListContainer } from "./TeamParticipantList.styles";
import memoizeOne from "memoize-one";

export interface TeamParticipantListProps {
    teams: ChampionshipTeam[];
    onDeleteTeam(team: ChampionshipTeam): Promise<void>;
}
export interface TeamParticipantListStates {}

export default class TeamParticipantList extends React.Component<TeamParticipantListProps, TeamParticipantListStates> {
    private handleDeleteClick = memoizeOne((team: ChampionshipTeam) => {
        return async () => {
            await this.props.onDeleteTeam(team);
        };
    });

    private renderCard = (cardId: number, index: number) => {
        return <Card key={index} style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${cardId}.jpg)` }} />;
    };
    private renderParticipant = (p: ChampionshipTeam["participants"][0]) => {
        return (
            <ParticipantSection key={p.name}>
                <Typography variant="body1">
                    {p.name} (메인: {p.main.length}, 엑스트라: {p.extra.length}, 사이드: {p.side.length})
                </Typography>
                <DeckListContainer>
                    <DeckList>{p.main.map(this.renderCard)}</DeckList>
                    <DeckList>{p.extra.map(this.renderCard)}</DeckList>
                    <DeckList>{p.side.map(this.renderCard)}</DeckList>
                </DeckListContainer>
            </ParticipantSection>
        );
    };
    private renderTeam = (team: ChampionshipTeam) => {
        const teamMemberNames = team.participants.map(p => p.name);

        return (
            <Item key={team.name}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography sx={{ width: "40%", flexShrink: 0 }}>{team.name}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>{teamMemberNames.join(", ")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {team.participants.map(this.renderParticipant)}
                    <ButtonContainer>
                        <Button onClick={this.handleDeleteClick(team)} color="error" variant="contained" disableElevation>
                            제출 데이터 삭제
                        </Button>
                    </ButtonContainer>
                </AccordionDetails>
            </Item>
        );
    };
    public render() {
        const { teams } = this.props;

        return <Root>{teams.map(this.renderTeam)}</Root>;
    }
}
