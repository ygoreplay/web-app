import _ from "lodash";
import { NextPage } from "next";

import { initializeApollo } from "@lib/apollo";

import ChampionshipMonitorRoute from "@routes/championship/monitor";
import { ChampionshipTeam } from "@routes/championship/monitor/types";

import DialogProvider from "@dialogs/Provider";

import { redirect } from "@utils/redirect";
import { ChampionshipForMonitor } from "@utils/type";

import { ChampionshipForMonitorDocument, ChampionshipForMonitorQuery, ChampionshipForMonitorQueryVariables, ChampionshipType } from "@query";

interface ChampionshipMonitorProps {
    championship: ChampionshipForMonitor | null;
    teams: ChampionshipTeam[];
    code: string;
}

const ChampionshipMonitor: NextPage<ChampionshipMonitorProps> = ({ championship, teams, code }) => {
    if (!championship) {
        return null;
    }

    return (
        <DialogProvider>
            <ChampionshipMonitorRoute teams={teams} championship={championship} code={code} />
        </DialogProvider>
    );
};

ChampionshipMonitor.getInitialProps = async ({ req, res, query }) => {
    const client = initializeApollo({ headers: req?.headers });
    const redirectToIndex = async (): Promise<ChampionshipMonitorProps> => {
        await redirect("/", res);

        return {
            championship: null,
            teams: [],
            code: "",
        };
    };

    if (typeof query.id !== "string") {
        return redirectToIndex();
    }

    try {
        const { data } = await client.query<ChampionshipForMonitorQuery, ChampionshipForMonitorQueryVariables>({
            query: ChampionshipForMonitorDocument,
            variables: {
                code: query.id,
            },
            fetchPolicy: "no-cache",
        });

        if (!data.championship) {
            return redirectToIndex();
        }

        const result: ChampionshipTeam[] = [];
        if (data.championship.type === ChampionshipType.Team) {
            const teamMap = _.chain(data.championship.participants)
                .groupBy(p => p.teamName)
                .value();

            const teamNames = Object.keys(teamMap);
            for (let i = 0; i < teamNames.length; i++) {
                const teamName = teamNames[i];
                result.push({
                    name: teamName,
                    participants: teamMap[teamName],
                });
            }
        } else {
            const teamMap = _.chain(data.championship.participants)
                .groupBy(p => p.name)
                .value();

            const teamNames = Object.keys(teamMap);
            for (let i = 0; i < teamNames.length; i++) {
                const teamName = teamNames[i];
                result.push({
                    name: teamName,
                    participants: teamMap[teamName],
                });
            }
        }

        return {
            championship: data.championship,
            teams: result,
            code: query.id,
        };
    } catch (e) {
        return redirectToIndex();
    }
};

export default ChampionshipMonitor;
