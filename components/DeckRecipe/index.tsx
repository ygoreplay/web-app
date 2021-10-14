import React from "react";

import DeckRecipeList from "@components/DeckRecipe/List";

import { DeckBase } from "@utils/type";

type DeckRecipeUIType = "list";

export interface DeckRecipeProps {
    type: DeckRecipeUIType;
    deck: DeckBase;
}
export interface DeckRecipeStates {}

export default class DeckRecipe extends React.Component<DeckRecipeProps, DeckRecipeStates> {
    public render() {
        const { type, deck } = this.props;

        switch (type) {
            case "list":
                return <DeckRecipeList deck={deck} />;

            default:
                throw new Error(`Unknown deck recipe ui type: ${type}`);
        }
    }
}
