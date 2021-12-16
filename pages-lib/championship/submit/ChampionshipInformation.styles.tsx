import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Item = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};

    display: flex;

    font-size: 16px;

    &:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }
`;

export const Name = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;

    > svg {
        width: ${({ theme }) => theme.spacing(2.25)};
        height: ${({ theme }) => theme.spacing(2.25)};

        margin-left: ${({ theme }) => theme.spacing(0.5)};

        display: block;

        opacity: 0.4;
    }
`;
export const Value = styled.div`
    flex: 0 0 auto;
`;
