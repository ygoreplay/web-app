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

export const CardView = styled.div`
    position: relative;

    background-color: transparent;
    color: transparent;
    user-select: none;
`;

export const CardImage = styled.div`
    width: 100px;
    height: 145px;

    position: absolute;
    top: 0;
    left: 0;

    background-color: transparent;
    background-size: cover;
    background-position: center;
`;
