import React from "react";

import { CardType, Count, Graphics, Item, Label } from "@components/DeckRecipe/List.styles";
import { DeckBase } from "@utils/type";

export interface DeckRecipeListItemProps {
    card: DeckBase["main"][0];
    count: number;
    image?: string | null;
}

export default function DeckRecipeListItem(props: DeckRecipeListItemProps) {
    const { card, count, image } = props;

    return (
        <Item>
            <Graphics
                style={{ backgroundImage: image ? `url(${image})` : `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/300x125/${card.id}.jpg)` }}
            />
            <CardType card={card} />
            <Label>{card.text.name}</Label>
            {count > 1 && (
                <Count>
                    <span>{count}</span>
                </Count>
            )}
        </Item>
    );
}
