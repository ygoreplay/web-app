import React from "react";
import memoizeOne from "memoize-one";

import { ChevronRight } from "@mui/icons-material";

import { Item, Root } from "@routes/tools/deck-card/DeckCardSideBar.styles";

import { DeckTitleCardInput } from "queries/index";
import { DeckTitleCard, DeckType } from "@utils/type";

export interface DeckCardSideBarProps {
    deckTitleCards: _.Dictionary<DeckTitleCard>;
    deckTypes: DeckType[];
    currentIndex: number;
    onChange(index: number): void;
    changedDeckTitleCards: DeckTitleCardInput[];
}
export interface DeckCardSideBarStates {}

export default class DeckCardSideBar extends React.PureComponent<DeckCardSideBarProps, DeckCardSideBarStates> {
    public handleClick = memoizeOne((index: number) => {
        return () => {
            this.props.onChange(index);
        };
    });

    private renderDeckType = (deckType: DeckType, index: number) => {
        const { currentIndex, changedDeckTitleCards, deckTitleCards } = this.props;
        const isChanged = changedDeckTitleCards ? changedDeckTitleCards.some(dtc => dtc.deckName === deckType.name) : false;

        return (
            <Item
                registered={deckType.name in deckTitleCards}
                changed={isChanged}
                activated={currentIndex === index}
                onClick={this.handleClick(index)}
                key={deckType.id}
            >
                <ChevronRight />
                <span>{deckType.name}</span>
            </Item>
        );
    };
    public render() {
        const { deckTypes } = this.props;

        return <Root>{deckTypes.map(this.renderDeckType)}</Root>;
    }
}
