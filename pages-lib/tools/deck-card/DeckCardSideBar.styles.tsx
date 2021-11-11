import styled from "@emotion/styled";
import { generateDeckCardSideBarIndicatorStyles } from "@styles/generateDeckCardSideBarIndicatorStyles";

export const Root = styled.div`
    width: 280px;

    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    overflow-y: auto;

    z-index: 5000;
`;

export const Item = styled.button<{ activated: boolean; changed: boolean; registered: boolean }>`
    width: 100%;

    margin: 0;
    padding: ${({ theme, activated }) => theme.spacing(1.5, 1.5, 1.5, activated ? 5 : 1.5)};
    border: 0;
    border-bottom: 1px solid #ccc;

    display: flex;

    position: relative;

    font-size: 1rem;
    text-align: left;

    background: transparent;
    cursor: pointer;

    transition: background 0.15s ease, padding-left 0.15s ease;

    > svg {
        display: block;

        position: absolute;
        top: 50%;
        left: ${({ theme }) => theme.spacing(1.5)};

        transform: translateY(-50%);
        opacity: ${({ activated }) => (activated ? 0.5 : 0)};

        transition: opacity 0.15s ease;
    }

    &:last-of-type {
        border-bottom: 0;
    }

    &:hover {
        padding-left: ${({ theme, activated }) => theme.spacing(activated ? 5 : 2.5)};
        background: rgba(0, 0, 0, 0.085);
    }

    &:before {
        content: "";

        width: 6px;
        height: 6px;

        border-radius: 100%;

        position: absolute;
        top: 50%;
        right: ${({ theme }) => theme.spacing(2)};

        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.15s ease;
    }

    ${({ changed, registered }) => generateDeckCardSideBarIndicatorStyles(changed, registered)}
`;
