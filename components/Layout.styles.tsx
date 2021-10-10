import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Main = styled.main<{ padding?: boolean }>`
    margin: 0;
    padding: ${({ theme, padding }) => theme.spacing(2, padding ? 2 : 0)};
`;
