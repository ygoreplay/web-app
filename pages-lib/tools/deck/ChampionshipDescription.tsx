import React from "react";
import memoizeOne from "memoize-one";

import { Box } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";

import { withDeckEditor, WithDeckEditorProps } from "@routes/tools/deck/withDeckEditor";
import { ParticipantType } from "@routes/tools/deck/types";

import { DeckList, DeckListItem, DescriptionGroup, DescriptionItem, Indicator, Root, Title, Value } from "@routes/tools/deck/ChampionshipDescription.styles";

import { Championship } from "@utils/type";

import { Placeholder } from "@styles/Placeholder";
import { ChampionshipType } from "queries/index";

export interface ChampionshipDescriptionProps {
    championshipData: Championship;
}

export const CHAMPIONSHIP_DESCRIPTION_WIDTH = 300;

class ChampionshipDescription extends React.Component<ChampionshipDescriptionProps & WithDeckEditorProps> {
    private handleParticipantClick = memoizeOne((participantType: ParticipantType) => {
        return () => {
            this.props.setSelectedParticipant(participantType);
        };
    });

    render() {
        const { championshipData, championshipJoinValue, selectedParticipant, decks } = this.props;

        return (
            <Box component="nav" sx={{ width: { sm: CHAMPIONSHIP_DESCRIPTION_WIDTH }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Root>
                    <DescriptionGroup>
                        <DescriptionItem>
                            <Title>
                                <strong>대회 정보</strong>
                            </Title>
                        </DescriptionItem>
                        <DescriptionItem>
                            <Title>대회 이름</Title>
                            <Placeholder />
                            <Value>{championshipData.name}</Value>
                        </DescriptionItem>
                        <DescriptionItem>
                            <Title>진행 방식</Title>
                            <Placeholder />
                            <Value>{championshipData.type === ChampionshipType.Team ? "팀전" : "개인전"}</Value>
                        </DescriptionItem>
                        <DescriptionItem>
                            <Title>적용 금제</Title>
                            <Placeholder />
                            <Value>{championshipData.banList}</Value>
                        </DescriptionItem>
                    </DescriptionGroup>
                    <DescriptionGroup>
                        <DescriptionItem>
                            <Title>
                                <strong>특수 룰</strong>
                            </Title>
                        </DescriptionItem>
                        <DescriptionItem>
                            <Title>금제 공유</Title>
                            <Placeholder />
                            <Value>{championshipData.shareBanLists ? "예" : "아니오"}</Value>
                        </DescriptionItem>
                        <DescriptionItem>
                            <Title>카드 매 수 공유</Title>
                            <Placeholder />
                            <Value>{championshipData.shareCardCount ? "예" : "아니오"}</Value>
                        </DescriptionItem>
                    </DescriptionGroup>
                    {championshipData.type === ChampionshipType.Team && championshipJoinValue && "firstParticipantName" in championshipJoinValue && (
                        <DescriptionGroup>
                            <DescriptionItem>
                                <Title>
                                    <strong>덱 목록</strong>
                                </Title>
                            </DescriptionItem>
                            <DeckList>
                                <DeckListItem
                                    role="button"
                                    tabIndex={-1}
                                    selected={selectedParticipant === "first"}
                                    onClick={this.handleParticipantClick("first")}
                                >
                                    <ChevronRight />
                                    {championshipJoinValue.firstParticipantName}
                                    <Indicator passed={decks.first.main.length >= 40} />
                                </DeckListItem>
                                <DeckListItem
                                    role="button"
                                    tabIndex={-1}
                                    selected={selectedParticipant === "second"}
                                    onClick={this.handleParticipantClick("second")}
                                >
                                    <ChevronRight />
                                    {championshipJoinValue.secondParticipantName}
                                    <Indicator passed={decks.second.main.length >= 40} />
                                </DeckListItem>
                                <DeckListItem
                                    role="button"
                                    tabIndex={-1}
                                    selected={selectedParticipant === "third"}
                                    onClick={this.handleParticipantClick("third")}
                                >
                                    <ChevronRight />
                                    {championshipJoinValue.thirdParticipantName}
                                    <Indicator passed={decks.third.main.length >= 40} />
                                </DeckListItem>
                            </DeckList>
                        </DescriptionGroup>
                    )}
                </Root>
            </Box>
        );
    }
}

export default withDeckEditor(ChampionshipDescription);
