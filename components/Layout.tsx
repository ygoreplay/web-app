import React from "react";

import { Container, CssBaseline } from "@mui/material";

import Header from "@components/Header";

import { Main, Root } from "@components/Layout.styles";

interface LayoutProps {
    children: React.ReactNode;
}
interface LayoutStates {}

export default class Layout extends React.Component<LayoutProps, LayoutStates> {
    public render() {
        return (
            <Root>
                <CssBaseline />
                <Header />
                <Main>{this.props.children}</Main>
            </Root>
        );
    }
}
