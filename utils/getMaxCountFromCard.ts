import { BanList } from "@utils/type";
import { Card } from "@routes/tools/deck";
import { getCardBanListStatus } from "@utils/getCardBanListStatus";
import { getMaxCardCountFromBanListStatus } from "@utils/getMaxCardCountFromBanListStatus";

export function getMaxCountFromCard(banList: BanList | null, card: Card) {
    const banListStatus = getCardBanListStatus(card, banList || null);
    return getMaxCardCountFromBanListStatus(banListStatus);
}
