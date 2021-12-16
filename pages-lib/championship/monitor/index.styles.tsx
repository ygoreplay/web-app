import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2, 0)};

    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const Section = styled.div<{ padding?: boolean }>`
    padding: ${({ theme, padding }) => theme.spacing(padding ? 2 : 0)};
    border-radius: 4px;

    background: white;
    box-shadow: rgb(23 25 29 / 5%) 0px 6px 25px;

    &:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
`;

export const Header = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);

    display: flex;
    justify-content: center;
    align-items: center;
`;
