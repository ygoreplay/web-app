import styled from "@emotion/styled";

export const Root = styled.div`
    max-width: 1024px;
    max-height: 945px;

    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing(1, 0)};

    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`;

export const MainSection = styled.div`
    padding: ${({ theme }) => theme.spacing(1, 2)};

    display: flex;
    flex: 1 1 auto;
`;

export const ExtraSideSection = styled.div`
    padding: ${({ theme }) => theme.spacing(1, 2)};

    height: 179px;

    display: flex;
    flex: 0 0 179px;
`;
