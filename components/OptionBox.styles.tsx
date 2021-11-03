import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    border: 1px solid #e3e8f0;
    border-radius: 4px;
`;

export const Title = styled.div`
    padding: ${({ theme }) => theme.spacing(2, 2, 1)};
`;
export const Content = styled.div`
    padding: ${({ theme }) => theme.spacing(0, 2, 1)};
`;
