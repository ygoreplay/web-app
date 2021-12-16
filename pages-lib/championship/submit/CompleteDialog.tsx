import React from "react";

import { Dialog, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Description, Icon, Root } from "@routes/championship/submit/CompleteDialog.styles";

export interface CompleteDialogProps {
    open: boolean;
}
export interface CompleteDialogStates {}

export default class CompleteDialog extends React.Component<CompleteDialogProps, CompleteDialogStates> {
    public render() {
        const { open } = this.props;

        return (
            <Dialog maxWidth="xs" fullWidth open={open}>
                <Root>
                    <Icon>
                        <CheckCircleIcon />
                    </Icon>
                    <Typography variant="h6" align="center">
                        덱 제출 완료
                    </Typography>
                    <Description>
                        <Typography variant="body1">덱 제출을 완료 하였습니다. 참가해주셔서 감사합니다.</Typography>
                    </Description>
                </Root>
            </Dialog>
        );
    }
}
