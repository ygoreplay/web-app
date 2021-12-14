import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";

import { ThemeProvider } from "@mui/material";

import { initializeApollo } from "@lib/apollo";

import DeckToolRoute from "@routes/tools/deck";
import { deckToolTheme } from "@pages/tools/deck";

import {
    AvailableBanListsDocument,
    AvailableBanListsQuery,
    BanListDocument,
    BanListQuery,
    BanListQueryVariables,
    ChampionshipDocument,
    ChampionshipQuery,
    ChampionshipQueryVariables,
} from "@query";
import { BanList, Championship } from "@utils/type";

interface DeckToolProps {
    banLists: string[];
    championship?: Championship;
    banList?: BanList;
}

const DeckTool: NextPage<DeckToolProps> = ({ banLists, championship, banList }) => (
    <ThemeProvider theme={deckToolTheme}>
        <DndProvider backend={HTML5Backend}>
            <Head>
                <title>{championship ? `${championship.name} 덱 제출` : "덱 편집"} - YGOReplay</title>
                <script src="/scripts/createjs.min.js" />
                <script src="/scripts/particlejs.min.js" />
            </Head>
            <DeckToolRoute banLists={banLists} championship={championship} banList={banList} />
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

    const {
        data: { banList },
    } = await apolloClient.query<BanListQuery, BanListQueryVariables>({
        query: BanListDocument,
        variables: {
            title: championship.banList,
        },
    });

    return {
        banList,
        banLists: data.availableBanLists,
        championship,
    };
};

export default DeckTool;
