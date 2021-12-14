/* eslint-disable no-shadow */
import React from "react";
import { DialogComponentMap } from "@dialogs/constants";

export enum DialogType {
    Alert = "alert",
}

export enum DialogCloseReason {
    Yes,
    No,
    Retry,
    OutsideClick,
    EscapeKey,
}

export interface DialogResult {
    reason: DialogCloseReason;
}

export interface DialogBaseProps {
    title?: string;
    content: string;
    open: boolean;
    onClose(reason: DialogCloseReason): void;
    onClosed(): void;
}

export interface DialogContextValues {
    showDialog?<T extends DialogType>(
        type: T,
        content: string,
        additionalProps: Omit<React.ComponentProps<typeof DialogComponentMap[T]>, keyof DialogBaseProps> & { title?: string },
    ): Promise<DialogResult>;
}

export interface DialogItem {
    type: DialogType;
    title?: string;
    content: string;
    closing: boolean;

    additionalProps: Omit<React.ComponentProps<typeof DialogComponentMap[DialogType]>, keyof DialogBaseProps>;

    resolve(dialogResult: DialogResult): void;
}
