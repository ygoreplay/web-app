import styled from "@emotion/styled";
import { Button as MuiButton } from "@mui/material";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
`;

export const NameInput = styled.input`
    width: 100%;

    margin: 0 ${({ theme }) => theme.spacing(2)} 0 0;
    padding: ${({ theme }) => theme.spacing(2)} 0;
    border: 0;

    display: block;
    box-sizing: border-box;

    font-size: 18px;

    outline: none;
`;

export const Button = styled(MuiButton)`
    flex: 0 0 auto;
`;

export const Item = styled.div`
    padding: 0 ${({ theme }) => theme.spacing(2)};

    display: flex;
    align-items: center;

    &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
`;
