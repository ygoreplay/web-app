import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 10000;

    pointer-events: none;
`;

export const CardImage = styled.div`
    width: 76px;
    height: 110px;

    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;
