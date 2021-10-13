import React from "react";

import { Skeleton, Typography } from "@mui/material";

import { Content, Root, TitleWrapper } from "@components/Paper.styles";
import { Placeholder } from "@styles/Placeholder";

interface PaperProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    loading?: boolean;
}
interface PaperStates {}

export default class Paper extends React.Component<PaperProps, PaperStates> {
    public render() {
        const { title, children, subtitle, loading } = this.props;

        return (
            <Root elevation={0}>
                <TitleWrapper>
                    {title && <Typography variant="h6">{loading ? <Skeleton animation="wave" width={200} /> : title}</Typography>}
                    <Placeholder />
                    {subtitle && <Typography variant="subtitle1">{loading ? <Skeleton animation="wave" width={200} /> : subtitle}</Typography>}
                </TitleWrapper>
                <Content>{children}</Content>
            </Root>
        );
    }
}
