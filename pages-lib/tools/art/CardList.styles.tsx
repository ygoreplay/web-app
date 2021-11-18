import styled from "@emotion/styled";

function getCardIndicatorColor(changed?: boolean, hasValue?: boolean) {
    if (changed) {
        return "orange";
    }

    if (hasValue) {
        return "limegreen";
    }

    return "";
}

export const Root = styled.div`
    width: 300px;

    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
`;

export const SearchWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};

    flex: 0 0 auto;
`;

export const Item = styled.button<{ activated?: boolean; changed?: boolean; hasValue?: boolean }>`
    margin: 0;
    padding: ${({ theme, activated }) => theme.spacing(0, 4, 0, activated ? 6 : 2)};
    border: 0;

    position: relative;
    display: block;
    box-sizing: border-box;

    font-size: 1rem;
    line-height: ${({ theme }) => theme.spacing(6)};
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    background: white;
    transition: background-color 0.15s ease, padding 0.2s ease;
    will-change: padding;

    cursor: pointer;

    &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
    }

    &:hover {
        padding-left: ${({ theme, activated }) => theme.spacing(activated ? 6 : 3)};
        background: #efefef;
    }

    &:before {
        content: "";

        width: 6px;
        height: 6px;

        border-radius: 100%;

        position: absolute;
        top: 50%;
        right: ${({ theme }) => theme.spacing(2)};

        transform: translate(-50%, -50%);
        transition: opacity 0.15s ease, background-color 0.15s ease;

        opacity: ${({ changed, hasValue }) => (hasValue || changed ? 1 : 0)};
        background-color: ${({ changed, hasValue }) => getCardIndicatorColor(changed, hasValue)};
    }
`;

export const Content = styled.div`
    flex: 1 1 auto;
`;
