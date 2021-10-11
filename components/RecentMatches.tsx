import React from "react";

import { Root } from "./RecentMatches.styles";

interface RecentMatchesProps {}
interface RecentMatchesStates {}

export default class RecentMatches extends React.Component<RecentMatchesProps, RecentMatchesStates> {
    public render() {
        return (
            <Root>
                <span>RecentMatches</span>
            </Root>
        );
    }
}
