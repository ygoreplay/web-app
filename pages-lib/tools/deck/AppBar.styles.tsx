import { IconButton as MuiIconButton, tooltipClasses } from "@mui/material";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const IconButton = styled(MuiIconButton)`
    border: 1px solid rgb(30, 71, 115);
    border-radius: 10px;

    transition: border-color 0.1s ease;

    svg {
        opacity: 0.6;
        transition: opacity 0.1s ease;
    }

    &:hover {
        border-color: #295c91;

        svg {
            opacity: 0.85;
        }
    }
`;

export const CustomTooltipStyles = css`
    .${tooltipClasses.tooltip} {
        font-size: 14px !important;
        font-weight: 300 !important;

        background-color: rgba(70, 80, 90, 0.92) !important;
    }
`;
