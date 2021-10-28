import React from "react";
import { Mosaic, TileRenderer, MosaicBranch, MosaicNode } from "react-mosaic-component";

import { Tooltip } from "@mui/material";
import { ArrowBack, ArrowForward, Flip, Preview } from "@mui/icons-material";

import CropPreviewPanel from "@routes/admin/art/CropPreviewPanel";
import ArtPanel from "@routes/admin/art/ArtPanel";

import { CardCountProps, IndexedCardComponent, IndexedCardQuery, withCardCount } from "@query";

import { generateClipArea, Rectangle } from "@utils/generateClipArea";
import { generateClippedImage } from "@utils/generateClippedImage";
import { noop } from "@utils/noop";

import { Button, Content, Controls, Root, Title, ToggleButton, TopBar } from "@routes/admin/art/index.styles";
import { Placeholder } from "@styles/Placeholder";

export interface AdminArtRouteProps extends CardCountProps {}
export interface AdminArtRouteStates {
    currentIndex: number;
    selection: Rectangle;
    currentCard: IndexedCardQuery["indexedCard"] | null;
    preview: boolean;
    layout: MosaicNode<ArtCropperPaneType> | null;
    imageUrl: string | null;
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
            width: 304,
            height: 304,
        },
        currentCard: null,
        preview: false,
        imageUrl: null,
        layout: { direction: "row", first: "art", second: "preview", splitPercentage: 80 },
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

    private generateArea = async () => {
        const { currentCard, selection } = this.state;
        if (!currentCard) {
            return;
        }

        const clipArea = generateClipArea(
            selection,
            {
                width: 223,
                height: 36,
                anchor: {
                    x: 207,
                    y: 19,
                },
                threshold: {
                    width: 0.9,
                },
            },
            304,
        );
        const imageUrl = await generateClippedImage(`https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/304x304/${currentCard.id}.jpg`, clipArea, {
            width: 223,
            height: 36,
            anchor: {
                x: 207,
                y: 19,
            },
        });

        this.setState({
            imageUrl,
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
                    width: 304,
                    height: 304,
                },
                currentCard: null,
            };
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
            width: 304,
            height: 304,
        };

        this.setState(
            {
                currentCard: indexedCard,
                imageUrl: null,
                selection,
            },
            () => {
                if (key in currentData) {
                    this.generateArea();
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
        this.setState((prevState: AdminArtRouteStates) => ({
            preview: !prevState.preview,
        }));
    };
    private handleSelectionChange = (selection: Rectangle) => {
        const { currentCard } = this.state;
        if (!currentCard) {
            return;
        }

        this.setState({
            selection,
        });

        this.generateArea();

        const savedData = this.getSavedData();
        savedData[currentCard.id.toString()] = selection;

        this.saveData(savedData);
    };
    private handleLayoutChange = (newNode: MosaicNode<ArtCropperPaneType> | null) => {
        this.setState({
            layout: newNode,
        });
    };

    private renderArtPanel(_: ArtCropperPaneType, path: MosaicBranch[]) {
        return <ArtPanel path={path} card={this.state.currentCard} onChange={this.handleSelectionChange} selection={this.state.selection} />;
    }
    private renderCropPreviewPanel(_: ArtCropperPaneType, path: MosaicBranch[]) {
        return <CropPreviewPanel path={path} card={this.state.currentCard} imageUrl={this.state.imageUrl} />;
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
                        <Tooltip title="미리보기">
                            <ToggleButton onClick={this.handlePreviewClick}>
                                <Preview />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip title="X축 반전">
                            <ToggleButton>
                                <Flip />
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
                    {noop}
                </IndexedCardComponent>
                {this.renderContent()}
            </>
        );
    }
}

export default withCardCount({})(AdminArtRoute);
