import type { GetServerSideProps, NextPage } from "next";

import MatchesRoute, { MatchesRouteProps } from "@routes/matches";
import { initializeApollo } from "@lib/apollo";
import { BanListsDocument, BanListsQuery } from "queries/index";

const Matches: NextPage<MatchesRouteProps> = ({ banLists, initialMatchListFilterOptions }) => {
    return <MatchesRoute banLists={banLists} initialMatchListFilterOptions={initialMatchListFilterOptions} />;
};

export const getServerSideProps: GetServerSideProps<MatchesRouteProps> = async ({ req }) => {
    const apolloClient = initializeApollo({ headers: req?.headers });

    try {
        const { data } = await apolloClient.query<BanListsQuery>({
            query: BanListsDocument,
        });

        return {
            props: {
                banLists: data.banLists,
                initialMatchListFilterOptions: {
                    includeNormalMatches: true,
                    includeTierMatches: true,
                    includeMatches: true,
                    includeSingles: true,
                    banLists: data.banLists,
                },
            },
        };
    } catch {
        return {
            props: {
                banLists: [],
                initialMatchListFilterOptions: {
                    includeNormalMatches: true,
                    includeTierMatches: true,
                    includeMatches: true,
                    includeSingles: true,
                    banLists: [],
                },
            },
        };
    }
};

export default Matches;
