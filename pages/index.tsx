import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import HomeRoute from "pages-lib/Home";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>YGOReplay</title>
            </Head>
            <HomeRoute />
        </>
    );
};

export default Home;
