import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
    align-items: stretch;
`;

export const Title = styled.span`
    height: 30px;

    padding: 0 ${({ theme }) => theme.spacing(2)};

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    line-height: 1;

    color: white;
    background: #535353;
`;
