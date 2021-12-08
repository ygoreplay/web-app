import React from "react";
import { useDragLayer, XYCoord } from "react-dnd";

import { CardImage, Root } from "@routes/tools/deck/CardDragLayer.styles";

function getItemStyles(clientOffset: XYCoord | null) {
    if (!clientOffset) {
        return {
            display: "none",
        };
    }

    const { x, y } = clientOffset;
    const transform = `translate(${x - 38}px, ${y - 55}px)`;

    return {
        transform,
        WebkitTransform: transform,
    };
}

export default function CardDragLayer() {
    const { itemType, isDragging, item, clientOffset } = useDragLayer(monitor => ({
        clientOffset: monitor.getClientOffset(),
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || itemType !== "card") {
        return null;
    }

    return (
        <Root>
            <CardImage
                style={{
                    backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${item.card.id}.jpg)` /* , backgroundColor: "rgba(255, 255, 255, 0.15)" */,
                    ...getItemStyles(clientOffset),
                }}
            />
        </Root>
    );
}
