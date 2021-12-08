import React from "react";

import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

import { CARD_EXPLORER_WIDTH } from "@routes/tools/deck/CardExplorer";

export interface AppBarProps {}
export interface AppBarStates {}

export default class AppBar extends React.Component<AppBarProps, AppBarStates> {
    public render() {
        return (
            <MuiAppBar
                elevation={0}
                color="transparent"
                position="fixed"
                sx={{ width: `calc(100% - ${CARD_EXPLORER_WIDTH}px)`, mr: `${CARD_EXPLORER_WIDTH}px` }}
            >
                <Toolbar sx={{ borderBottom: "1px solid rgb(19, 47, 76)", background: "rgba(0, 0, 0, 0.25)", backdropFilter: "blur(15px)" }}>
                    <Typography variant="h6" noWrap component="div">
                        덱 편집
                    </Typography>
                </Toolbar>
            </MuiAppBar>
        );
    }
}
