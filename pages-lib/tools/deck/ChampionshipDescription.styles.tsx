import styled from "@emotion/styled";

export const Root = styled.div`
    height: 100%;

    margin: 0;
    padding: 0;
    border-right: 1px solid rgb(19, 47, 76);

    display: flex;
    flex-direction: column;

    flex: 1 1 auto;

    color: rgba(255, 255, 255, 0.75);
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);

    user-select: none;
`;

export const DescriptionGroup = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const DescriptionItem = styled.div`
    padding: ${({ theme }) => theme.spacing(1, 2)};

    border-bottom: 1px solid rgba(31, 73, 117, 0.33);

    display: flex;

    font-size: 14px;

    &:first-of-type {
        border-top: 1px solid rgba(31, 73, 117, 0.33);
    }
`;

export const Title = styled.div`
    > strong {
        font-weight: 400;

        color: white;
    }
`;

export const Value = styled.div``;

export const DeckList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DeckListItem = styled.div<{ selected?: boolean }>`
    padding: ${({ theme, selected }) => theme.spacing(1.5, 1.5, 1.5, selected ? 5 : 1.5)};
    border-bottom: 1px solid rgba(31, 73, 117, 0.33);

    display: flex;
    position: relative;

    transition: padding-left 0.2s ease;
    cursor: pointer;

    &:hover {
        padding: ${({ theme, selected }) => theme.spacing(1.5, 2, 1.5, selected ? 5 : 3)};
    }

    > svg {
        display: block;

        position: absolute;
        top: 50%;
        left: ${({ theme }) => theme.spacing(1.5)};

        transform: translateY(-50%);
        opacity: ${({ selected }) => (selected ? 0.5 : 0)};

        transition: opacity 0.15s ease;

        color: white;
    }
`;

export const Indicator = styled.div<{ passed?: boolean }>`
    width: 6px;
    height: 6px;

    border-radius: 100%;

    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spacing(2)};

    background: ${({ passed }) => (passed ? "limegreen" : "orangered")};

    transform: translate(-50%, -50%);
    transition: background-color 0.2s ease;
`;

export const ButtonWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
`;
