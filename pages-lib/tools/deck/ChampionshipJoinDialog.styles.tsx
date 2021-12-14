import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    background-color: white;
`;

export const Content = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(0)};

    overflow-x: visible;
`;
