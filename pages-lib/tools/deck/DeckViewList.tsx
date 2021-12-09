import React from "react";
import { useDrop } from "react-dnd";
import Measure, { ContentRect } from "react-measure";

import { Card } from "@routes/tools/deck";
import { useDeckEditor } from "@routes/tools/deck/Context";
import DeckViewListItem from "@routes/tools/deck/DeckViewListItem";

import { MainRoot, ExtraSideRoot, List } from "./DeckViewList.styles";

export interface DeckViewListProps {
    type: "main" | "side" | "extra";
    cards: Card[];
}

export default function DeckViewList(props: DeckViewListProps) {
    const { type, cards } = props;
    const { addCard } = useDeckEditor();
    const [, drop] = useDrop(
        () => ({
            accept: `card`,
            drop(item: { card: Card }) {
                addCard(item.card, type === "side");
            },
        }),
        [type, addCard],
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
    const cardsPerRow = type !== "main" ? 15 : Math.max(10, Math.ceil(cards.length / 4));

    const renderCard = React.useCallback(
        (card: Card, index: number) => {
            return (
                <DeckViewListItem key={index} index={index} card={card} type={type} containerWidth={width} containerHeight={height} cardsPerRow={cardsPerRow} />
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
