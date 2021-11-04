import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
    border: 1px solid #e3e8f0;
    border-radius: 4px;

    flex: 1 1 auto;
`;

export const LoaderWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
`;

export const EmptyMessage = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(4)};

    text-align: center;

    color: rgba(0, 0, 0, 0.45);
`;
