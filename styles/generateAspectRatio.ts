import { css } from "@emotion/react";

export function generateAspectRatio(width: number, height: number) {
    return css`
        position: relative;
        &:before {
            display: block;
            content: "";
            width: 100%;
            padding-top: ${(height / width) * 100}%;
        }
        > .content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    `;
}
