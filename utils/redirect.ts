import Router from "next/router";
import { ServerResponse } from "http";

export const redirect = async (url: string, res: ServerResponse | undefined) => {
    if (!res) {
        await Router.replace("/tools/deck");
        return;
    }

    res.writeHead(307, { Location: url });
    res.end();
};
