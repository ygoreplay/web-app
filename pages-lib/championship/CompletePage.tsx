/* eslint-disable no-restricted-globals,react/jsx-curly-brace-presence */
import React from "react";

import { Typography } from "@mui/material";

import DialogPage from "@routes/championship/DialogPage";
import { withChampionshipCreationData, WithChampionshipCreationDataProps } from "@routes/championship/withChampionshipCreationData";
import { BaseChampionshipDialogPageProps } from "@routes/championship/type";

import { Root, UrlBlock } from "@routes/championship/TitlePage.styles";

export interface CompletePageProps extends BaseChampionshipDialogPageProps {}
export interface CompletePageStates {}

class CompletePage extends React.Component<CompletePageProps & WithChampionshipCreationDataProps, CompletePageStates> {
    public render() {
        const { result, ...baseProps } = this.props;
        if (!result) {
            return null;
        }

        return (
            <DialogPage {...baseProps}>
                <Root>
                    <Typography variant="body1" gutterBottom>
                        대회 개최를 완료 하였습니다.
                    </Typography>
                    <Typography variant="body1">참가자에게 다음의 URL을 제공하여 덱을 제출할 수 있도록 도와주세요:</Typography>
                    <UrlBlock>
                        {location.protocol}
                        {"//"}
                        {location.host}/championship/submit/{result.joinUrl}
                    </UrlBlock>
                    <Typography variant="body1">접수된 덱 내역을 실시간으로 조회하려면 다음 URL로 접속하세요:</Typography>
                    <UrlBlock>
                        {location.protocol}
                        {"//"}
                        {location.host}/championship/monitor/{result.monitorUrl}
                    </UrlBlock>
                    <Typography variant="body1">위 URL은 다시 조회할수 없으므로 메모 및 저장을 권장합니다.</Typography>
                </Root>
            </DialogPage>
        );
    }
}

export default withChampionshipCreationData(CompletePage);
