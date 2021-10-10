import { AppBar as MuiAppBar } from "@mui/material";

import styled from "@emotion/styled";

import SvgLogo from "@res/logo.svg";

export const AppBar = styled(MuiAppBar)`
    color: ${({ theme }) => theme.palette.text.primary};
    background: transparent;

    box-shadow: inset 0px -1px 1px #eaeef3;
`;

export const Logo = styled(SvgLogo)`
    width: ${({ theme }) => theme.spacing(4.5)};
    height: ${({ theme }) => theme.spacing(4.5)};

    margin: 0 ${({ theme }) => theme.spacing(2.5)} 0 0;

    display: block;
`;
