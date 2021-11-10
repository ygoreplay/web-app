import { NextApiHandler } from "next";
import fetch from "node-fetch";

const handler: NextApiHandler = async (req, res) => {
    const { resolution, id } = req.query;
    if (Array.isArray(resolution) || Array.isArray(id) || !/^[0-9]{3}x[0-9]{3}$/.test(resolution) || !/^[0-9]*?\.jpg$/.test(id)) {
        res.redirect("/");
        return;
    }

    const response = await fetch(`https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/${resolution}/${id}`).then(r => r.arrayBuffer());

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Length", response.byteLength);
    res.send(Buffer.from(response));
};

export default handler;
