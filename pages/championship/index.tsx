import { GetServerSideProps, NextPage } from "next";

import ChampionshipRoute from "@routes/championship";
import ChampionshipCreationProvider from "@routes/championship/ChampionshipCreationProvider";

import { initializeApollo } from "@lib/apollo";

import { AvailableBanListsDocument, AvailableBanListsQuery } from "@query";

interface ChampionshipPageProps {
    banLists: string[];
}

const Championship: NextPage<ChampionshipPageProps> = ({ banLists }) => {
    return (
        <ChampionshipCreationProvider banLists={banLists}>
            <ChampionshipRoute />
        </ChampionshipCreationProvider>
    );
};

export const getServerSideProps: GetServerSideProps<ChampionshipPageProps> = async ({ req }) => {
    const client = initializeApollo({ headers: req?.headers });
    const {
        data: { availableBanLists },
    } = await client.query<AvailableBanListsQuery>({
        query: AvailableBanListsDocument,
    });

    return {
        props: {
            banLists: availableBanLists,
        },
    };
};

export default Championship;
