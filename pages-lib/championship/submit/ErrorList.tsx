import React from "react";

import { Alert } from "@mui/material";

import { Root, ErrorListItem } from "@routes/championship/submit/ErrorList.styles";

export interface ErrorListProps {
    errors: string[];
}
export interface ErrorListStates {}

export default class ErrorList extends React.Component<ErrorListProps, ErrorListStates> {
    private renderError = (error: string, index: number) => {
        return (
            <ErrorListItem>
                <Alert key={index} variant="filled" severity="error">
                    {error}
                </Alert>
            </ErrorListItem>
        );
    };
    public render() {
        const { errors } = this.props;

        return <Root>{errors.map(this.renderError)}</Root>;
    }
}
