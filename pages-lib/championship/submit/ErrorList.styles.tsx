import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const ErrorListItem = styled.div`
    &:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.spacing(1)};
    }
`;
