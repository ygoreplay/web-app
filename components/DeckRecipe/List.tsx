import React from "react";

import { CardType, Count, Graphics, Item, Label, Root } from "@components/DeckRecipe/List.styles";

import { parseDeckData } from "@utils/parseDeckData";
import { DeckBase } from "@utils/type";

export interface DeckRecipeListProps {
    deck: DeckBase;
}
export interface DeckRecipeListStates {
    parsedDeck: ReturnType<typeof parseDeckData>;
}

export default class DeckRecipeList extends React.Component<DeckRecipeListProps, DeckRecipeListStates> {
    public state: DeckRecipeListStates = {
        parsedDeck: parseDeckData(this.props.deck),
    };

    public render() {
        const { parsedDeck } = this.state;

        return (
            <Root>
                {parsedDeck.main.map(({ card, count }) => (
                    <Item key={card.id}>
                        <Graphics style={{ background: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/300x125/${card.id}.jpg)` }} />
                        <CardType type={card.type} />
                        <Label>{card.text.name}</Label>
                        {count > 1 && (
                            <Count>
                                <span>{count}</span>
                            </Count>
                        )}
                    </Item>
                ))}
            </Root>
        );
    }
}
