import styled from "@emotion/styled";

export const Image = styled.div<{ dragging: boolean }>`
    width: 100px;
    height: 145px;

    position: absolute;
    top: 0;
    left: 0;

    background-color: transparent;
    background-size: cover;
    background-position: center;

    cursor: pointer;

    &:before {
        content: "";
    }

    &:hover {
        &:before {
            content: "";

            border: 1px solid white;

            position: absolute;
            top: ${({ theme }) => theme.spacing(-0.75)};
            left: ${({ theme }) => theme.spacing(-0.75)};
            right: ${({ theme }) => theme.spacing(-0.75)};
            bottom: ${({ theme }) => theme.spacing(-0.75)};

            visibility: ${({ dragging }) => (dragging ? "hidden" : "visible")};
        }
    }
`;

export const Root = styled.div<{ dragging?: boolean }>`
    display: ${({ dragging }) => (dragging ? "none" : "block")};
    position: relative;

    background-color: transparent;
    color: transparent;
    user-select: none;
`;
