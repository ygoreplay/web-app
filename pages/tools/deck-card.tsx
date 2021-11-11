import { GetServerSideProps, NextPage } from "next";

import { ThemeProvider } from "@emotion/react";

import DeckCardToolRoute from "@routes/tools/deck-card";

import { initializeApollo } from "@lib/apollo";

import { DeckType, DeckTypesDocument, DeckTypesQuery } from "queries/index";

import { toolTheme } from "@styles/theme";

interface DeckCardProps {
    deckTypes: DeckType[];
}

const DeckCard: NextPage<DeckCardProps> = ({ deckTypes }) => (
    <ThemeProvider theme={toolTheme}>
        <DeckCardToolRoute deckTypes={deckTypes} />
    </ThemeProvider>
);

export const getServerSideProps: GetServerSideProps<DeckCardProps> = async ({ req }) => {
    const apolloClient = initializeApollo({ headers: req?.headers });
    const { data } = await apolloClient.query<DeckTypesQuery>({
        query: DeckTypesDocument,
    });

    return {
        props: {
            deckTypes: data.deckTypes,
        },
    };
};

export default DeckCard;
