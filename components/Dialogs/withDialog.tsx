import React from "react";
import { Diff } from "utility-types";

import { useDialog } from "@components/Dialogs/Provider";
import { DialogContextValues } from "@components/Dialogs/types";

// These props will be injected into the base component
export interface WithDialogProps extends DialogContextValues {}

export const withDialog = <BaseProps extends WithDialogProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithDialogProps>;

    function Hoc({ ...restProps }: HocProps) {
        const contextValue = useDialog();

        return <BaseComponent {...(restProps as BaseProps)} {...contextValue} />;
    }

    Hoc.displayName = `withDialog(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
