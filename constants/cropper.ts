import { Container } from "@utils/generateClipArea";

export type CropperUIPresetType = "deck-list-item" | "card-usage-list-item";

export const CROPPER_UI_PRESETS: { [key in CropperUIPresetType]: Container } = {
    "deck-list-item": {
        width: 223,
        height: 36,
        anchor: {
            x: 207,
            y: 19,
        },
        threshold: {
            width: 0.9,
        },
    },
    "card-usage-list-item": {
        width: 300,
        height: 48,
        anchor: {
            x: 250,
            y: 24,
        },
        threshold: {
            width: 0.9,
        },
    },
};

export const CROPPER_UI_PRESET_KEYS = Object.keys(CROPPER_UI_PRESETS) as CropperUIPresetType[];
