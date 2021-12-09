import styled from "@emotion/styled";

export const MainRoot = styled.div`
    padding: ${({ theme }) => theme.spacing(1, 2)};

    display: flex;
    flex: 1 1 auto;
`;

export const ExtraSideRoot = styled.div`
    padding: ${({ theme }) => theme.spacing(1, 2)};

    height: 179px;

    display: flex;
    flex: 0 0 179px;
`;

export const List = styled.div`
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid rgb(19, 47, 76);

    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    backdrop-filter: blur(2px);

    > div {
        display: flex;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        flex: 1 1 auto;
    }
`;
