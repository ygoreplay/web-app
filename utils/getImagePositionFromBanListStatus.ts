import { BanListStatus } from "@routes/tools/deck/types";

export function getImagePositionFromBanListStatus(banListStatus: BanListStatus | undefined) {
    let banListImagePosition: string | undefined;
    switch (banListStatus) {
        case "limit":
            banListImagePosition = "-64px 0";
            break;

        case "semi-limit":
            banListImagePosition = "0 -64px";
            break;

        case "forbidden":
            banListImagePosition = "0 0";
            break;

        default:
            break;
    }

    return banListImagePosition;
}
