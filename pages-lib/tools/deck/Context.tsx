/* eslint-disable no-empty-function */
import React from "react";
import update from "immutability-helper";
import _ from "lodash";

import { Backdrop, CircularProgress } from "@mui/material";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { Card } from "@routes/tools/deck";
import { Deck, ParticipantType, TeamDeck } from "@routes/tools/deck/types";
import ChampionshipSettingsDialog from "@routes/tools/deck/ChampionshipSettingsDialog";
import ChampionshipJoinDialog, { ChampionshipJoinDialogValue } from "@routes/tools/deck/ChampionshipJoinDialog";

import { withDialog, WithDialogProps } from "@dialogs/withDialog";

import { sortCardByLevel } from "@utils/sortCardByLevel";
import { loadDeckFromString } from "@utils/loadDeckFromString";
import { BanList, Championship } from "@utils/type";

import { GenerateDeckRecipeImageDocument, GenerateDeckRecipeImageMutation, GenerateDeckRecipeImageMutationVariables } from "queries/index";

import { DeckImage } from "@routes/tools/deck/Context.styles";
import { DialogCloseReason, DialogType } from "@dialogs/types";
import { getMaxCountFromCard } from "@utils/getMaxCountFromCard";
import { checkIfTeamChampionship } from "@utils/checkIfTeamChampionship";
import { checkIfTeamData } from "@utils/checkIfTeamData";
import { searchCardCountFromDeck } from "@utils/searchCardCountFromDeck";
import { searchCardCountFromDecks } from "@utils/searchCardCountFromDecks";
import { generateCardCountString } from "@utils/generateCardCountString";
import { getCardUsageCountFromDecks } from "@utils/getCardUsageCountFromDecks";

interface DeckEditorProviderProps {
    children: React.ReactNode;
    cards: Card[] | null;
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
    selectedParticipant: ParticipantType;
    decks: TeamDeck;
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
    clearDeck(): Promise<void>;
    championship: Championship | null;
    championshipJoinValue: ChampionshipJoinDialogValue | null;
    banList: BanList | null;
    selectedParticipant: ParticipantType;
    setSelectedParticipant(participantType: ParticipantType): void;
    deck: Deck;
    decks: DeckEditorProviderStates["decks"];
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
    async clearDeck() {},
    championship: null,
    championshipJoinValue: null,
    banList: { limit: [], semiLimit: [], forbidden: [], __typename: "BanListDeclaration" },
    selectedParticipant: "first",
    setSelectedParticipant() {},
    deck: { side: [], extra: [], main: [] },
    decks: { first: { side: [], extra: [], main: [] }, third: { side: [], extra: [], main: [] }, second: { side: [], extra: [], main: [] } },
});

class DeckEditorProvider extends React.Component<WithApolloClient<DeckEditorProviderProps> & WithDialogProps, DeckEditorProviderStates> {
    private contextValue: Omit<DeckEditorContextValues, "banList" | "selectedParticipant" | "deck" | "decks"> = {
        addCard: this.addCard.bind(this),
        removeCard: this.removeCard.bind(this),
        moveCard: this.moveCard.bind(this),
        sortCards: this.sortCards.bind(this),
        importYDKFile: this.importYDKFile.bind(this),
        exportYDKFile: this.exportYDKFile.bind(this),
        exportDeckToImage: this.exportDeckToImage.bind(this),
        createChampionship: this.createChampionship.bind(this),
        getAvailableBanLists: this.getAvailableBanLists.bind(this),
        setSelectedParticipant: this.setSelectedParticipant.bind(this),
        clearDeck: this.clearDeck.bind(this),
        championship: null,
        championshipJoinValue: null,
    };

