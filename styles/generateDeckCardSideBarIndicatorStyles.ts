import { css } from "@emotion/react";

export function generateDeckCardSideBarIndicatorStyles(changed: boolean, registered: boolean) {
    let targetColor = "transparent";
    if (changed) {
        targetColor = "orange";
    } else if (registered) {
        targetColor = "limegreen";
    }

    return css`
        &:before {
            opacity: 1;
            background: ${targetColor};
        }
    `;
}
