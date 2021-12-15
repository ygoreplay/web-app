import React from "react";
import { BaseChampionshipDialogPageProps, ChampionshipCreationPageDefinition } from "@routes/championship/type";
import WelcomePage from "@routes/championship/WelcomePage";
import TitlePage from "@routes/championship/TitlePage";
import BanListPage from "@routes/championship/BanListPage";
import RulePage from "@routes/championship/RulePage";
import TypePage from "@routes/championship/TypePage";
import CompletePage from "@routes/championship/CompletePage";

export const CHAMPIONSHIP_CREATION_PAGES: Array<React.ComponentType<BaseChampionshipDialogPageProps> | ChampionshipCreationPageDefinition> = [
    WelcomePage,
    {
        component: TitlePage,
        titleName: "대회명 설정",
    },
    {
        component: TypePage,
        titleName: "진행 형식 설정",
    },
    {
        component: BanListPage,
        titleName: "금제 지정",
    },
    {
        component: RulePage,
        titleName: "특수 룰 설정",
        submitButtonName: "개최",
        submit: true,
    },
    {
        component: CompletePage,
        titleName: "대회 개최 완료",
        complete: true,
    },
];