    public state: DeckEditorProviderStates = {
        decks: {
            first: { side: [], extra: [], main: [] },
            second: { side: [], extra: [], main: [] },
            third: { side: [], extra: [], main: [] },
        },
        deckImageUrl: null,
        deckImageLoading: false,
        championship: false,
        championshipJoin: false, // Boolean(this.props.championship),
        championshipJoinValue: {
            name: "비티어 크루",
            firstParticipantName: "안인균",
            secondParticipantName: "안호균",
            thirdParticipantName: "민병현",
        },
        selectedParticipant: "first",
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
    private setSelectedParticipant(participantType: ParticipantType) {
        this.setState({
            selectedParticipant: participantType,
        });
    }

    private updateDeck = (deck: Deck) => {
        this.setState((prevState: DeckEditorProviderStates) => ({
            decks: {
                ...prevState.decks,
                [prevState.selectedParticipant]: deck,
            },
        }));
    };
    private getCurrentDeck = () => {
        const { decks, selectedParticipant } = this.state;
        return decks[selectedParticipant];
    };
    private async clearDeck() {
        const { showDialog } = this.props;
        if (!showDialog) {
            return;
        }

        const result = await showDialog(DialogType.YesNo, "덱을 초기화 하시겠습니까?", {
            title: "덱 비우기",
            negativeButtonLabel: "취소",
            positiveButtonLabel: "초기화",
        });

        if (result.reason !== DialogCloseReason.Yes) {
            return;
        }

        this.updateDeck({
            main: [],
            extra: [],
            side: [],
        });
    }

    private addCard(card: Card, side?: boolean) {
        if (!this.props.showDialog) {
            return;
        }

        const { banList, championship } = this.props;
        const { decks, selectedParticipant, championshipJoinValue } = this.state;
        const previousDeck = decks[selectedParticipant];
        const cardCount = searchCardCountFromDeck(previousDeck, card);
        const cardLimit = getMaxCountFromCard(banList || null, card);
        const isTeamChampionship = checkIfTeamChampionship(championship) && checkIfTeamData(championshipJoinValue);
        if (isTeamChampionship) {
            const universalCardCount = searchCardCountFromDecks(decks, card);
            // 금제 공유
            if (championship.shareBanLists && cardLimit < 3 && cardLimit > 0 && universalCardCount >= cardLimit) {
                const countString = generateCardCountString(decks, card, championshipJoinValue);
                this.props.showDialog(DialogType.Alert, `'${card.text.name}'의 매수가 설정된 금제에 부합하지 않습니다.\n(${countString})`, {
                    positiveButtonLabel: "확인",
                    title: "매수 초과",
                });

                return;
            }

            // 매수 공유
            if (championship.shareCardCount && universalCardCount >= cardLimit) {
                const countString = generateCardCountString(decks, card, championshipJoinValue);
                this.props.showDialog(DialogType.Alert, `전체 덱의 '${card.text.name}' 카드 매수가 3장을 초과합니다.\n(${countString})`, {
                    positiveButtonLabel: "확인",
                    title: "매수 초과",
                });

                return;
            }
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

        this.updateDeck(deck);
    }
    private removeCard(index: number, type: DeckType) {
        const deck = this.getCurrentDeck();

        this.updateDeck({
            ...deck,
            [type]: deck[type].filter((__, i) => i !== index),
        });
    }
    private moveCard(dragIndex: number, hoverIndex: number, type: DeckType) {
        const deck = this.getCurrentDeck();
        const dragCard = deck[type][dragIndex];

        this.updateDeck({
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
        const deck = this.getCurrentDeck();

        this.updateDeck({
            main: deck.main.sort(sortCardByLevel),
            extra: deck.extra.sort(sortCardByLevel),
            side: deck.side.sort(sortCardByLevel),
        });
    }
    private importYDKFile(file: File) {
        const fileReader = new FileReader();
        fileReader.onload = async e => {
            if (!this.props.showDialog) {
                return;
            }

            const { cards, banList, championship } = this.props;
            const { championshipJoinValue, decks } = this.state;
            if (!e.target || typeof e.target.result !== "string" || !cards) {
                return;
            }

            // 개인 체크
            const loadedDeck = loadDeckFromString(e.target.result, cards);
            const uniqueCards = _.uniqBy([...loadedDeck.main, ...loadedDeck.side, ...loadedDeck.extra], c => c.id);
            const cardCountMap = _.countBy([...loadedDeck.main, ...loadedDeck.side, ...loadedDeck.extra], c => c.alias || c.id);
            if (banList && uniqueCards.length > 0) {
                for (let i = 0; i < uniqueCards.length; i++) {
                    const card = uniqueCards[i];
                    const allowedCount = getMaxCountFromCard(banList, card);
                    if (allowedCount < cardCountMap[card.alias || card.id]) {
                        if (this.props.showDialog) {
                            this.props.showDialog(
                                DialogType.Alert,
                                `'${card.text.name}'의 매수가 설정된 금제에 부합하지 않습니다. (포함 매수: ${
                                    cardCountMap[card.alias || card.id]
                                }, 금제: ${allowedCount})`,
                                {
                                    title: "오류",
                                    positiveButtonLabel: "확인",
                                },
                            );
                        }
                        return;
                    }
                }
            }

            // 팀 체크
            const isTeamChampionship = checkIfTeamChampionship(championship) && checkIfTeamData(championshipJoinValue);
            if (isTeamChampionship && uniqueCards.length > 0 && banList && (championship.shareBanLists || championship.shareCardCount)) {
                const cardUsageCount = getCardUsageCountFromDecks(decks);
                for (let i = 0; i < uniqueCards.length; i++) {
                    const addedCard = uniqueCards[i];
                    const addedCount = cardCountMap[addedCard.alias || addedCard.id];
                    const originalCount = cardUsageCount[addedCard.alias || addedCard.id] || 0;
                    const allowedCount = getMaxCountFromCard(banList, addedCard);

                    if (addedCount + originalCount > allowedCount) {
                        if (championship.shareBanLists && allowedCount < 3 && allowedCount > 0) {
                            const countString = generateCardCountString(decks, addedCard, championshipJoinValue);
                            this.props.showDialog(DialogType.Alert, `'${addedCard.text.name}'의 매수가 설정된 금제에 부합하지 않습니다.\n(${countString})`, {
                                positiveButtonLabel: "확인",
                                title: "매수 초과",
                            });

                            return;
                        }

                        if (championship.shareCardCount && allowedCount >= 3) {
                            const countString = generateCardCountString(decks, addedCard, championshipJoinValue);
                            this.props.showDialog(DialogType.Alert, `전체 덱의 '${addedCard.text.name}' 카드 매수가 3장을 초과하게 됩니다.\n(${countString})`, {
                                positiveButtonLabel: "확인",
                                title: "매수 초과",
                            });

                            return;
                        }
                    }
                }
            }

            this.updateDeck(loadedDeck);
        };

        fileReader.readAsBinaryString(file);
    }
    private exportYDKFile() {
        const deck = this.getCurrentDeck();
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
        const { client } = this.props;
        const deck = this.getCurrentDeck();
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
        const { deckImageUrl, deckImageLoading, championship, championshipJoin, championshipJoinValue, selectedParticipant, decks } = this.state;

        return (
            <DeckEditorContext.Provider
                value={{
                    ...this.contextValue,
                    championshipJoinValue,
                    championship: championshipData || null,
                    banList: banList || null,
                    selectedParticipant,
                    deck: this.getCurrentDeck(),
                    decks,
                }}
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
