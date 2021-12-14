/* eslint-disable no-empty-function */
import React from "react";
import update from "immutability-helper";
import _ from "lodash";

import { Backdrop, CircularProgress } from "@mui/material";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { Card, Deck } from "@routes/tools/deck";
import ChampionshipSettingsDialog from "@routes/tools/deck/ChampionshipSettingsDialog";
import ChampionshipJoinDialog, { ChampionshipJoinDialogValue } from "@routes/tools/deck/ChampionshipJoinDialog";

import { withDialog, WithDialogProps } from "@dialogs/withDialog";

import { sortCardByLevel } from "@utils/sortCardByLevel";
import { loadDeckFromString } from "@utils/loadDeckFromString";
import { BanList, Championship } from "@utils/type";
import { getCardBanListStatus } from "@utils/getCardBanListStatus";
import { getMaxCardCountFromBanListStatus } from "@utils/getMaxCardCountFromBanListStatus";

import { GenerateDeckRecipeImageDocument, GenerateDeckRecipeImageMutation, GenerateDeckRecipeImageMutationVariables } from "queries/index";

import { DeckImage } from "@routes/tools/deck/Context.styles";
import { DialogType } from "@dialogs/types";

interface DeckEditorProviderProps {
    children: React.ReactNode;
    deck: Deck;
    cards: Card[] | null;
    onDeckChange(deck: Deck): void;
    banLists: string[];
    championship?: Championship;
    banList?: BanList;
}
interface DeckEditorProviderStates {
    deckImageUrl: string | null;
    deckImageLoading: boolean;
    championship: boolean;
    championshipJoin: boolean;
    championshipJoinValue: ChampionshipJoinDialogValue | null;
}

export interface DeckEditorContextValues {
    addCard(card: Card, side?: boolean): void;
    removeCard(index: number, type: DeckType): void;
    moveCard(dragIndex: number, hoverIndex: number, type: DeckType): void;
    sortCards(): void;
    importYDKFile(file: File): void;
    exportYDKFile(): void;
    exportDeckToImage(): Promise<void>;
    createChampionship(): void;
    getAvailableBanLists(): string[];
    championship: Championship | null;
    championshipJoinValue: ChampionshipJoinDialogValue | null;
    banList: BanList | null;
}

export type DeckType = "main" | "extra" | "side";

const DeckEditorContext = React.createContext<DeckEditorContextValues>({
    addCard() {},
    removeCard() {},
    moveCard() {},
    sortCards() {},
    importYDKFile() {},
    exportYDKFile() {},
    async exportDeckToImage() {},
    createChampionship() {},
    getAvailableBanLists() {
        return [];
    },
    championship: null,
    championshipJoinValue: null,
    banList: { limit: [], semiLimit: [], forbidden: [], __typename: "BanListDeclaration" },
});

class DeckEditorProvider extends React.Component<WithApolloClient<DeckEditorProviderProps> & WithDialogProps, DeckEditorProviderStates> {
    private contextValue: Omit<DeckEditorContextValues, "banList"> = {
        addCard: this.addCard.bind(this),
        removeCard: this.removeCard.bind(this),
        moveCard: this.moveCard.bind(this),
        sortCards: this.sortCards.bind(this),
        importYDKFile: this.importYDKFile.bind(this),
        exportYDKFile: this.exportYDKFile.bind(this),
        exportDeckToImage: this.exportDeckToImage.bind(this),
        createChampionship: this.createChampionship.bind(this),
        getAvailableBanLists: this.getAvailableBanLists.bind(this),
        championship: null,
        championshipJoinValue: null,
    };

    public state: DeckEditorProviderStates = {
        deckImageUrl: null,
        deckImageLoading: false,
        championship: false,
        championshipJoin: Boolean(this.props.championship),
        championshipJoinValue: null,
    };

    private handleClose = () => {
        this.setState({
            deckImageUrl: null,
        });
    };
    public handleChampionshipSettingsDialogClose = () => {
        this.setState({
            championship: false,
        });
    };
    private handleChampionshipJoinDialogSubmit = (value: ChampionshipJoinDialogValue) => {
        this.setState({
            championshipJoinValue: value,
            championshipJoin: false,
        });
    };

