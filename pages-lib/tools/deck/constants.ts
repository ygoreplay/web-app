import * as Yup from "yup";

import { ChampionshipSettingsFormValues } from "@routes/tools/deck/ChampionshipSettingsForm";

export type StepId = "title" | "type" | "banList" | "options";
interface StepDefinition {
    id: StepId;
    title: string;
    description: string;
    validate(values: ChampionshipSettingsFormValues): boolean;
    onlyIf?(values: ChampionshipSettingsFormValues): boolean;
}

export const FORM_STEPS: StepDefinition[] = [
    {
        id: "title",
        title: "대회 이름 입력",
        description: "진행할 대회의 이름을 입력 해주세요. 해당 이름은 덱 제출 인원 모두에게 공개 됩니다.",
        validate(values: ChampionshipSettingsFormValues) {
            try {
                Yup.string().required("대회 이름을 입력 해주세요.").validateSync(values.title);
                return true;
            } catch {
                return false;
            }
        },
    },
    {
        id: "type",
        title: "진행 형식 선택",
        description: "대회가 진행될 형식을 선택 해주세요.",
        validate(values: ChampionshipSettingsFormValues): boolean {
            try {
                Yup.string().required("대회 진행 형식을 선택 해주세요.").validateSync(values.type);
                return true;
            } catch {
                return false;
            }
        },
    },
    {
        id: "banList",
        title: "금제 선택",
        description: "대회를 진행 할 금제를 선택 해주세요. 모든 대회 참가자는 덱 제출시 해당 금제에 맞춰 덱을 작성하게 됩니다.",
        validate(values): boolean {
            return Boolean(values.banList);
        },
    },
    {
        id: "options",
        title: "특수 룰 선택",
        description: "덱 제출시 적용할 특수 룰을 정해주세요. 대회 참가자들은 해당 특수 룰 아래에서 덱을 작성하게 됩니다.",
        validate(): boolean {
            return true;
        },
    },
];

export const CHAMPIONSHIP_FORM_VALIDATION_SCHEMA = Yup.object().shape({
    title: Yup.string().required("대회 이름을 입력 해주세요."),
    type: Yup.string().oneOf(["individual", "team"], "알 수 없는 대회 진행 형식 값 입니다.").required("대회 진행 형식 값을 입력 해주세요."),
    banList: Yup.string().required("적용 금제 항목을 선택 해주세요."),
});

export const DECK_TOOL_DRAG_DROP_TYPES = {
    CARD: "card",
    CARD_SORT: "card-sort",
};
