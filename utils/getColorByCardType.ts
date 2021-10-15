import { Card, MonsterCardType } from "queries/index";

export function getColorByCardType(card: Pick<Card, "type" | "monsterType">) {
    if (card.type === "Monster") {
        if (card.monsterType.length === 1) {
            switch (card.monsterType[0]) {
                case MonsterCardType.Effect:
                    break;

                case MonsterCardType.Fusion:
                    return "rgb(198,36,204)";

                case MonsterCardType.Normal:
                    break;

                case MonsterCardType.Pendulum:
                    break;

                case MonsterCardType.Ritual:
                    break;

                case MonsterCardType.Synchro:
                    return "white";

                case MonsterCardType.Xyz:
                    return "black";

                case MonsterCardType.Link:
                    return "rgb(36,134,204)";

                default:
                    throw new Error(`Unknown monster card type: ${card.monsterType[0]}`);
            }
        }

        return "rgb(152, 74, 35)";
    }

    if (card.type === "Spell") {
        return "rgb(3, 141, 125)";
    }

    return "rgb(166,23,111)";
}
