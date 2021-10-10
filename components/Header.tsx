import React from "react";

import { Container, Toolbar } from "@mui/material";

import { AppBar, Logo } from "@components/Header.styles";

interface HeaderProps {}
interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    public render() {
        return (
            <AppBar elevation={0} position="sticky">
                <Toolbar>
                    <Logo />
                </Toolbar>
            </AppBar>
        );
    }
}
