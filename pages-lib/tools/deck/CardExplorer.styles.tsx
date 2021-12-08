import { TextField as MuiTextField, Toolbar as MuiToolbar } from "@mui/material";
import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;

    flex: 1 1 auto;
`;

export const TextField = styled(MuiTextField)`
    & .MuiOutlinedInput-notchedOutline {
        border-color: rgb(19, 47, 76);

        transition: border-color 0.1s ease;
    }

    .MuiOutlinedInput-root:hover {
        .MuiOutlinedInput-notchedOutline {
            border-color: rgb(30, 72, 115);
        }
    }

    .MuiOutlinedInput-root.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
            border-color: rgb(30, 72, 115);
            border-width: 1px;
        }
    }
`;

export const CardListContainer = styled.div`
    flex: 1 1 auto;
`;

export const Toolbar = styled(MuiToolbar)`
    padding: 0 ${({ theme }) => theme.spacing(1.5)} !important;
`;
