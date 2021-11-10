import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
`;
