import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2, 0)};

    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const Section = styled.div<{ padding?: boolean }>`
    padding: ${({ theme, padding }) => theme.spacing(padding ? 2 : 0)};
    border-radius: 4px;

    background: white;
    box-shadow: rgb(23 25 29 / 5%) 0px 6px 25px;

    &:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
`;

export const Content = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
`;

export const Header = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

export const Footer = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
    border-top: 1px solid rgba(0, 0, 0, 0.15);

    display: flex;

    > button {
        margin-right: ${({ theme }) => theme.spacing(1)};
    }
`;

export const TeamNameInput = styled.input`
    width: 100%;

    margin: 0 ${({ theme }) => theme.spacing(2)} 0 0;
    padding: ${({ theme }) => theme.spacing(2)};
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    display: block;
    box-sizing: border-box;

    font-size: 18px;

    outline: none;
`;

export const GlobalStyles = css`
    html,
    body,
    #__next {
        height: 100%;
    }

    body {
        background: rgb(242, 243, 246);
    }
`;

export const SectionTitle = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid #ccc;
`;
