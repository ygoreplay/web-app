import React from "react";
import { css, Global } from "@emotion/react";

const styles = css`
    html,
    body {
        height: 100%;

        margin: 0;
        padding: 0;
    }

    #__next {
        height: 100%;
    }
`;

export default function FullHeight() {
    return <Global styles={styles} />;
}
