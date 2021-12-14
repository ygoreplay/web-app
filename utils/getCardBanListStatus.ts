import { BanList } from "@utils/type";

import { Card } from "@routes/tools/deck";
import { BanListStatus } from "@routes/tools/deck/types";

export function getCardBanListStatus(card: Card, banList: BanList | null): BanListStatus | undefined {
    let banListStatus: BanListStatus | undefined;
    if (banList) {
        if (banList.limit.indexOf(card.id) >= 0 || banList.limit.indexOf(card.alias) >= 0) {
            banListStatus = "limit";
        } else if (banList.forbidden.indexOf(card.id) >= 0 || banList.forbidden.indexOf(card.alias) >= 0) {
            banListStatus = "forbidden";
        } else if (banList.semiLimit.indexOf(card.id) >= 0 || banList.semiLimit.indexOf(card.alias) >= 0) {
            banListStatus = "semi-limit";
        }
    }

    return banListStatus;
}
