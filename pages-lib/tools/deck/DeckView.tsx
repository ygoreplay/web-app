import React from "react";
import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";

import { Card, Deck } from "@routes/tools/deck";

import { CardImage, CardView, ExtraSideSection, List, MainSection, Root } from "./DeckView.styles";
import memoizeOne from "memoize-one";

export interface DeckViewProps {
    deck: Deck;
}
export interface DeckViewStates {
    width: number;
    height: number;
}

export default class DeckView extends React.Component<DeckViewProps, DeckViewStates> {
    public state: DeckViewStates = {
        width: 0,
        height: 0,
    };

    public handleMainListMeasure = ({ bounds }: ContentRect) => {
        if (!bounds || (this.state.width > 0 && this.state.height > 0)) {
            return;
        }

        this.setState({
            width: bounds.width,
            height: bounds.height,
        });
    };

    private renderCard = memoizeOne((extraSide: boolean) => {
        return (card: Card) => {
            const { width, height } = this.state;
            const cardsPerRow = extraSide ? 15 : Math.max(10, Math.ceil(this.props.deck.main.length / 4));

            return (
                <CardView
                    style={{
                        width: Math.floor(width / cardsPerRow - ((width / cardsPerRow) * (cardsPerRow - 1) + 100 - width) / cardsPerRow),
                        height: extraSide ? "100%" : Math.floor(height / 4 - ((height / 4) * 3 + 145 - height) / 4),
                    }}
                >
                    {card.text.name}
                    <CardImage style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${card.id}.jpg)` }} />
                </CardView>
            );
        };
    });
    private renderMainList = ({ measureRef }: MeasuredComponentProps) => {
        const { deck } = this.props;

        return (
            <MainSection>
                <List>
                    <div ref={measureRef}>{deck.main.map(this.renderCard(false))}</div>
                </List>
            </MainSection>
        );
    };
    public render() {
        const { deck } = this.props;

        return (
            <Root>
                <Measure bounds onResize={this.handleMainListMeasure}>
                    {this.renderMainList}
                </Measure>
                <ExtraSideSection>
                    <List>
                        <div>{deck.extra.map(this.renderCard(true))}</div>
                    </List>
                </ExtraSideSection>
                <ExtraSideSection>
                    <List>
                        <div>{deck.side.map(this.renderCard(true))}</div>
                    </List>
                </ExtraSideSection>
            </Root>
        );
    }
}
