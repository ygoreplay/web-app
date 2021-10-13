import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Item = styled.a`
    padding: ${({ theme }) => theme.spacing(1.5)};

    display: flex;

    user-select: none;

    &:not(:last-of-type) {
        border-bottom: 1px solid rgb(229, 232, 236);
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

export const Entry = styled.div`
    display: flex;
    flex: 1 1 0;

    &:first-of-type {
        justify-content: flex-end;
    }

    &:last-of-type {
        flex-direction: row-reverse;
        justify-content: flex-end;
    }
`;

export const Symbol = styled.div`
    margin: 0 ${({ theme }) => theme.spacing(1.5)};
    flex: 0 0 auto;
`;

export const PlayerName = styled.span`
    margin: 0 ${({ theme }) => theme.spacing(1)};

    display: block;

    opacity: 0.5;
`;

export const DeckName = styled.span`
    display: block;
`;
