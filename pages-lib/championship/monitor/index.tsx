import React from "react";

import { Global } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { Root } from "@routes/championship/monitor/index.styles";
import { GlobalStyles } from "@routes/championship/submit/index.styles";

export interface ChampionshipMonitorRouteProps {}
export interface ChampionshipMonitorRouteStates {}

export default class ChampionshipMonitorRoute extends React.Component<ChampionshipMonitorRouteProps, ChampionshipMonitorRouteStates> {
    public render() {
        return (
            <Root>
                <CssBaseline />
                <Global styles={GlobalStyles} />
            </Root>
        );
    }
}
