import React from "react";
import memoizeOne from "memoize-one";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { DialogBaseProps, DialogCloseReason } from "@components/Dialogs/types";

export interface AlertProps extends DialogBaseProps {
    positiveButtonLabel: string;
}

export default class Alert extends React.Component<AlertProps> {
    private handleClose = memoizeOne((reason: DialogCloseReason) => {
        return () => {
            this.props.onClose(reason);
        };
    });
    private handleDialogClose = (reason: "backdropClick" | "escapeKeyDown") => {
        this.props.onClose(reason === "escapeKeyDown" ? DialogCloseReason.EscapeKey : DialogCloseReason.OutsideClick);
    };

    public render() {
        const { open, title, content, positiveButtonLabel } = this.props;

        return (
            <Dialog open={open} onClose={this.handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose(DialogCloseReason.Yes)} autoFocus>
                        {positiveButtonLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
