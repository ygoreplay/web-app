import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";

import { ThemeProvider } from "@mui/material";

import { initializeApollo } from "@lib/apollo";

import DeckToolRoute from "@routes/tools/deck";
import { deckToolTheme } from "@pages/tools/deck";

import { AvailableBanListsDocument, AvailableBanListsQuery, ChampionshipDocument, ChampionshipQuery, ChampionshipQueryVariables } from "@query";
import { Championship } from "@utils/type";

interface DeckToolProps {
    banLists: string[];
    championship?: Championship;
}

const DeckTool: NextPage<DeckToolProps> = ({ banLists, championship }) => (
    <ThemeProvider theme={deckToolTheme}>
        <DndProvider backend={HTML5Backend}>
            <Head>
                <title>{championship ? `${championship.name} 덱 제출` : "덱 편집"} - YGOReplay</title>
                <script src="/scripts/createjs.min.js" />
                <script src="/scripts/particlejs.min.js" />
            </Head>
            <DeckToolRoute banLists={banLists} championship={championship} />
        </DndProvider>
    </ThemeProvider>
);

DeckTool.getInitialProps = async ({ req, res, query }) => {
    const redirect = async (url: string) => {
        if (!res) {
            await Router.replace("/tools/deck");
            return;
        }

        res.writeHead(307, { Location: url });
        res.end();
    };

    if (typeof query.id !== "string") {
        await redirect("/tools/deck");
        return { banLists: [] };
    }

    const apolloClient = initializeApollo({ headers: req?.headers });
    const { data } = await apolloClient.query<AvailableBanListsQuery>({
        query: AvailableBanListsDocument,
    });

    const {
        data: { championship },
    } = await apolloClient.query<ChampionshipQuery, ChampionshipQueryVariables>({
        query: ChampionshipDocument,
        variables: {
            id: query.id,
        },
    });

    if (!championship) {
        await redirect("/tools/deck");
        return { banLists: [] };
    }

    return {
        banLists: data.availableBanLists,
        championship,
    };
};

export default DeckTool;
