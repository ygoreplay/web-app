import React from "react";
import { AutoSizer, List, ListRowProps } from "react-virtualized";
import * as Hangul from "hangul-js";

import { AppBar, Box, Drawer } from "@mui/material";

import {
    CardDescription,
    CardDescriptionItem,
    CardImage,
    CardListContainer,
    CardName,
    Container,
    Item,
    Root,
    TextField,
    Toolbar,
} from "@routes/tools/deck/CardExplorer.styles";

import { AllCardsForDeckEditorQuery, CardType, MonsterCardType } from "queries/index";
import { CardAttributeNames, CardRaceNames, TrapSpellCardTypeNames } from "@constants/card";
import memoizeOne from "memoize-one";

type Card = AllCardsForDeckEditorQuery["cards"][0];

export interface CardExplorerProps {
    open: boolean;
    onClose(): void;
    cards: AllCardsForDeckEditorQuery["cards"];
    onAddCardRequest(card: Card, side: boolean): void;
}
export interface CardExplorerStates {
    filteredCards: Card[] | null;
}

export const CARD_EXPLORER_WIDTH = 400;

export default class CardExplorer extends React.Component<CardExplorerProps, CardExplorerStates> {
    public state: CardExplorerStates = {
        filteredCards: null,
    };

    public componentDidMount() {
        document.body.addEventListener("contextmenu", this.handleContextMenu, false);
    }
    public componentWillUnmount() {
        document.body.removeEventListener("contextmenu", this.handleContextMenu, false);
    }

    private handleContextMenu = (e: Event) => {
        e.preventDefault();
        return false;
    };
    private handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (value) {
            const searcher = new Hangul.Searcher(value);

            this.setState({
                filteredCards: this.props.cards.filter(card => searcher.search(card.text.name) >= 0),
            });
        } else {
            this.setState({
                filteredCards: null,
            });
        }
    };
    private handleCardContextMenu = memoizeOne((card: Card) => {
        return (e: React.MouseEvent<HTMLDivElement>) => {
            this.props.onAddCardRequest(card, e.shiftKey);
        };
    });

    private renderItem = ({ key, index, style }: ListRowProps) => {
        const { cards } = this.props;
        const { filteredCards } = this.state;
        const targetCards = filteredCards || cards;
        const card = targetCards[index];

        let description = "알 수 없는 카드 정보";
        // eslint-disable-next-line default-case
        switch (card.type) {
            case CardType.Monster:
                description = `${CardAttributeNames[card.attribute]} - ${CardRaceNames[card.race]} - ${
                    card.monsterType.indexOf(MonsterCardType.Xyz) >= 0 ? "☆" : "★"
                } ${card.level}`;
                break;

            case CardType.Spell:
                description = `마법 - ${TrapSpellCardTypeNames[card.trapSpellType]}`;
                break;

            case CardType.Trap:
                description = `함정 - ${TrapSpellCardTypeNames[card.trapSpellType]}`;
                break;
        }

        return (
            <Item key={key} style={style} onContextMenu={this.handleCardContextMenu(card)}>
                <CardImage
                    style={{
                        backgroundImage: `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-image/${card.id}.jpg)` /* , backgroundColor: "rgba(255, 255, 255, 0.15)" */,
                    }}
                />
                <CardDescription>
                    <CardName>{card.text.name}</CardName>
                    <Container>
                        <CardDescriptionItem>{description}</CardDescriptionItem>
                    </Container>
                    <Container>
                        {card.type === CardType.Monster && (
                            <CardDescriptionItem>
                                {card.atk === -2 ? "?" : card.atk} / {card.def === -2 ? "?" : card.def}
                            </CardDescriptionItem>
                        )}
                    </Container>
                </CardDescription>
            </Item>
        );
    };
    private renderContent = () => {
        const { cards } = this.props;
        const { filteredCards } = this.state;
        const targetCards = filteredCards || cards;

        return (
            <Root>
                <AppBar elevation={0} color="transparent" sx={{ backgroundColor: "#010001" }} position="sticky">
                    <Toolbar sx={{ paddingLeft: 2, borderBottom: "1px solid rgb(19, 47, 76)" }}>
                        <TextField fullWidth size="small" sx={{ borderColor: "rgb(30, 73, 118)" }} onChange={this.handleSearchInputChange} />
                    </Toolbar>
                </AppBar>
                <CardListContainer>
                    {cards.length > 0 && (
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    width={width}
                                    height={height}
                                    overscanColumnCount={50}
                                    rowCount={targetCards.length}
                                    rowHeight={96}
                                    rowRenderer={this.renderItem}
                                />
                            )}
                        </AutoSizer>
                    )}
                </CardListContainer>
            </Root>
        );
    };
    public render() {
        const { open, onClose } = this.props;
        const content = this.renderContent();
        const container = typeof window !== "undefined" ? () => window.document.body : undefined;

        return (
            <Box component="nav" sx={{ width: { sm: CARD_EXPLORER_WIDTH }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor="right"
                    open={open}
                    onClose={onClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: CARD_EXPLORER_WIDTH },
                    }}
                >
                    {content}
                </Drawer>
                <Drawer
                    anchor="right"
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: CARD_EXPLORER_WIDTH,
                            borderLeftColor: "rgb(19, 47, 76)",
                            background: "rgba(0, 0, 0, 0.25)",
                            backdropFilter: "blur(15px)",
                        },
                    }}
                    open
                >
                    {content}
                </Drawer>
            </Box>
        );
    }
}
