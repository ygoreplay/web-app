import React from "react";
import { useDrop } from "react-dnd";

import { Card } from "@routes/tools/deck";

import { MainRoot, ExtraSideRoot, List, CardView, CardImage } from "./DeckViewList.styles";
import Measure, { ContentRect } from "react-measure";

export interface DeckViewListProps {
    type: "main" | "side" | "extra";
    cards: Card[];
    onAddCardRequest(card: Card, side: boolean): void;
}

export default function DeckViewList(props: DeckViewListProps) {
    const { type, cards, onAddCardRequest } = props;
    const [, drop] = useDrop(
        () => ({
            accept: `card`,
            drop(item: { card: Card }) {
                onAddCardRequest(item.card, type === "side");
            },
        }),
        [type, onAddCardRequest],
    );

    const [width, setWidth] = React.useState<number>(0);
    const [height, setHeight] = React.useState<number>(0);
    const handleResize = React.useCallback(
        ({ bounds }: ContentRect) => {
            if (!bounds || (width > 0 && height > 0)) {
                return;
            }

            setWidth(bounds.width);
            setHeight(bounds.height);
        },
        [width, height, setHeight, setWidth],
    );
    const renderCard = React.useCallback(
        (card: Card) => {
            const cardsPerRow = type !== "main" ? 15 : Math.max(10, Math.ceil(cards.length / 4));

            return (
                <CardView
                    style={{
                        width: Math.floor(width / cardsPerRow - ((width / cardsPerRow) * (cardsPerRow - 1) + 100 - width) / cardsPerRow),
                        height: type !== "main" ? "100%" : Math.floor(height / 4 - ((height / 4) * 3 + 145 - height) / 4),
                    }}
                >
                    {card.text.name}
                    <CardImage style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${card.id}.jpg)` }} />
                </CardView>
            );
        },
        [cards, type, width, height],
    );

    const Root = type === "main" ? MainRoot : ExtraSideRoot;

    return (
        <Measure bounds onResize={handleResize}>
            {({ measureRef }) => (
                <Root>
                    <List ref={drop}>
                        <div ref={measureRef}>{cards.map(renderCard)}</div>
                    </List>
                </Root>
            )}
        </Measure>
    );
}
