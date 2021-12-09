import React from "react";
import { AutoSizer, List, ListRowProps } from "react-virtualized";
import * as Hangul from "hangul-js";
import memoizeOne from "memoize-one";

import { AppBar, Box, Drawer } from "@mui/material";

import { Card } from "@routes/tools/deck";
import CardExplorerItem from "@routes/tools/deck/CardExplorerItem";

import { CardListContainer, Root, TextField, Toolbar } from "@routes/tools/deck/CardExplorer.styles";

import { AllCardsForDeckEditorQuery } from "queries/index";

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

        return <CardExplorerItem key={key} card={card} style={style} onCardContextMenu={this.handleCardContextMenu(card)} />;
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
