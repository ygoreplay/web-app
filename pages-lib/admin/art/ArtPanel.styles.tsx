import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const Canvas = styled.div`
    width: 304px;
    height: 304px;

    display: block;
    position: relative;

    box-shadow: 0 8px 12px #00000029;

    background-color: white;

    .handle {
        width: 3px;
        height: 3px;

        background: red;
    }
`;

export const Fill = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: rgba(255, 0, 0, 0.25);
`;
