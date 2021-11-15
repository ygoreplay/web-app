import { Container } from "@utils/generateClipArea";
import { Match } from "@utils/type";
import { MatchType } from "queries/index";

export type CropperUIPresetType = "deck-list-item" | "card-usage-list-item" | "match-list-item";

export const CROPPER_UI_PRESETS: { [key in CropperUIPresetType]: Container } = {
    "deck-list-item": {
        width: 224,
        height: 36,
        anchor: {
            x: 180,
            y: 18,
        },
    },
    "card-usage-list-item": {
        width: 300,
        height: 48,
        anchor: {
            x: 250,
            y: 24,
        },
    },
    "match-list-item": {
        width: 200,
        height: 56,
        anchor: {
            x: 50,
            y: 28,
        },
    },
};

export const CROPPER_UI_PRESET_KEYS = Object.keys(CROPPER_UI_PRESETS) as CropperUIPresetType[];

export const CROPPER_PREVIEW_MATCH_LIST_ITEM: Match = {
    id: -1,
    type: MatchType.Athletic,
    home: {
        deck: { id: -1, main: [], extra: [], side: [], recognizedName: "테스트 덱", recognizedDeckTags: [], recognizedTags: [] },
        player: { id: 1, name: "테스트 플레이어" },
    },
    away: {
        deck: { id: -1, main: [], extra: [], side: [], recognizedName: "테스트 덱", recognizedDeckTags: [], recognizedTags: [] },
        player: { id: -1, name: "테스트 플레이어" },
    },
    finishedAt: "",
    startedAt: "",
    winner: {
        id: -1,
    },
};
