import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Typography } from "@mui/material";

export const Root = styled.div`
    height: 100%;

    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};

    display: flex;
    align-items: center;
    justify-content: center;
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

export const Dialog = styled.div`
    width: 100%;
    max-width: 480px;

    border-radius: 4px;

    background: white;
    box-shadow: rgb(23 25 29 / 15%) 0 6px 35px;
`;

export const Header = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

export const Title = styled(Typography)`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

export const Content = styled.div`
    width: 100%;

    position: relative;
`;

export const Footer = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
    border-top: 1px solid rgba(0, 0, 0, 0.15);

    display: flex;
`;

export const Progress = styled.div`
    height: 2px;

    position: absolute;
    top: 0;
    left: 0;

    background: ${({ theme }) => theme.palette.primary.main};

    transition: width 0.2s ease;
`;
