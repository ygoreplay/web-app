import React from "react";

import { CircularProgress } from "@mui/material";

import MatchListItem from "@components/MatchList/Item";

import { LoaderWrapper, Root } from "@components/MatchList/index.styles";

import { MatchesProps, withMatches } from "@query";
import { Match } from "@utils/type";
import { InView } from "react-intersection-observer";

export interface MatchListProps {
    infinite: boolean;
}
export interface MatchListStates {
    currentLoadingId: number;
}

const MINIMAL_COUNT = 15;

class MatchList extends React.Component<MatchListProps & MatchesProps, MatchListStates> {
    public state: MatchListStates = {
        currentLoadingId: -1,
    };

    private handleLoaderInViewChange = async (inView?: boolean) => {
        const {
            data: { matches, fetchMore },
        } = this.props;
        const { currentLoadingId } = this.state;

        console.info(inView, matches, currentLoadingId, matches[matches.length - 1].id);

        if (!inView || !matches || currentLoadingId === matches[matches.length - 1].id) {
            return;
        }

        this.setState({
            currentLoadingId: matches[matches.length - 1].id,
        });

        const { data } = await fetchMore({
            variables: {
                count: MINIMAL_COUNT,
                after: matches[matches.length - 1].id,
            },
        });

        console.info(data);

        this.setState({
            currentLoadingId: -1,
        });
    };

    private renderLoader = () => {
        return (
            <InView onChange={this.handleLoaderInViewChange}>
                {({ ref }) => (
                    <LoaderWrapper ref={ref}>
                        <CircularProgress size={24} />
                    </LoaderWrapper>
                )}
            </InView>
        );
    };
    private renderListItem = (match: Match) => {
        return <MatchListItem key={match.id} match={match} />;
    };
    public render() {
        const { data, infinite } = this.props;

        if (!data.matches || !data.matchCount) {
            return (
                <Root>
                    {new Array(MINIMAL_COUNT).fill(null).map((_, index) => {
                        return <MatchListItem loading key={+index} />;
                    })}
                </Root>
            );
        }

        return (
            <Root>
                {data.matches.map(this.renderListItem)}
                {infinite && this.renderLoader()}
            </Root>
        );
    }
}

export default withMatches<MatchListProps>({
    options: {
        variables: {
            count: MINIMAL_COUNT,
        },
    },
})(MatchList);
