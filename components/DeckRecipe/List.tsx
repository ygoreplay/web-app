import React from "react";

import { Typography } from "@mui/material";

import { Column, Root, Separator } from "@components/DeckRecipe/List.styles";

import { parseDeckData } from "@utils/parseDeckData";
import { DeckBase } from "@utils/type";
import DeckRecipeListItem from "@components/DeckRecipe/ListItem";

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

    private renderItem = ({ card, count }: DeckRecipeListStates["parsedDeck"]["main"][0]) => {
        return <DeckRecipeListItem key={card.id} card={card} count={count} />;
    };
    public render() {
        const { parsedDeck } = this.state;

        return (
            <Root>
                <Column>
                    <Separator>
                        <Typography variant="subtitle1">메인 덱</Typography>
                    </Separator>
                    {parsedDeck.main.map(this.renderItem)}
                </Column>
                <Column>
                    <Separator>
                        <Typography variant="subtitle1">엑스트라 덱</Typography>
                    </Separator>
                    {parsedDeck.extra.map(this.renderItem)}
                </Column>
                <Column>
                    <Separator>
                        <Typography variant="subtitle1">사이드 덱</Typography>
                    </Separator>
                    {parsedDeck.side.map(this.renderItem)}
                </Column>
            </Root>
        );
    }
}
