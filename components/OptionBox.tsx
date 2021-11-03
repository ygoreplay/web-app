import React from "react";

import { Content, Root, Title } from "@components/OptionBox.styles";

export interface OptionBoxProps {
    title: string;
    children: React.ReactNode;
}
export interface OptionBoxStates {}

export default class OptionBox extends React.Component<OptionBoxProps, OptionBoxStates> {
    public render() {
        const { children, title } = this.props;

        return (
            <Root>
                <Title>{title}</Title>
                <Content>{children}</Content>
            </Root>
        );
    }
}
