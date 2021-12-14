/* eslint-disable no-shadow */
import React from "react";
import { DialogComponentMap } from "@dialogs/constants";

export enum DialogType {
    Alert = "alert",
    YesNo = "yes-no",
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

type PickDistributed<T> = T extends React.ComponentType<infer K> ? Omit<K, keyof DialogBaseProps> : never;

export interface DialogItem {
    type: DialogType;
    title?: string;
    content: string;
    closing: boolean;

    additionalProps: PickDistributed<typeof DialogComponentMap[keyof typeof DialogComponentMap]>;

    resolve(dialogResult: DialogResult): void;
}
