import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};

    min-height: 420px;

    overflow-x: visible;
`;

export const Content = styled.div`
    margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const Title = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid rgba(35, 35, 35, 0.1);

    text-align: center;
`;

export const Footer = styled.div`
    margin: 0;
    padding: 0;
    border-top: 1px solid rgba(35, 35, 35, 0.1);

    display: flex;
    justify-content: flex-end;
`;

export const NextButton = styled(ButtonBase)`
    width: ${({ theme }) => theme.spacing(20.5)};
    height: 70px;

    margin-top: -1px;
    padding: ${({ theme }) => theme.spacing(3)};

    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-size: 1rem;

    color: white;
    background: ${({ theme }) => theme.palette.primary.main};
    transition: background-color 0.2s ease;

    > svg {
        position: absolute;
        top: 50%;
        right: ${({ theme }) => theme.spacing(2.5)};

        transform: translateY(-50%);
        transition: transform 0.2s ease;
    }

    &:disabled {
        background-color: rgba(0, 0, 0, 0.2);
    }

    &:not(:disabled) {
        &:hover,
        &:focus {
            > svg {
                transform: translateY(-50%) translateX(${({ theme }) => theme.spacing(1)});
            }
        }
    }
`;

export const UrlBlock = styled.pre`
    margin: ${({ theme }) => theme.spacing(2, -2)};
    padding: ${({ theme }) => theme.spacing(2)};

    display: block;

    color: white;
    background: rgb(40, 49, 66);
`;
