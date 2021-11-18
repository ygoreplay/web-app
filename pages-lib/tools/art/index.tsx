import React from "react";
import { Mosaic, MosaicBranch, MosaicNode, TileRenderer } from "react-mosaic-component";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { Fab, ThemeProvider, Tooltip, Zoom } from "@mui/material";
import { ArrowBack, ArrowForward, Preview, Save } from "@mui/icons-material";

import CropPreviewPanel from "@routes/tools/art/CropPreviewPanel";
import ArtPanel from "@routes/tools/art/ArtPanel";
import CropperCardList, { CropperCardListUpdater } from "@routes/tools/art/CardList";

import {
    CardCountProps,
    CardCropperDataInput,
    IndexedCardComponent,
    IndexedCardQuery,
    IndexedCardQueryResult,
    SaveCropperDataDocument,
    SaveCropperDataMutation,
    SaveCropperDataMutationVariables,
    withCardCount,
} from "@query";

import { generateClipArea, Rectangle } from "@utils/generateClipArea";
import { generateClippedImage } from "@utils/generateClippedImage";
import { noop } from "@utils/noop";

import { Button, Content, Controls, Root, Title, ToggleButton, TopBar } from "@routes/tools/art/index.styles";
import { FabContainer } from "@routes/tools/deck-card/index.styles";

import { CROPPER_UI_PRESET_KEYS, CROPPER_UI_PRESETS, CropperUIPresetType } from "@constants/cropper";

import { toolTheme } from "@styles/theme";
import { Placeholder } from "@styles/Placeholder";

export interface AdminArtRouteProps {}
export interface AdminArtRouteStates {
    currentIndex: number;
    selection: Rectangle;
    currentCard: IndexedCardQuery["indexedCard"] | null;
    layout: MosaicNode<ArtCropperPaneType> | null;
    imageUrls: { [key in CropperUIPresetType]: string | null } | null;
    removePreview(): void;
    unsavedSelectionData: { [key: number]: Rectangle | undefined };
}

export type ArtCropperPaneType = "art" | "preview" | "attributes";

export interface PaneBaseProps {
    path: MosaicBranch[];
}

class AdminArtRoute extends React.Component<WithApolloClient<AdminArtRouteProps & CardCountProps>, AdminArtRouteStates> {
    private renderer: {
        [key in ArtCropperPaneType]: (...args: [...Parameters<TileRenderer<ArtCropperPaneType>>, boolean]) => ReturnType<TileRenderer<ArtCropperPaneType>>;
    } = {
        art: this.renderArtPanel.bind(this),
        preview: this.renderCropPreviewPanel.bind(this),
        attributes: () => <></>,
    };
    private cardListUpdater: CropperCardListUpdater | null = null;

    public state: AdminArtRouteStates = {
        currentIndex: 0,
        selection: {
            x: 152,
            y: 152,
            width: 50,
            height: 50,
        },
        currentCard: null,
        imageUrls: null,
        layout: { direction: "row", first: "art", second: "preview", splitPercentage: 30 },
        removePreview: noop,
        unsavedSelectionData: {},
    };

    private isPreviewActivated = (layout = this.state.layout): boolean => {
        if (!layout) {
            return false;
        }
        if (typeof layout === "string") {
            return layout === "preview";
        }
        if (typeof layout.first === "string" && layout.first === "preview") {
            return true;
        }
        if (typeof layout.second === "string" && layout.second === "preview") {
            return true;
        }

        return this.isPreviewActivated(layout.first) || this.isPreviewActivated(layout.second);
    };

    private generateCroppedImage = async () => {
        const { currentCard, selection } = this.state;
        if (!currentCard) {
            return;
        }

        const imageUrls: { [key in CropperUIPresetType]: string | null } = {
            "card-usage-list-item": null,
            "deck-list-item": null,
            "match-list-item": null,
        };

        for (let i = 0; i < CROPPER_UI_PRESET_KEYS.length; i++) {
            const cropperPresetKey = CROPPER_UI_PRESET_KEYS[i];
            const clipArea = generateClipArea(selection, CROPPER_UI_PRESETS[cropperPresetKey], 304);

            // eslint-disable-next-line no-await-in-loop
            imageUrls[cropperPresetKey] = await generateClippedImage(`/api/304x304/${currentCard.id}.jpg`, clipArea, CROPPER_UI_PRESETS[cropperPresetKey]);
        }

        this.setState({
            imageUrls,
        });
    };
    private mutateIndex = (delta: 1 | -1) => {
        this.setState((prevState: AdminArtRouteStates) => {
            const index = prevState.currentIndex + delta;

            return {
                currentIndex: index,
                selection: {
                    x: 152,
                    y: 152,
                    width: 50,
                    height: 50,
                },
                currentCard: null,
            };
        });
    };

