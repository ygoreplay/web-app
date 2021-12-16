import React from "react";

import HelpIcon from "@mui/icons-material/Help";

import { Championship } from "@utils/type";

import { Item, Name, Root, Value } from "./ChampionshipInformation.styles";
import { ChampionshipType } from "queries/index";
import { Tooltip } from "@mui/material";

export interface ChampionshipInformationProps {
    championship: Championship;
}
export interface ChampionshipInformationStates {}

export default class ChampionshipInformation extends React.Component<ChampionshipInformationProps, ChampionshipInformationStates> {
    public render() {
        const { championship } = this.props;

        return (
            <Root>
                <Item>
                    <Name>진행 방식</Name>
                    <Value>{championship.type === ChampionshipType.Individual ? "개인전" : "팀전"}</Value>
                </Item>
                <Item>
                    <Name>금제</Name>
                    <Value>{championship.banList}</Value>
                </Item>
                <Item>
                    <Name>
                        <span>특수 룰 - 카드 매수 공유</span>
                        <Tooltip title="매수를 공유하면 금제가 적용되지 않은 카드의 경우 참가자의 덱을 모두 합하여 3장까지 채용이 가능합니다.">
                            <HelpIcon />
                        </Tooltip>
                    </Name>
                    <Value>{championship.shareCardCount ? "✔️" : "❌"}</Value>
                </Item>
                <Item>
                    <Name>
                        <span>특수 룰 - 금제 공유</span>
                        <Tooltip title="금제를 공유하면 참가자들의 덱을 모두 합하여 해당 카드에 적용된 금제 매수 이상의 카드를 채용 할 수 없습니다.">
                            <HelpIcon />
                        </Tooltip>
                    </Name>
                    <Value>{championship.shareBanLists ? "✔️" : "❌"}</Value>
                </Item>
            </Root>
        );
    }
}
