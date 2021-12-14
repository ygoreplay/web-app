import { DialogType } from "@dialogs/types";

import Alert from "@dialogs/Alert";
import YesNo from "@dialogs/YesNo";

export const DialogComponentMap = {
    [DialogType.Alert]: Alert,
    [DialogType.YesNo]: YesNo,
};
