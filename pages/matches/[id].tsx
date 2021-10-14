import type { GetServerSideProps, NextPage } from "next";

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

export const getServerSideProps: GetServerSideProps = async context => {
    if (typeof context.query.id === "undefined" || Array.isArray(context.query.id) || Number.isNaN(context.query.id)) {
        return {
            props: {},
        };
    }

    if (context.req) {
        const client = initializeApollo({ headers: context.req.headers });
        const { data } = await client.query<MatchDetailedQuery, MatchDetailedQueryVariables>({
            query: MatchDetailedDocument,
            variables: {
                id: parseInt(context.query.id, 10),
            },
        });

        return {
            props: {
                match: data.match,
            },
        };
    }

    return {
        props: {},
    };
};

export default Match;
