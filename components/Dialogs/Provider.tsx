import React from "react";

import { DialogBaseProps, DialogCloseReason, DialogContextValues, DialogItem, DialogResult, DialogType } from "@dialogs/types";
import { DialogComponentMap } from "@dialogs/constants";

export interface DialogProviderProps {
    children: React.ReactNode;
}
export interface DialogProviderStates {
    dialogQueue: DialogItem[];
}

const DialogContext = React.createContext<DialogContextValues>({});

export default class DialogProvider extends React.Component<DialogProviderProps, DialogProviderStates> {
    public state: DialogProviderStates = {
        dialogQueue: [],
    };
    private contextValue: DialogContextValues = {
        showDialog: this.showDialog.bind(this),
    };

    private handleClose = (reason: DialogCloseReason) => {
        const {
            dialogQueue: [currentDialog],
        } = this.state;

        currentDialog.resolve({
            reason,
        });

        this.setState((prevState: DialogProviderStates) => ({
            dialogQueue: prevState.dialogQueue.map((item, index) =>
                !index
                    ? {
                          ...item,
                          closing: true,
                      }
                    : item,
            ),
        }));
    };
    private handleClosed = () => {
        this.setState((prevState: DialogProviderStates) => ({
            dialogQueue: prevState.dialogQueue.slice(1),
        }));
    };

    private showDialog<T extends DialogType>(
        type: T,
        content: string,
        { title, ...additionalProps }: Omit<React.ComponentProps<typeof DialogComponentMap[T]>, keyof DialogBaseProps> & { title?: string },
    ): Promise<DialogResult> {
        return new Promise<DialogResult>(res => {
            this.setState((prevStates: DialogProviderStates) => ({
                dialogQueue: [
                    ...prevStates.dialogQueue,
                    {
                        type,
                        content,
                        title,
                        closing: false,
                        resolve: res,
                        additionalProps,
                    },
                ],
            }));
        });
    }

    public renderDialog = (dialog: DialogItem) => {
        const Component = DialogComponentMap[dialog.type];

        return (
            <Component
                title={dialog.title}
                open={!dialog.closing}
                content={dialog.content}
                onClose={this.handleClose}
                onClosed={this.handleClosed}
                {...(dialog.additionalProps as any)}
            />
        );
    };
    public render() {
        const { children } = this.props;
        const { dialogQueue } = this.state;

        return (
            <DialogContext.Provider value={this.contextValue}>
                {children}
                {dialogQueue.length > 0 && this.renderDialog(dialogQueue[0])}
            </DialogContext.Provider>
        );
    }
}

export function useDialog() {
    return React.useContext(DialogContext);
}