    private getAvailableBanLists() {
        return this.props.banLists;
    }
    private addCard(card: Card, side?: boolean) {
        const { deck: previousDeck, onDeckChange, banList } = this.props;
        const cardCount = [...previousDeck.main, ...previousDeck.extra, ...previousDeck.side].filter(
            c => c.id === card.id || c.alias === card.id || card.alias === c.id,
        ).length;

        let cardLimit = 3;
        const banListStatus = getCardBanListStatus(card, banList || null);
        if (banListStatus === "semi-limit") {
            cardLimit = 2;
        } else if (banListStatus === "limit") {
            cardLimit = 1;
        } else if (banListStatus === "forbidden") {
            cardLimit = 0;
        }

        if (cardCount >= cardLimit) {
            return;
        }

        const deck = _.cloneDeep(previousDeck);
        if (side && deck.side.length < 15) {
            deck.side.push(card);
        } else if (card.isExtra && deck.extra.length < 15 && !side) {
            deck.extra.push(card);
        } else if (deck.main.length < 60 && !side) {
            deck.main.push(card);
        }

        onDeckChange(deck);
    }
    private removeCard(index: number, type: DeckType) {
        const { deck, onDeckChange } = this.props;

        onDeckChange({
            ...deck,
            [type]: deck[type].filter((__, i) => i !== index),
        });
    }
    private moveCard(dragIndex: number, hoverIndex: number, type: DeckType) {
        const { deck, onDeckChange } = this.props;
        const dragCard = deck[type][dragIndex];

        onDeckChange({
            ...deck,
            [type]: update(deck[type], {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        });
    }
    private sortCards() {
        const { onDeckChange, deck } = this.props;

        onDeckChange({
            main: deck.main.sort(sortCardByLevel),
            extra: deck.extra.sort(sortCardByLevel),
            side: deck.side.sort(sortCardByLevel),
        });
    }
    private importYDKFile(file: File) {
        const fileReader = new FileReader();
        fileReader.onload = async e => {
            const { cards, onDeckChange, banList } = this.props;
            if (!e.target || typeof e.target.result !== "string" || !cards) {
                return;
            }

            const loadedDeck = loadDeckFromString(e.target.result, cards);
            const allCards = _.uniqBy([...loadedDeck.main, ...loadedDeck.side, ...loadedDeck.extra], c => c.id);
            const cardCountMap = _.countBy([...loadedDeck.main, ...loadedDeck.side, ...loadedDeck.extra], c => c.alias || c.id);
            if (banList && allCards.length > 0) {
                for (let i = 0; i < allCards.length; i++) {
                    const card = allCards[i];
                    const banListStatus = getCardBanListStatus(card, banList);
                    const allowedCount = getMaxCardCountFromBanListStatus(banListStatus);
                    if (allowedCount < cardCountMap[card.alias || card.id]) {
                        if (this.props.showDialog) {
                            this.props.showDialog(DialogType.Alert, `'${card.text.name}'의 매수가 설정된 금제에 부합하지 않습니다.`, {
                                title: "오류",
                                positiveButtonLabel: "확인",
                            });
                        }
                        return;
                    }
                }
            }

            onDeckChange(loadedDeck);
        };

        fileReader.readAsBinaryString(file);
    }
    private exportYDKFile() {
        const { deck } = this.props;
        const anchor = document.createElement("a");

        const deckString = ["#main", ...deck.main.map(c => c.id), "#extra", ...deck.extra.map(c => c.id), "!side", ...deck.side.map(c => c.id)].join("\n");
        anchor.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(deckString)}`);
        anchor.setAttribute("download", "deck.ydk");

        if ("createEvent" in document) {
            const event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            anchor.dispatchEvent(event);
        } else {
            anchor.click();
        }
    }
    private async exportDeckToImage() {
        const { deck, client } = this.props;
        if (!client) {
            return;
        }

        this.setState({ deckImageLoading: true });
        const { data } = await client.mutate<GenerateDeckRecipeImageMutation, GenerateDeckRecipeImageMutationVariables>({
            mutation: GenerateDeckRecipeImageDocument,
            variables: {
                main: deck.main.map(c => c.id),
                extra: deck.extra.map(c => c.id),
                side: deck.side.map(c => c.id),
            },
        });

        if (!data) {
            throw new Error("Failed to generate deck image!");
        }

        this.setState({ deckImageUrl: data.generateDeckRecipeImage, deckImageLoading: false });
    }
    private createChampionship() {
        this.setState({
            championship: true,
        });
    }

    public render() {
        const { children, banLists, championship: championshipData, banList } = this.props;
        const { deckImageUrl, deckImageLoading, championship, championshipJoin, championshipJoinValue } = this.state;

        return (
            <DeckEditorContext.Provider
                value={{ ...this.contextValue, championshipJoinValue, championship: championshipData || null, banList: banList || null }}
            >
                {children}
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={deckImageLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={Boolean(deckImageUrl)} onClick={this.handleClose}>
                    {deckImageUrl && <DeckImage src={deckImageUrl} />}
                </Backdrop>
                <ChampionshipSettingsDialog banLists={banLists} open={championship} onClose={this.handleChampionshipSettingsDialogClose} />
                {championshipData && (
                    <ChampionshipJoinDialog onSubmit={this.handleChampionshipJoinDialogSubmit} championship={championshipData} open={championshipJoin} />
                )}
            </DeckEditorContext.Provider>
        );
    }
}

export function useDeckEditor() {
    return React.useContext(DeckEditorContext);
}

export default withApollo<DeckEditorProviderProps>(withDialog(DeckEditorProvider));
