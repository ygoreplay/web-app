import React from "react";

import { ChampionshipCreationValues } from "@routes/championship/type";
import { ChampionshipType } from "queries/index";

export interface ChampionshipCreationProviderProps {
    banLists: string[];
    children: React.ReactNode;
}
export interface ChampionshipCreationProviderStates {
    creationValues: ChampionshipCreationValues;
}
export interface ChampionshipCreationProviderValues {
    banLists: string[];
    creationValues: ChampionshipCreationValues | null;
    setValue<T extends keyof ChampionshipCreationValues>(fieldName: T, value: ChampionshipCreationValues[T]): void;
}

const ChampionshipCreationContext = React.createContext<ChampionshipCreationProviderValues>({
    banLists: [],
    creationValues: null,
    setValue() {},
});

export default class ChampionshipCreationProvider extends React.Component<ChampionshipCreationProviderProps, ChampionshipCreationProviderStates> {
    public state: ChampionshipCreationProviderStates = {
        creationValues: {
            championshipName: "",
            banList: "",
            shareBanList: false,
            shareCardCount: false,
            type: ChampionshipType.Individual,
        },
    };

    private setValue = <T extends keyof ChampionshipCreationValues>(fieldName: T, value: ChampionshipCreationValues[T]) => {
        this.setState((prevState: ChampionshipCreationProviderStates) => ({
            creationValues: {
                ...prevState.creationValues,
                [fieldName]: value,
            },
        }));
    };

    public render() {
        const { banLists, children } = this.props;
        const { creationValues } = this.state;

        return (
            <ChampionshipCreationContext.Provider value={{ banLists, creationValues, setValue: this.setValue }}>
                {children}
            </ChampionshipCreationContext.Provider>
        );
    }
}

export const useChampionshipCreationData = () => React.useContext(ChampionshipCreationContext);
