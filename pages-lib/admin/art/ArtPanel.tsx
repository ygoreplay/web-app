import React from "react";
import { DraggableData, HandleStyles, Rnd, RndResizeCallback } from "react-rnd";
import { MosaicWindow, MosaicWindowProps } from "react-mosaic-component";

import { Skeleton } from "@mui/material";

import { ArtCropperPaneType, PaneBaseProps } from "@routes/admin/art";

import MosaicWindowToolbar from "@components/MosaicWindowToolbar";
import ResizeHandle from "@components/ResizeHandle";

import { Canvas, Fill, Root } from "@routes/admin/art/ArtPanel.styles";

import { Rectangle } from "@utils/generateClipArea";

import { IndexedCardQuery } from "@query";

export interface ArtPanelProps extends PaneBaseProps {
    card: IndexedCardQuery["indexedCard"] | null;
    selection: Rectangle;
    onChange(selection: Rectangle): void;
}
export interface ArtPanelStates {}

const HANDLE_STYLES: HandleStyles = {
    top: { width: 6, height: 6, top: -3, left: "50%", transform: "translateX(-3px)" },
    left: { width: 6, height: 6, top: "50%", left: -3, transform: "translateY(-3px)" },
    right: { width: 6, height: 6, top: "50%", right: -3, transform: "translateY(-3px)" },
    bottom: { width: 6, height: 6, bottom: -3, left: "50%", transform: "translateX(-3px)" },
    topLeft: { width: 6, height: 6, top: -3, left: -3 },
    topRight: { width: 6, height: 6, top: -3, right: -3 },
    bottomLeft: { width: 6, height: 6, bottom: -3, left: -3 },
    bottomRight: { width: 6, height: 6, bottom: -3, right: -3 },
};

export default class ArtPanel extends React.Component<ArtPanelProps, ArtPanelStates> {
    private handleDragStop = (_: any, data: DraggableData) => {
        this.props.onChange({
            ...this.props.selection,
            x: data.x,
            y: data.y,
        });
    };
    private handleResizeStop: RndResizeCallback = (_: any, dir, elementRef, delta, position) => {
        this.props.onChange({
            ...this.props.selection,
            width: elementRef.offsetWidth,
            height: elementRef.offsetHeight,
            ...position,
        });
    };

    private renderToolBar = (props: MosaicWindowProps<ArtCropperPaneType>) => {
        return <MosaicWindowToolbar {...props} />;
    };

    public render() {
        const { path, card, selection } = this.props;

        return (
            <MosaicWindow<ArtCropperPaneType> title="작업 영역" path={path} draggable={false} renderToolbar={this.renderToolBar}>
                <Root>
                    <Canvas
                        style={{ backgroundImage: card ? `url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/304x304/${card.id}.jpg)` : undefined }}
                    >
                        {!card && <Skeleton variant="rectangular" height={304} width={304} />}
                        {card && (
                            <Rnd
                                bounds="parent"
                                size={selection}
                                position={selection}
                                height={selection}
                                maxWidth={304}
                                maxHeight={304}
                                onResizeStop={this.handleResizeStop}
                                onDragStop={this.handleDragStop}
                                resizeHandleStyles={HANDLE_STYLES}
                                resizeHandleComponent={{
                                    top: <ResizeHandle />,
                                    left: <ResizeHandle />,
                                    right: <ResizeHandle />,
                                    bottom: <ResizeHandle />,
                                    topLeft: <ResizeHandle />,
                                    topRight: <ResizeHandle />,
                                    bottomLeft: <ResizeHandle />,
                                    bottomRight: <ResizeHandle />,
                                }}
                            >
                                <Fill />
                            </Rnd>
                        )}
                    </Canvas>
                </Root>
            </MosaicWindow>
        );
    }
}
