import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const SparksMove = keyframes`
    0% {
        background-position: center top;
    }
    100% {
        background-position: center -1150px;
    }
`;

export const GlobalStyles = css`
    html,
    body,
    #__next {
        height: 100%;
    }
`;

export const Graphics = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 5;
    overflow: hidden;

    background: black url(/images/background-sparks.jpg) center top repeat-y;
    animation: ${SparksMove} 70s infinite linear;

    pointer-events: none;

    &:before,
    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    &:before {
        opacity: 0.7;
        background: url(/images/background-fixed-tl.png) left top fixed no-repeat, url(/images/background-fixed-rb.png) right bottom fixed no-repeat,
            url(/images/background-blueflex.png) center center fixed;
        background-size: auto, auto, 100% 100%;
    }

    &:after {
        background: repeating-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 1px, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 3px);
        z-index: 10;
    }
`;

export const Particles = styled.canvas`
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
`;

export const Message = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1 1 auto;
`;

export const DeckViewWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
`;
