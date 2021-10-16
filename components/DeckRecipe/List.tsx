import React from "react";

import { Typography } from "@mui/material";

import { CardType, Column, Count, Graphics, Item, Label, Root, Separator } from "@components/DeckRecipe/List.styles";

import { parseDeckData } from "@utils/parseDeckData";
import { DeckBase } from "@utils/type";

export interface DeckRecipeListProps {
    deck: DeckBase;
}
export interface DeckRecipeListStates {
    parsedDeck: ReturnType<typeof parseDeckData>;
}

export default class DeckRecipeList extends React.Component<DeckRecipeListProps, DeckRecipeListStates> {
    public static getDerivedStateFromProps = (nextProps: DeckRecipeListProps): DeckRecipeListStates => {
        return {
            parsedDeck: parseDeckData(nextProps.deck),
        };
    };

    public state: DeckRecipeListStates = {
        parsedDeck: parseDeckData(this.props.deck),
    };

    public render() {
        const { parsedDeck } = this.state;

        return (
            <Root>
                <Column>
                    <Separator>
                        <Typography variant="subtitle1">메인 덱</Typography>
                    </Separator>
                    {parsedDeck.main.map(({ card, count }) => (
                        <Item key={card.id}>
                            <Graphics style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/300x125/${card.id}.jpg)` }} />
                            <CardType card={card} />
                            <Label>{card.text.name}</Label>
                            {count > 1 && (
                                <Count>
                                    <span>{count}</span>
                                </Count>
                            )}
                        </Item>
                    ))}
                </Column>
                <Column>
                    <Separator>
                        <Typography variant="subtitle1">엑스트라 덱</Typography>
                    </Separator>
                    {parsedDeck.extra.map(({ card, count }) => (
                        <Item key={card.id}>
                            <Graphics style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/300x125/${card.id}.jpg)` }} />
                            <CardType card={card} />
                            <Label>{card.text.name}</Label>
                            {count > 1 && (
                                <Count>
                                    <span>{count}</span>
                                </Count>
                            )}
                        </Item>
                    ))}
                </Column>
                <Column>
                    <Separator>
                        <Typography variant="subtitle1">사이드 덱</Typography>
                    </Separator>
                    {parsedDeck.side.map(({ card, count }) => (
                        <Item key={card.id}>
                            <Graphics style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/300x125/${card.id}.jpg)` }} />
                            <CardType card={card} />
                            <Label>{card.text.name}</Label>
                            {count > 1 && (
                                <Count>
                                    <span>{count}</span>
                                </Count>
                            )}
                        </Item>
                    ))}
                </Column>
            </Root>
        );
    }
}
