import React from "react";
import { Diff } from "utility-types";

import { DeckEditorContextValues, useDeckEditor } from "@routes/tools/deck/Context";

// These props will be injected into the base component
export interface WithDeckEditorProps extends DeckEditorContextValues {}

export const withDeckEditor = <BaseProps extends WithDeckEditorProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithDeckEditorProps>;

    function Hoc({ ...restProps }: HocProps) {
        const deckEditorContext = useDeckEditor();

        return <BaseComponent {...(restProps as BaseProps)} {...deckEditorContext} />;
    }

    Hoc.displayName = `withDeckEditor(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
