import React from "react";

import { MosaicWindow, MosaicWindowProps } from "react-mosaic-component";

import { ArtCropperPaneType, PaneBaseProps } from "@routes/admin/art";

import MosaicWindowToolbar from "@components/MosaicWindowToolbar";
import DeckRecipeListItem from "@components/DeckRecipe/ListItem";

import { Root } from "@routes/admin/art/CropPreviewPanel.styles";

import { CardType, IndexedCardQuery, MonsterCardType } from "@query";

export interface CropPreviewPanelProps extends PaneBaseProps {
    card: IndexedCardQuery["indexedCard"] | null;
    imageUrl: string | null;
}
export interface CropPreviewPanelStates {}

export default class CropPreviewPanel extends React.Component<CropPreviewPanelProps, CropPreviewPanelStates> {
    private renderToolBar = (props: MosaicWindowProps<ArtCropperPaneType>) => {
        return <MosaicWindowToolbar {...props} />;
    };

    public render() {
        const { path, card, imageUrl } = this.props;

        return (
            <MosaicWindow<ArtCropperPaneType> title="미리보기" path={path} draggable={false} renderToolbar={this.renderToolBar}>
                <Root>
                    <div style={{ width: 250 }}>
                        {card && (
                            <DeckRecipeListItem
                                image={imageUrl}
                                card={{ id: card.id, type: CardType.Monster, monsterType: [MonsterCardType.Normal], text: card.text }}
                                count={1}
                            />
                        )}
                    </div>
                </Root>
            </MosaicWindow>
        );
    }
}
