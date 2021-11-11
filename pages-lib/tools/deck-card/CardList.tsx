import React from "react";
import _ from "lodash";
import memoizeOne from "memoize-one";

import { Check } from "@mui/icons-material";

import { CardContainer, CardImage, CardItem, CardName, Root, CardType as CardDescription } from "@routes/tools/deck-card/CardList.styles";

import { DeckTitleCard, DeckType } from "@utils/type";
import { CardDataForDeckCardToolFragment, CardType, DeckForDeckCardToolProps, DeckTitleCardInput, withDeckForDeckCardTool } from "queries/index";

export interface CardListProps {
    deckType: DeckType;
    onChange(cardId: number): void;
    currentTitleCard: DeckTitleCard | DeckTitleCardInput | undefined;
}
export interface CardListStates {}

class CardList extends React.Component<CardListProps & DeckForDeckCardToolProps, CardListStates> {
    public handleClick = memoizeOne((cardId: number) => {
        return () => {
            this.props.onChange(cardId);
        };
    });

    public renderCardItem = (card: CardDataForDeckCardToolFragment) => {
        const { currentTitleCard } = this.props;

        let cardType = "";
        switch (card.type) {
            case CardType.Monster:
                cardType = "몬스터";
                break;

            case CardType.Spell:
                cardType = "마법";
                break;

            case CardType.Trap:
                cardType = "함정";
                break;

            default:
                break;
        }

        return (
            <CardItem key={card.id}>
                <CardImage
                    onClick={this.handleClick(card.id)}
                    style={{ backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/304x304/${card.id}.jpg)` }}
                >
                    {currentTitleCard && currentTitleCard.cardId === card.id && (
                        <div className="content">
                            <Check />
                        </div>
                    )}
                </CardImage>
                <CardName>{card.text.name}</CardName>
                <CardDescription>{cardType}</CardDescription>
            </CardItem>
        );
    };

    public render() {
        const { data } = this.props;
        if (data.loading || !data.deck) {
            return <Root />;
        }

        const mainDeck = _.uniqBy(data.deck.main, c => c.id);
        const extraDeck = _.uniqBy(data.deck.extra, c => c.id);

        return (
            <Root>
                <CardContainer>{mainDeck.map(this.renderCardItem)}</CardContainer>
                <CardContainer>{extraDeck.map(this.renderCardItem)}</CardContainer>
            </Root>
        );
    }
}

export default withDeckForDeckCardTool<CardListProps>({
    options: props => ({
        variables: {
            id: props.deckType.id,
        },
    }),
})(CardList);
