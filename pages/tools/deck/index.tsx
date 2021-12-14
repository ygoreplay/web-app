import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { createTheme, ThemeProvider } from "@mui/material";

import DialogProvider from "@dialogs/Provider";

import { initializeApollo } from "@lib/apollo";

import DeckToolRoute from "@routes/tools/deck";

import { AvailableBanListsDocument, AvailableBanListsQuery } from "@query";

interface DeckToolProps {
    banLists: string[];
}

export const deckToolTheme = createTheme({
    palette: {
        mode: "dark",
        text: {
            primary: "#fff",
        },
    },
    typography: {
        fontFamily: `'Spoqa Han Sans Neo', sans-serif`,
        fontSize: 14,
    },
});

const DeckTool: NextPage<DeckToolProps> = ({ banLists }) => (
    <ThemeProvider theme={deckToolTheme}>
        <DndProvider backend={HTML5Backend}>
            <DialogProvider>
                <Head>
                    <title>덱 편집 - YGOReplay</title>
                    <script src="/scripts/createjs.min.js" />
                    <script src="/scripts/particlejs.min.js" />
                </Head>
                <DeckToolRoute banLists={banLists} />
            </DialogProvider>
        </DndProvider>
    </ThemeProvider>
);

export const getServerSideProps: GetServerSideProps<DeckToolProps> = async ({ req }) => {
    const apolloClient = initializeApollo({ headers: req?.headers });
    const { data } = await apolloClient.query<AvailableBanListsQuery>({
        query: AvailableBanListsDocument,
    });

    return {
        props: {
            banLists: data.availableBanLists,
        },
    };
};

export default DeckTool;
