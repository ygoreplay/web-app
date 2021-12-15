import { NextPage } from "next";

import { initializeApollo } from "@lib/apollo";

import ChampionshipSubmitRoute from "@routes/championship/submit";

import DialogProvider from "@dialogs/Provider";

import { redirect } from "@utils/redirect";
import { Championship } from "@utils/type";

import { ChampionshipDocument, ChampionshipQuery, ChampionshipQueryVariables } from "@query";

interface ChampionshipSubmitPageProps {
    championship: Championship | null;
}

const ChampionshipSubmit: NextPage<ChampionshipSubmitPageProps> = ({ championship }) => {
    if (!championship) {
        return null;
    }

    return (
        <DialogProvider>
            <ChampionshipSubmitRoute championship={championship} />
        </DialogProvider>
    );
};

ChampionshipSubmit.getInitialProps = async ({ req, res, query }) => {
    const client = initializeApollo({ headers: req?.headers });
    const redirectToIndex = async () => {
        await redirect("/", res);

        return {
            championship: null,
        };
    };

    if (typeof query.id !== "string") {
        return redirectToIndex();
    }

    try {
        const { data } = await client.query<ChampionshipQuery, ChampionshipQueryVariables>({
            query: ChampionshipDocument,
            variables: {
                id: query.id,
            },
        });

        if (!data.championship) {
            return redirectToIndex();
        }

        return {
            championship: data.championship,
        };
    } catch (e) {
        return redirectToIndex();
    }
};

export default ChampionshipSubmit;
