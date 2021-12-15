import React from "react";
import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";

import { BaseChampionshipDialogPageProps } from "@routes/championship/type";

import { Root } from "./DialogPage.styles";

export interface DialogPageProps extends Omit<BaseChampionshipDialogPageProps, "result"> {
    children: React.ReactNode;
    isValid?: boolean;
}
export interface DialogPageStates {}

export default class DialogPage extends React.Component<DialogPageProps, DialogPageStates> {
    public componentDidMount() {
        if (typeof this.props.isValid !== "undefined") {
            this.props.onValidStateChange(this.props.isValid);
        }
    }
    public componentDidUpdate(prevProps: Readonly<DialogPageProps>) {
        if (this.props.isValid !== prevProps.isValid && typeof this.props.isValid !== "undefined") {
            this.props.onValidStateChange(this.props.isValid);
        }
    }

    private handleResize = (contentRect: ContentRect) => {
        this.props.onHeightChange(contentRect);
    };

    private renderContent = ({ measureRef }: MeasuredComponentProps) => {
        const { children } = this.props;

        return <Root ref={measureRef}>{children}</Root>;
    };
    public render() {
        return (
            <Measure bounds onResize={this.handleResize}>
                {this.renderContent}
            </Measure>
        );
    }
}
