import React from "react";
import { Diff } from "utility-types";
import { ChampionshipCreationProviderValues, useChampionshipCreationData } from "@routes/championship/ChampionshipCreationProvider";

// These props will be injected into the base component
export interface WithChampionshipCreationDataProps extends ChampionshipCreationProviderValues {}

export const withChampionshipCreationData = <BaseProps extends WithChampionshipCreationDataProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithChampionshipCreationDataProps>;

    function Hoc({ ...restProps }: HocProps) {
        const data = useChampionshipCreationData();

        return <BaseComponent {...(restProps as BaseProps)} {...data} />;
    }

    Hoc.displayName = `withChampionshipCreationData(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
