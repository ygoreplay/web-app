import _ from "lodash";
import React from "react";

import { Item, Name, Root, Value } from "@routes/championship/submit/ChampionshipInformation.styles";

import { ChampionshipForMonitor } from "@utils/type";
import { ChampionshipType } from "queries/index";

interface SubmitInformationProps {
    championship: ChampionshipForMonitor;
}

export default class SubmitInformation extends React.Component<SubmitInformationProps> {
    public render() {
        const { championship } = this.props;

        return (
            <Root>
                <Item>
                    <Name>참가자 수</Name>
                    <Value>{championship.participants.length}명</Value>
                </Item>
                {championship.type === ChampionshipType.Team && (
                    <Item>
                        <Name>참가 팀 수</Name>
                        <Value>
                            {_.chain(championship.participants)
                                .countBy(p => p.teamName)
                                .keys()
                                .size()
                                .value()}
                            팀
                        </Value>
                    </Item>
                )}
            </Root>
        );
    }
}
