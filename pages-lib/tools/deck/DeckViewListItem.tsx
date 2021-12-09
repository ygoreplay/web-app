import React from "react";
import { useDrag, useDrop } from "react-dnd";

import { Card } from "@routes/tools/deck";
import { DECK_TOOL_DRAG_DROP_TYPES } from "@routes/tools/deck/constants";
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

interface DragItem {
    card: Card;
    index: number;
}

export default function DeckViewListItem({ card, type, index, containerWidth, containerHeight, cardsPerRow }: DeckViewListItemProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [hoverIndex, setHoverIndex] = React.useState<number>(-1);

    const { removeCard, moveCard } = useDeckEditor();
    const [{ isDragging }, drag] = useDrag({
        type: DECK_TOOL_DRAG_DROP_TYPES.CARD_SORT,
        item: () => {
            return { card, index };
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [{ handlerId }, drop] = useDrop(
        {
            accept: DECK_TOOL_DRAG_DROP_TYPES.CARD_SORT,
            collect(monitor) {
                return {
                    handlerId: monitor.getHandlerId(),
                };
            },
            drop(item: DragItem) {
                if (!ref.current || hoverIndex < 0) {
                    return;
                }

                const dragIndex = item.index;

                // Time to actually perform the action
                moveCard(dragIndex, hoverIndex, type);

                // Note: we're mutating the monitor item here!
                // Generally it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                // eslint-disable-next-line no-param-reassign
                item.index = hoverIndex;
            },
            hover() {
                if (!ref.current) {
                    return;
                }

                setHoverIndex(index);
            },
        },
        [moveCard, hoverIndex],
    );

    const handleContextMenu = React.useCallback(() => {
        removeCard(index, type);
    }, [removeCard, type, index]);

    drag(drop(ref));

    return (
        <Root
            data-handler-id={handlerId}
            dragging={isDragging}
            ref={ref}
            style={{
                width: Math.floor(containerWidth / cardsPerRow - ((containerWidth / cardsPerRow) * (cardsPerRow - 1) + 100 - containerWidth) / cardsPerRow),
                height: type !== "main" ? "100%" : Math.floor(containerHeight / 4 - ((containerHeight / 4) * 3 + 145 - containerHeight) / 4),
            }}
        >
            {card.text.name}
            <Image
                dragging={isDragging}
                onContextMenu={handleContextMenu}
                style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${card.id}.jpg)` }}
            />
        </Root>
    );
}