    private handlePreviewRemoveRetrieved = (remove: () => void) => {
        this.setState({
            removePreview: remove,
        });
    };
    private handleIndexedCardComplete = ({ indexedCard }: IndexedCardQuery) => {
        if (!indexedCard) {
            return;
        }

        const selection = indexedCard.cropperItem || {
            x: 152,
            y: 152,
            width: 50,
            height: 50,
        };

        this.setState({
            currentCard: indexedCard,
            imageUrls: null,
            selection,
        });
    };
    private handlePrevClick = () => {
        this.mutateIndex(-1);
    };
    private handleNextClick = () => {
        this.mutateIndex(1);
    };
    private handlePreviewClick = () => {
        const { removePreview } = this.state;
        const isPreviewActivated = this.isPreviewActivated();

        if (isPreviewActivated) {
            removePreview();
        } else {
            this.setState({
                layout: { direction: "row", first: "art", second: "preview", splitPercentage: 80 },
            });
        }
    };
    private handleSelectionChange = (selection: Rectangle) => {
        const { currentCard } = this.state;
        if (!currentCard) {
            return;
        }

        this.setState((prevState: AdminArtRouteStates) => ({
            selection,
            unsavedSelectionData: {
                ...prevState.unsavedSelectionData,
                [currentCard.id]: selection,
            },
        }));

        this.generateCroppedImage();
    };
    private handleLayoutChange = (newNode: MosaicNode<ArtCropperPaneType> | null) => {
        this.setState({
            layout: newNode,
        });
    };
    public handleIndexChange = (index: number) => {
        this.setState({
            currentIndex: index,
            selection: {
                x: 152,
                y: 152,
                width: 50,
                height: 50,
            },
            currentCard: null,
        });
    };
    public handleSaveClick = async () => {
        if (!this.props.client || !this.cardListUpdater) {
            return;
        }

        const { unsavedSelectionData } = this.state;
        const items = Object.entries(unsavedSelectionData)
            .map<CardCropperDataInput | null>(([cardId, selection]) =>
                selection ? { cardId: parseInt(cardId, 10), x: selection.x, y: selection.y, width: selection.width, height: selection.height } : null,
            )
            .filter((a: CardCropperDataInput | null): a is CardCropperDataInput => Boolean(a));

        const { data } = await this.props.client.mutate<SaveCropperDataMutation, SaveCropperDataMutationVariables>({
            mutation: SaveCropperDataDocument,
            variables: {
                inputs: items,
            },
        });

        if (!data) {
            return;
        }

        const targetCardIds = data.saveCropperData.map(item => item.cardId);
        await this.cardListUpdater.update(targetCardIds);

        this.setState({
            unsavedSelectionData: {},
        });
    };
    public handleCardListUpdater = (updater: CropperCardListUpdater) => {
        this.cardListUpdater = updater;
    };

    private renderArtPanel(__: ArtCropperPaneType, path: MosaicBranch[], loading: boolean) {
        return (
            <ArtPanel
                loading={loading}
                targetPreviewSize={{ width: 223, height: 36 }}
                path={path}
                card={this.state.currentCard}
                onChange={this.handleSelectionChange}
                selection={this.state.selection}
            />
        );
    }
    private renderCropPreviewPanel(__: ArtCropperPaneType, path: MosaicBranch[]) {
        return (
            <CropPreviewPanel
                onRemoveRetrieved={this.handlePreviewRemoveRetrieved}
                path={path}
                card={this.state.currentCard}
                imageUrls={this.state.imageUrls}
            />
        );
    }
    private renderContent = ({ loading }: IndexedCardQueryResult) => {
        const { data } = this.props;
        const { currentCard: card, currentIndex, layout } = this.state;
        if (!data || data.loading || !data.cardCount) {
            return null;
        }

        return (
            <>
                <Root>
                    <TopBar>
                        <Controls>
                            <Button onClick={this.handlePrevClick}>
                                <ArrowBack />
                            </Button>
                            <Placeholder />
                            <Tooltip title="미리보기">
                                <ToggleButton activated={this.isPreviewActivated()} onClick={this.handlePreviewClick}>
                                    <Preview />
                                </ToggleButton>
                            </Tooltip>
                            <Button onClick={this.handleNextClick}>
                                <ArrowForward />
                            </Button>
                        </Controls>
                        <Title>{card ? `[${currentIndex} / ${data.cardCount}] ${card.text.name} (${card.id})` : `로딩중...`}</Title>
                    </TopBar>
                    <Content>
                        <Mosaic<ArtCropperPaneType>
                            renderTile={(tile, path) => this.renderer[tile](tile, path, loading)}
                            onChange={this.handleLayoutChange}
                            value={layout}
                            className=""
                        />
                    </Content>
                </Root>
            </>
        );
    };
    public render() {
        const { data } = this.props;
        const { currentIndex, unsavedSelectionData } = this.state;
        const isChanged = Object.keys(unsavedSelectionData).length > 0;
        if (!data || data.loading || !data.cardCount) {
            return null;
        }

        return (
            <>
                <CropperCardList
                    unsavedSelectionData={unsavedSelectionData}
                    currentIndex={currentIndex}
                    onChange={this.handleIndexChange}
                    onUpdater={this.handleCardListUpdater}
                />
                <ThemeProvider theme={toolTheme}>
                    <IndexedCardComponent fetchPolicy="no-cache" onCompleted={this.handleIndexedCardComplete} variables={{ index: currentIndex }}>
                        {this.renderContent}
                    </IndexedCardComponent>
                    <FabContainer>
                        <Zoom in={isChanged} timeout={150} unmountOnExit>
                            <Fab color="primary" aria-label="save" onClick={this.handleSaveClick}>
                                <Save />
                            </Fab>
                        </Zoom>
                    </FabContainer>
                </ThemeProvider>
            </>
        );
    }
}

export default withCardCount<AdminArtRouteProps>({})(withApollo<AdminArtRouteProps & CardCountProps>(AdminArtRoute));
