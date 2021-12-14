import { BanListStatus } from "@routes/tools/deck/types";

export function getMaxCardCountFromBanListStatus(banListStatus: BanListStatus | undefined) {
    switch (banListStatus) {
        case "forbidden":
            return 0;

        case "limit":
            return 1;

        case "semi-limit":
            return 2;

        default:
            return 3;
    }
}
