import styled from "@emotion/styled";

export const Root = styled.div<{ isOver: boolean; canDrop: boolean }>`
    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 50000;

    pointer-events: ${({ canDrop }) => (canDrop ? "all" : "none")};

    background-color: rgba(0, 0, 0, 0.5);

    opacity: ${({ isOver }) => (isOver ? 1 : 0)};
    transition: opacity 0.2s ease;
`;
