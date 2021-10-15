import type { NextPage } from "next";

import { initializeApollo } from "@lib/apollo";

import MatchRoute from "@routes/matches/Match";

import { MatchDetailedDocument, MatchDetailedQuery, MatchDetailedQueryVariables } from "@query";

import { MatchDetail } from "@utils/type";

interface MatchRouteProps {
    match: MatchDetail | null;
}

const Match: NextPage<MatchRouteProps> = ({ match }) => {
    if (!match) {
        return null;
    }

    return <MatchRoute match={match} />;
};

Match.getInitialProps = async context => {
    if (typeof context.query.id === "undefined" || Array.isArray(context.query.id) || Number.isNaN(context.query.id)) {
        return {
            match: null,
        };
    }

    const client = initializeApollo({ headers: context.req?.headers });
    const { data } = await client.query<MatchDetailedQuery, MatchDetailedQueryVariables>({
        query: MatchDetailedDocument,
        variables: {
            id: parseInt(context.query.id, 10),
        },
    });

    return {
        match: data.match || null,
    };
};

export default Match;
