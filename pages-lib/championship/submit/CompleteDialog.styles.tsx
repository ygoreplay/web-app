import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};
`;

export const Icon = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing(2)};

    display: flex;
    justify-content: center;

    > svg {
        width: ${({ theme }) => theme.spacing(6)};
        height: ${({ theme }) => theme.spacing(6)};

        display: block;

        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

export const Description = styled.div`
    margin-top: ${({ theme }) => theme.spacing(2)};
`;
