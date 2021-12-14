import React from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { Card } from "@routes/tools/deck";
import { BanListStatus } from "@routes/tools/deck/types";

import { BanList, CardDescription, CardDescriptionItem, CardImage, CardName, Container, Item } from "@routes/tools/deck/CardExplorerItem.styles";

import { CardAttributeNames, CardRaceNames, TrapSpellCardTypeNames } from "@constants/card";

import { CardType, MonsterCardType } from "queries/index";
import { getImagePositionFromBanListStatus } from "@utils/getImagePositionFromBanListStatus";

interface CardExplorerItemProps {
    style: React.CSSProperties;
    onCardContextMenu(e: React.MouseEvent<HTMLDivElement>): void;
    card: Card;
    banListStatus?: BanListStatus;
}

export default function CardExplorerItem({ style, onCardContextMenu, card, banListStatus }: CardExplorerItemProps) {
    const [, drag, preview] = useDrag(
        () => ({
            type: "card",
            item: { card },
            collect: () => ({}),
        }),
        [card],
    );

    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    let description = "알 수 없는 카드 정보";
    // eslint-disable-next-line default-case
    switch (card.type) {
        case CardType.Monster:
            description = `${CardAttributeNames[card.attribute]} - ${CardRaceNames[card.race]} - ${
                card.monsterType.indexOf(MonsterCardType.Xyz) >= 0 ? "☆" : "★"
            } ${card.level}`;
            break;

        case CardType.Spell:
            description = `마법 - ${TrapSpellCardTypeNames[card.trapSpellType]}`;
            break;

        case CardType.Trap:
            description = `함정 - ${TrapSpellCardTypeNames[card.trapSpellType]}`;
            break;
    }

    const banListImagePosition = getImagePositionFromBanListStatus(banListStatus);

    return (
        <Item ref={drag} style={{ ...style }} onContextMenu={onCardContextMenu}>
            <CardImage
                style={{
                    backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${card.id}.jpg)` /* , backgroundColor: "rgba(255, 255, 255, 0.15)" */,
                }}
            >
                {banListImagePosition && <BanList style={{ backgroundPosition: banListImagePosition }} />}
            </CardImage>
            <CardDescription>
                <CardName>{card.text.name}</CardName>
                <Container>
                    <CardDescriptionItem>{description}</CardDescriptionItem>
                </Container>
                <Container>
                    {card.type === CardType.Monster && (
                        <CardDescriptionItem>
                            {card.atk === -2 ? "?" : card.atk} / {card.def === -2 ? "?" : card.def}
                        </CardDescriptionItem>
                    )}
                </Container>
            </CardDescription>
        </Item>
    );
}
