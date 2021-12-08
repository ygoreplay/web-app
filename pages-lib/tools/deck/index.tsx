import _ from "lodash";
import React from "react";

import { Global } from "@emotion/react";

import { Box, Toolbar, Typography } from "@mui/material";

import AppBar from "@routes/tools/deck/AppBar";
import CardExplorer from "@routes/tools/deck/CardExplorer";
import CardDragLayer from "@routes/tools/deck/CardDragLayer";
import DeckView from "@routes/tools/deck/DeckView";

import { Content, DeckViewWrapper, GlobalStyles, Graphics, Message, Particles } from "@routes/tools/deck/index.styles";
import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { AllCardsForDeckEditorDocument, AllCardsForDeckEditorQuery } from "queries/index";

declare const createjs: any;
declare const particlejs: any;

export type Card = AllCardsForDeckEditorQuery["cards"][0];

export interface Deck {
    main: Card[];
    extra: Card[];
    side: Card[];
}

export interface DeckToolRouteProps {}
export interface DeckToolRouteStates {
    cardExplorerOpened: boolean;
    cards: Card[] | null;
    deck: Deck;
}

const LOCAL_STORAGE_KEY = "__YGOREPLAY_DECK_EDITOR_CARDS__";

class DeckToolRoute extends React.Component<WithApolloClient<DeckToolRouteProps>, DeckToolRouteStates> {
    public state: DeckToolRouteStates = {
        cardExplorerOpened: false,
        cards: null,
        deck: {
            side: [],
            extra: [],
            main: [],
        },
    };

    public async componentDidMount() {
        const stage = new createjs.Stage("particles");
        const particleSystem = new particlejs.ParticleSystem();
        stage.addChild(particleSystem.container);
        particleSystem.importFromJson({
            bgColor: "transparent",
            width: 1024,
            height: 1024,
            emitFrequency: 13,
            startX: 512,
            startXVariance: 512,
            startY: 734,
            startYVariance: 879,
            initialDirection: 270,
            initialDirectionVariance: 116,
            initialSpeed: 0.1,
            initialSpeedVariance: 1.7,
            friction: 0,
            accelerationSpeed: 0.015,
            accelerationDirection: 265,
            startScale: 0.33,
            startScaleVariance: 0.04,
            finishScale: "0",
            finishScaleVariance: "0",
            lifeSpan: 214,
            lifeSpanVariance: 89,
            startAlpha: 1,
            startAlphaVariance: 0,
            finishAlpha: 0.85,
            finishAlphaVariance: "0",
            shapeIdList: ["blur_circle"],
            startColor: {
                hue: 300,
                hueVariance: 9,
                saturation: 100,
                saturationVariance: 0,
                luminance: 28,
                luminanceVariance: 0,
            },
            blendMode: true,
            alphaCurveType: "1",
            VERSION: "1.0.0",
        });

        createjs.Ticker.framerate = 60;
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", () => {
            particleSystem.update();
            stage.update();
        });

        const data = localStorage.getItem("__YGOREPLAY_DECK_EDITOR_CARDS__");
        if (!data) {
            if (this.props.client) {
                const { data: fetchedData } = await this.props.client.query<AllCardsForDeckEditorQuery>({
                    query: AllCardsForDeckEditorDocument,
                    fetchPolicy: "no-cache",
                });

                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedData.cards));

                this.setState({
                    cards: fetchedData.cards,
                });
            }
        } else {
            this.setState({
                cards: JSON.parse(data),
            });
        }
    }

    private handleCardExplorerClose = () => {
        this.setState({
            cardExplorerOpened: false,
        });
    };
    private handleAddCardRequest = (card: Card, side: boolean) => {
        const { deck: previousDeck } = this.state;
        const cardCount = [...previousDeck.main, ...previousDeck.extra, ...previousDeck.side].filter(c => c.id === card.id).length;
        if (cardCount >= 3) {
            return;
        }

        this.setState((prevState: DeckToolRouteStates) => {
            const deck = _.cloneDeep(prevState.deck);
            if (side && deck.side.length < 15) {
                deck.side.push(card);
            } else if (card.isExtra && deck.extra.length < 15 && !side) {
                deck.extra.push(card);
            } else if (deck.main.length < 60 && !side) {
                deck.main.push(card);
            }

            return {
                deck,
            };
        });
    };

    private renderGraphics = () => {
        return (
            <Graphics>
                <Particles id="particles" width={1024} height={1024} />
            </Graphics>
        );
    };
    public render() {
        const { cardExplorerOpened, cards, deck } = this.state;
        let content: React.ReactNode = null;
        if (!cards) {
            content = (
                <Message>
                    <Typography variant="h6" noWrap component="div">
                        데이터를 불러 오는 중...
                    </Typography>
                </Message>
            );
        }

        return (
            <>
                <Global styles={GlobalStyles} />
                {this.renderGraphics()}
                <Box
                    style={{ opacity: !cards ? 0 : 1 }}
                    sx={{
                        display: "flex",
                        height: "100%",
                        color: "white",
                        transition: "opacity 0.2s ease",
                        position: "relative",
                        zIndex: 100,
                    }}
                >
                    <AppBar />
                    <Content>
                        <Toolbar />
                        <DeckViewWrapper>
                            <DeckView onAddCardRequest={this.handleAddCardRequest} deck={deck} />
                        </DeckViewWrapper>
                    </Content>
                    <CardDragLayer />
                    <CardExplorer
                        onAddCardRequest={this.handleAddCardRequest}
                        cards={cards || []}
                        open={cardExplorerOpened}
                        onClose={this.handleCardExplorerClose}
                    />
                </Box>
                {content}
            </>
        );
    }
}

export default withApollo(DeckToolRoute);
