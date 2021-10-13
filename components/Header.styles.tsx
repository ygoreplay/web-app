import { AppBar as MuiAppBar } from "@mui/material";

import styled from "@emotion/styled";

import SvgLogo from "@res/logo.svg";

export const AppBar = styled(MuiAppBar)`
    color: ${({ theme }) => theme.palette.text.primary};

    background: rgba(255, 255, 255, 0.72);
    box-shadow: inset 0px -1px 1px #eaeef3;
    backdrop-filter: saturate(180%) blur(5px);
`;

export const Logo = styled(SvgLogo)`
    width: ${({ theme }) => theme.spacing(4.5)};
    height: ${({ theme }) => theme.spacing(4.5)};

    margin: 0 ${({ theme }) => theme.spacing(2.5)} 0 0;

    display: block;
`;
