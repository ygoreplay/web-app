import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Root = styled.div`
    height: 100%;

    margin: 0;
    padding: ${({ theme }) => theme.spacing(4)};

    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const Section = styled.div`
    border-radius: 4px;

    background: white;
    box-shadow: rgb(23 25 29 / 5%) 0px 6px 25px;
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
