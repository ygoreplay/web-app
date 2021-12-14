import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0 0;
    padding: ${({ theme }) => theme.spacing(2)};

    overflow-y: hidden;
`;

export const InputContainer = styled.div`
    margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const InputWrapper = styled.div`
    &:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.spacing(1)};
    }
`;
