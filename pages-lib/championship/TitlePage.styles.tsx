import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const InputWrapper = styled.div`
    margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const UrlBlock = styled.pre`
    margin: ${({ theme }) => theme.spacing(2, -2)};
    padding: ${({ theme }) => theme.spacing(2)};

    display: block;

    color: white;
    background: rgb(40, 49, 66);

    overflow-x: scroll;
`;
