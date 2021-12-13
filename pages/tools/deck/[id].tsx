import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";

import { ThemeProvider } from "@mui/material";

import { initializeApollo } from "@lib/apollo";

import DeckToolRoute from "@routes/tools/deck";
import { deckToolTheme } from "@pages/tools/deck";

import { AvailableBanListsDocument, AvailableBanListsQuery } from "@query";

interface DeckToolProps {
    banLists: string[];
}

const DeckTool: NextPage<DeckToolProps> = ({ banLists }) => (
    <ThemeProvider theme={deckToolTheme}>
        <DndProvider backend={HTML5Backend}>
            <Head>
                <title>덱 편집 - YGOReplay</title>
                <script src="/scripts/createjs.min.js" />
                <script src="/scripts/particlejs.min.js" />
            </Head>
            <DeckToolRoute banLists={banLists} />
        </DndProvider>
    </ThemeProvider>
);

DeckTool.getInitialProps = async ({ req, res }) => {
    const apolloClient = initializeApollo({ headers: req?.headers });
    const { data } = await apolloClient.query<AvailableBanListsQuery>({
        query: AvailableBanListsDocument,
    });

    if (!res) {
        await Router.replace("/tools/deck");

        return {
            banLists: data.availableBanLists,
        };
    }

    res.writeHead(307, { Location: "/tools/deck" });
    res.end();

    return {
        banLists: [],
    };
};

export default DeckTool;
