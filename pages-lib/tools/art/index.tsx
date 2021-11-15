import React from "react";
import { Mosaic, MosaicBranch, MosaicNode, TileRenderer } from "react-mosaic-component";

import { Tooltip } from "@mui/material";
import { ArrowBack, ArrowForward, Preview } from "@mui/icons-material";

import CropPreviewPanel from "@routes/tools/art/CropPreviewPanel";
import ArtPanel from "@routes/tools/art/ArtPanel";
import CardSearchInput from "@routes/tools/art/CardSearchInput";

import { CardCountProps, IndexedCardComponent, IndexedCardQuery, withCardCount } from "@query";

import { generateClipArea, Rectangle } from "@utils/generateClipArea";
import { generateClippedImage } from "@utils/generateClippedImage";
import { noop, noopReact } from "@utils/noop";
import { CardSuggestionData } from "@utils/type";

import { Button, CardSearchInputWrapper, Content, Controls, Root, Title, ToggleButton, TopBar } from "@routes/tools/art/index.styles";

import { CROPPER_UI_PRESET_KEYS, CROPPER_UI_PRESETS, CropperUIPresetType } from "@constants/cropper";

import { Placeholder } from "@styles/Placeholder";

export interface AdminArtRouteProps extends CardCountProps {}
export interface AdminArtRouteStates {
    currentIndex: number;
    selection: Rectangle;
    currentCard: IndexedCardQuery["indexedCard"] | null;
    layout: MosaicNode<ArtCropperPaneType> | null;
    imageUrls: { [key in CropperUIPresetType]: string | null } | null;
    removePreview(): void;
}

interface ArtCropperData {
    [key: string]: Rectangle;
}
export type ArtCropperPaneType = "art" | "preview" | "attributes";

export interface PaneBaseProps {
    path: MosaicBranch[];
}

class AdminArtRoute extends React.Component<AdminArtRouteProps, AdminArtRouteStates> {
    private renderer: { [key in ArtCropperPaneType]: TileRenderer<ArtCropperPaneType> } = {
        art: this.renderArtPanel.bind(this),
        preview: this.renderCropPreviewPanel.bind(this),
        attributes: () => <></>,
    };

    public state: AdminArtRouteStates = {
        currentIndex: 0,
        selection: {
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        },
        currentCard: null,
        imageUrls: null,
        layout: { direction: "row", first: "art", second: "preview", splitPercentage: 20 },
        removePreview: noop,
    };

    public componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown, false);
    }
    public componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown, false);
    }

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

    private getSavedData = (): ArtCropperData => {
        const savedData = localStorage.getItem("art-cropper");
        if (!savedData) {
            localStorage.setItem("art-cropper", JSON.stringify({}));
            return {};
        }

        return JSON.parse(savedData);
    };
    private saveData = (data: ArtCropperData) => {
        localStorage.setItem("art-cropper", JSON.stringify(data));
    };
    private saveCurrentSelection = (card: Exclude<IndexedCardQuery["indexedCard"], null | undefined>, selection: Rectangle) => {
        const savedData = this.getSavedData();
        savedData[card.id.toString()] = {
            ...selection,
        };

        this.saveData(savedData);
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
                    x: 0,
                    y: 0,
                    width: 50,
                    height: 50,
                },
                currentCard: null,
            };
        });
    };

    private handleKeyDown = (e: KeyboardEvent) => {
        console.info(e.key);

        if (e.key === "ArrowRight") {
            this.setState((prevState: AdminArtRouteStates) => ({
                currentIndex: prevState.currentIndex + 1,
            }));
        } else if (e.key === "ArrowLeft") {
            this.setState((prevState: AdminArtRouteStates) => ({
                currentIndex: prevState.currentIndex - 1,
            }));
        }
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

        const key = indexedCard.id.toString();
        const currentData = this.getSavedData();
        const selection = currentData[key] || {
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        };

        this.setState(
            {
                currentCard: indexedCard,
                imageUrls: null,
                selection,
            },
            () => {
                if (key in currentData) {
                    this.generateCroppedImage();
                }
            },
        );
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

        this.setState({
            selection,
        });

        this.generateCroppedImage();
        this.saveCurrentSelection(currentCard, selection);
    };
    private handleLayoutChange = (newNode: MosaicNode<ArtCropperPaneType> | null) => {
        this.setState({
            layout: newNode,
        });
    };
    public handleCardSearchSubmit = (item: CardSuggestionData) => {
        this.setState({
            currentIndex: item.index,
            selection: {
                x: 0,
                y: 0,
                width: 50,
                height: 50,
            },
            currentCard: null,
        });
    };

    private renderArtPanel(__: ArtCropperPaneType, path: MosaicBranch[]) {
        return (
            <ArtPanel
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
    private renderContent = () => {
        const { data } = this.props;
        const { currentCard: card, currentIndex, layout } = this.state;
        if (!data || data.loading || !data.cardCount) {
            return null;
        }

        return (
            <Root>
                <TopBar>
                    <Controls>
                        <Button onClick={this.handlePrevClick}>
                            <ArrowBack />
                        </Button>
                        <Placeholder />
                        <CardSearchInputWrapper>
                            <CardSearchInput onSubmit={this.handleCardSearchSubmit} />
                        </CardSearchInputWrapper>
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
                        renderTile={(tile, path) => this.renderer[tile](tile, path)}
                        onChange={this.handleLayoutChange}
                        value={layout}
                        className=""
                    />
                </Content>
            </Root>
        );
    };
    public render() {
        const { data } = this.props;
        const { currentIndex } = this.state;
        if (!data || data.loading || !data.cardCount) {
            return null;
        }

        return (
            <>
                <IndexedCardComponent onCompleted={this.handleIndexedCardComplete} variables={{ index: currentIndex }}>
                    {noopReact}
                </IndexedCardComponent>
                {this.renderContent()}
            </>
        );
    }
}

export default withCardCount({})(AdminArtRoute);
