import styled from "@emotion/styled";

export const Root = styled.a`
    margin: 0;
    padding: 0;

    display: flex;
    align-content: center;
    justify-content: center;

    &:not(:last-of-type) {
        border-bottom: 1px solid #e3e8f0;
    }
`;

export const Part = styled.div<{ won?: boolean }>`
    padding: ${({ theme }) => theme.spacing(2)};

    display: flex;

    flex: 1 1;

    color: ${({ won }) => (won ? "rgb(0, 127, 255)" : "inherit")};

    &:first-of-type {
        justify-content: flex-end;
    }
`;

export const Versus = styled.span`
    padding: ${({ theme }) => theme.spacing(2)} 0;

    display: block;

    color: rgba(0, 0, 0, 0.35);
`;

export const DeckName = styled.span``;
export const PlayerName = styled.span`
    margin: 0 ${({ theme }) => theme.spacing(1)};
    opacity: 0.5;
`;
