import React from "react";

import { Content, Root, TitleWrapper } from "@components/Paper.styles";
import { Typography } from "@mui/material";

interface PaperProps {
    title: string;
    children: React.ReactNode;
}
interface PaperStates {}

export default class Paper extends React.Component<PaperProps, PaperStates> {
    public render() {
        const { title, children } = this.props;

        return (
            <Root elevation={0}>
                <TitleWrapper>{title && <Typography variant="h6">{title}</Typography>}</TitleWrapper>
                <Content>{children}</Content>
            </Root>
        );
    }
}
