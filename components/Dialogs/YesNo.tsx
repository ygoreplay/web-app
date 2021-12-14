import React from "react";
import memoizeOne from "memoize-one";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { DialogBaseProps, DialogCloseReason } from "@dialogs/types";

export interface YesNoProps extends DialogBaseProps {
    positiveButtonLabel: string;
    negativeButtonLabel: string;
}

export default class YesNo extends React.Component<YesNoProps> {
    private handleClose = memoizeOne((reason: DialogCloseReason) => {
        return () => {
            this.props.onClose(reason);
        };
    });
    private handleDialogClose = (reason: "backdropClick" | "escapeKeyDown") => {
        this.props.onClose(reason === "escapeKeyDown" ? DialogCloseReason.EscapeKey : DialogCloseReason.OutsideClick);
    };

    public render() {
        const { open, title, content, positiveButtonLabel, negativeButtonLabel, onClosed } = this.props;

        return (
            <Dialog
                TransitionProps={{ onExited: onClosed }}
                open={open}
                onClose={this.handleDialogClose}
                aria-labelledby="yes-no-dialog-title"
                aria-describedby="yes-no-dialog-description"
            >
                {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose(DialogCloseReason.No)} autoFocus>
                        {negativeButtonLabel}
                    </Button>
                    <Button onClick={this.handleClose(DialogCloseReason.Yes)} autoFocus>
                        {positiveButtonLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
