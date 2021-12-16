import styled from "@emotion/styled";
import { Accordion } from "@mui/material";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Item = styled(Accordion)`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    box-shadow: rgb(23 25 29 / 5%) 0px 6px 25px;
    border-radius: 4px !important;
    &:before {
        display: none;
    }

    .MuiButtonBase-root.Mui-expanded {
        box-shadow: inset 0px -1px 0 rgba(0, 0, 0, 0.15);
    }

    .MuiAccordionDetails-root {
        padding: ${({ theme }) => theme.spacing(2)};
    }
`;

export const ParticipantSection = styled.div`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
    padding: 0;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Card = styled.div`
    width: calc(100% / 10);

    position: relative;

    background-size: cover;
    background-position: center;

    &:before {
        content: "";
        width: 100%;

        display: block;
        padding-top: ${(580 / 400) * 100}%;
    }
`;

export const DeckList = styled.div`
    padding: 0;

    display: flex;
    flex-wrap: wrap;

    &:not(:first-of-type) {
        margin-top: ${({ theme }) => theme.spacing(3)};
    }
`;

export const ButtonContainer = styled.div`
    margin-top: ${({ theme }) => theme.spacing(2)};

    display: flex;
    justify-content: flex-end;
`;

export const DeckListContainer = styled.div`
    margin-top: ${({ theme }) => theme.spacing(1)};
    margin-bottom: ${({ theme }) => theme.spacing(4)};

    display: block;

    background: black;
`;
