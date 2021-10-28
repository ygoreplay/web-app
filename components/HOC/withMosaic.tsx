import React from "react";
import { MosaicContext, MosaicPath } from "react-mosaic-component";
import { MosaicKey } from "react-mosaic-component/src/types";

import { Diff } from "utility-types";

// These props will be injected into the base component
export interface WithMosaicProps<T extends MosaicKey> extends MosaicContext<T> {}

export const withMosaic = <T extends MosaicKey, BaseProps extends WithMosaicProps<T>>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithMosaicProps<T>> & {
        onRemoveRetrieved(callback: () => void): void;
        path: MosaicPath;
    };

    function Hoc({ onRemoveRetrieved, ...restProps }: HocProps) {
        const data = React.useContext(MosaicContext);

        React.useEffect(() => {
            onRemoveRetrieved(() => {
                data.mosaicActions.remove(restProps.path);
            });
        }, [data.mosaicActions]);

        return <BaseComponent {...(restProps as any as BaseProps)} {...data} />;
    }

    Hoc.displayName = `withMosaic(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
