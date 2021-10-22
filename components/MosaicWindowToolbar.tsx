import React from "react";
import { MosaicWindowProps } from "react-mosaic-component";
import { MosaicKey } from "react-mosaic-component/src/types";

import { Root, Title } from "@components/MosaicWindowToolbar.styles";

export interface MosaicWindowToolbarProps<T extends MosaicKey> extends MosaicWindowProps<T> {}
export interface MosaicWindowToolbarStates {}

export default class MosaicWindowToolbar<T extends MosaicKey> extends React.Component<MosaicWindowToolbarProps<T>, MosaicWindowToolbarStates> {
    public render() {
        return (
            <Root>
                <Title>{this.props.title}</Title>
            </Root>
        );
    }
}
