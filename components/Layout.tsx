import React from "react";

import { CssBaseline } from "@mui/material";

import Header from "@components/Header";

import { Main, Root } from "@components/Layout.styles";

import FullHeight from "@styles/FullHeight";

interface LayoutProps {
    children: React.ReactNode;
    withoutPadding?: boolean;
    fullHeight?: boolean;
}
interface LayoutStates {}

export default class Layout extends React.Component<LayoutProps, LayoutStates> {
    public render() {
        const { withoutPadding, fullHeight } = this.props;

        return (
            <Root fullHeight={fullHeight}>
                {fullHeight ? <FullHeight /> : null}
                <CssBaseline />
                <Header />
                <Main withoutPadding={withoutPadding}>{this.props.children}</Main>
            </Root>
        );
    }
}
