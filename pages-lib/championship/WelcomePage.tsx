import React from "react";

import { Typography } from "@mui/material";

import DialogPage from "@routes/championship/DialogPage";
import { BaseChampionshipDialogPageProps } from "@routes/championship/type";

import { Root } from "@routes/championship/WelcomePage.styles";

export interface WelcomePageProps extends BaseChampionshipDialogPageProps {}
export interface WelcomePageStates {}

export default class WelcomePage extends React.Component<WelcomePageProps, WelcomePageStates> {
    public render() {
        const { ...baseProps } = this.props;

        return (
            <DialogPage isValid {...baseProps}>
                <Root>
                    <Typography variant="body1" gutterBottom>
                        해당 페이지에서 대회를 개최하게 되면 참가자로 부터 제출된 덱을 실시간으로 보고 받을 수 있습니다.
                    </Typography>
                    <Typography variant="body1">대회가 따르는 금제를 명시할 수 있으며, 덱 제출시 적용되는 특수 룰을 지정 할 수 있습니다.</Typography>
                </Root>
            </DialogPage>
        );
    }
}
