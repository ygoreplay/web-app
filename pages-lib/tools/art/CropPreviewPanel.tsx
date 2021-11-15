import React from "react";

import { MosaicWindow, MosaicWindowProps } from "react-mosaic-component";

import { ArtCropperPaneType, PaneBaseProps } from "@routes/tools/art";

import MatchListItem from "@components/MatchList/Item";
import MosaicWindowToolbar from "@components/MosaicWindowToolbar";
import DeckRecipeListItem from "@components/DeckRecipe/ListItem";
import { withMosaic, WithMosaicProps } from "@components/HOC/withMosaic";
import CardUsage from "@components/CardUsage";

import { Container, Root } from "@routes/tools/art/CropPreviewPanel.styles";

import { CardType, IndexedCardQuery, MonsterCardType } from "@query";

import { CROPPER_PREVIEW_MATCH_LIST_ITEM, CropperUIPresetType } from "@constants/cropper";

export interface CropPreviewPanelProps extends PaneBaseProps, WithMosaicProps<ArtCropperPaneType> {
    card: IndexedCardQuery["indexedCard"] | null;
    imageUrls: { [key in CropperUIPresetType]: string | null } | null;
}
export interface CropPreviewPanelStates {}

class CropPreviewPanel extends React.Component<CropPreviewPanelProps, CropPreviewPanelStates> {
    private renderToolBar = (props: MosaicWindowProps<ArtCropperPaneType>) => {
        return <MosaicWindowToolbar {...props} />;
    };

    public render() {
        const { path, card, imageUrls } = this.props;

        return (
            <MosaicWindow<ArtCropperPaneType> title="미리보기" path={path} draggable={false} renderToolbar={this.renderToolBar}>
                <Root>
                    {card && imageUrls && (
                        <>
                            {imageUrls["deck-list-item"] && (
                                <Container style={{ width: 250 }}>
                                    <DeckRecipeListItem
                                        image={imageUrls["deck-list-item"]}
                                        card={{
                                            id: card.id,
                                            type: CardType.Monster,
                                            monsterType: [MonsterCardType.Normal],
                                            text: card.text,
                                        }}
                                        count={1}
                                    />
                                </Container>
                            )}
                            {imageUrls["card-usage-list-item"] && (
                                <Container style={{ width: 372 }}>
                                    <CardUsage usages={[{ card: { id: card.id, text: card.text }, count: 1, image: imageUrls["card-usage-list-item"] }]} />
                                </Container>
                            )}
                            {imageUrls["match-list-item"] && (
                                <Container style={{ width: 900 }}>
                                    <MatchListItem imageUrl={imageUrls["match-list-item"]} match={CROPPER_PREVIEW_MATCH_LIST_ITEM} />
                                </Container>
                            )}
                        </>
                    )}
                </Root>
            </MosaicWindow>
        );
    }
}

export default withMosaic<ArtCropperPaneType, CropPreviewPanelProps>(CropPreviewPanel);
