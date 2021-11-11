import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const Root = styled.div`
    margin: 0;

    padding-left: 280px;

    display: flex;
`;

export const TargetDeck = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};

    display: flex;

    position: sticky;
    top: 0;
    z-index: 3000;

    color: #f0f0f0;
    background: #18191f;
`;

export const PrevNextButton = styled(IconButton)``;

export const DeckTitle = styled.h2`
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: normal;
    text-align: center;
`;

export const Content = styled.div`
    flex: 1 1 auto;
`;

export const FabContainer = styled.div`
    position: fixed;
    right: ${({ theme }) => theme.spacing(4)};
    bottom: ${({ theme }) => theme.spacing(4)};
`;
