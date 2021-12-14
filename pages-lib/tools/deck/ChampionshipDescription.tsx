import React from "react";

import { Box } from "@mui/material";

import { DescriptionItem, Root, Title, Value } from "@routes/tools/deck/ChampionshipDescription.styles";

import { Championship } from "@utils/type";

import { Placeholder } from "@styles/Placeholder";
import { ChampionshipType } from "queries/index";

export interface ChampionshipDescriptionProps {
    championship: Championship;
}

export const CHAMPIONSHIP_DESCRIPTION_WIDTH = 300;

export default function ChampionshipDescription({ championship }: ChampionshipDescriptionProps) {
    return (
        <Box component="nav" sx={{ width: { sm: CHAMPIONSHIP_DESCRIPTION_WIDTH }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            <Root>
                <DescriptionItem>
                    <Title>
                        <strong>대회 정보</strong>
                    </Title>
                </DescriptionItem>
                <DescriptionItem>
                    <Title>대회 이름</Title>
                    <Placeholder />
                    <Value>{championship.name}</Value>
                </DescriptionItem>
                <DescriptionItem>
                    <Title>진행 방식</Title>
                    <Placeholder />
                    <Value>{championship.type === ChampionshipType.Team ? "팀전" : "개인전"}</Value>
                </DescriptionItem>
                <DescriptionItem>
                    <Title>적용 금제</Title>
                    <Placeholder />
                    <Value>{championship.banList}</Value>
                </DescriptionItem>
                <DescriptionItem>
                    <Title>
                        <strong>특수 룰</strong>
                    </Title>
                </DescriptionItem>
                <DescriptionItem>
                    <Title>금제 공유</Title>
                    <Placeholder />
                    <Value>{championship.shareBanLists ? "예" : "아니오"}</Value>
                </DescriptionItem>
                <DescriptionItem>
                    <Title>카드 매 수 공유</Title>
                    <Placeholder />
                    <Value>{championship.shareCardCount ? "예" : "아니오"}</Value>
                </DescriptionItem>
            </Root>
        </Box>
    );
}
