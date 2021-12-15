import { ContentRect } from "react-measure";
import React from "react";
import { ChampionshipType } from "@query";
import { CreateChampionshipResult } from "@utils/type";

export interface BaseChampionshipDialogPageProps {
    onValidStateChange(isValid: boolean): void;
    onHeightChange(contentRect: ContentRect): void;
    index: number;
    activated: boolean;
    result: CreateChampionshipResult | null;
}

export interface ChampionshipCreationValues {
    type: ChampionshipType;
    championshipName: string;
    banList: string;
    shareCardCount: boolean;
    shareBanList: boolean;
}

export interface ChampionshipCreationPageDefinition {
    component: React.ComponentType<BaseChampionshipDialogPageProps>;
    submitButtonName?: string;
    titleName?: string;
    submit?: boolean;
    complete?: boolean;
}
