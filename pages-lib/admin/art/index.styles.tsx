import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const Root = styled.div`
    margin: 0;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;

    background: #282828;
`;

export const Controls = styled.div`
    border-bottom: 1px solid #595959;

    display: flex;
    align-items: center;

    color: white;
`;

export const Content = styled.div`
    flex: 1 1 auto;

    .mosaic-root {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .mosaic-tile {
        margin: 0;
    }

    .mosaic-window-toolbar {
        display: flex;

        background: #424242;
    }

    .mosaic-window-title {
        padding: ${({ theme }) => theme.spacing(1)};

        flex: 0 0 auto;

        font-size: 14px;

        color: white;
        background: #535353;
    }

    .mosaic-window-body {
        background: #282828;
    }

    .mosaic-split.-row {
        background: black;
    }
`;

export const TopBar = styled.div`
    color: white;
    background: #777;
`;

export const Title = styled.div`
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-bottom: 1px solid #383838;

    text-align: center;

    background: #434343;
`;

export const Button = styled.button`
    width: ${({ theme }) => theme.spacing(6)};
    height: ${({ theme }) => theme.spacing(6)};

    margin: 0;
    padding: 0;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    background: transparent;
    transition: background-color 0.1s ease;

    cursor: pointer;

    &:first-of-type {
        border-right: 1px solid #595959;
    }

    &:not(:first-of-type) {
        border-left: 1px solid #595959;
    }

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    &:active {
        background: rgba(0, 0, 0, 0.2);
    }
`;

export const ToggleButton = styled(IconButton)`
    width: ${({ theme }) => theme.spacing(5)};
    height: ${({ theme }) => theme.spacing(5)};

    margin-right: ${({ theme }) => theme.spacing(1)};

    color: rgb(175, 175, 175);
`;
