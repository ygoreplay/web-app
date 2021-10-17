import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Item = styled.div`
    padding: ${({ theme }) => theme.spacing(1.5)};

    display: flex;

    &:not(:last-of-type) {
        border-bottom: 1px solid rgb(229, 232, 236);
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

export const DeckName = styled.span`
    display: block;
    flex: 1 1 auto;
`;

export const WinRate = styled.span<{ winRateValue: number }>`
    display: block;
    flex: 0 0 auto;

    font-weight: bold;
`;
