import React from "react";

import { Card } from "@routes/tools/deck";
import { DeckType, useDeckEditor } from "@routes/tools/deck/Context";

import { Image, Root } from "./DeckViewListItem.styles";

export interface DeckViewListItemProps {
    card: Card;
    type: DeckType;
    index: number;
    containerWidth: number;
    containerHeight: number;
    cardsPerRow: number;
}

export default function DeckViewListItem({ card, type, index, containerWidth, containerHeight, cardsPerRow }: DeckViewListItemProps) {
    const { removeCard } = useDeckEditor();
    const handleContextMenu = React.useCallback(() => {
        removeCard(index, type);
    }, [removeCard, type, index]);

    return (
        <Root
            style={{
                width: Math.floor(containerWidth / cardsPerRow - ((containerWidth / cardsPerRow) * (cardsPerRow - 1) + 100 - containerWidth) / cardsPerRow),
                height: type !== "main" ? "100%" : Math.floor(containerHeight / 4 - ((containerHeight / 4) * 3 + 145 - containerHeight) / 4),
            }}
        >
            {card.text.name}
            <Image
                onContextMenu={handleContextMenu}
                style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${card.id}.jpg)` }}
            />
        </Root>
    );
}
