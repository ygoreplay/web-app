import { NextPage } from "next";
import Head from "next/head";

import { createTheme, ThemeProvider } from "@mui/material";

import DeckToolRoute from "@routes/tools/deck";

interface DeckToolProps {}

const deckToolTheme = createTheme({
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

const DeckTool: NextPage<DeckToolProps> = () => (
    <ThemeProvider theme={deckToolTheme}>
        <Head>
            <title>덱 편집 - YGOReplay</title>
            <script src="/scripts/createjs.min.js" />
            <script src="/scripts/particlejs.min.js" />
        </Head>
        <DeckToolRoute />
    </ThemeProvider>
);

export default DeckTool;
