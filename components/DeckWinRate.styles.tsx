import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Item = styled.div`
    display: flex;

    color: white;
    background: rgba(49, 49, 30, 1);

    &:not(:last-of-type) {
        border-bottom: 1px solid black;
    }
`;

export const DeckName = styled.span`
    padding: ${({ theme }) => theme.spacing(1.5)};

    position: relative;

    display: block;
    flex: 1 1 auto;
`;

export const DeckNameContent = styled.span`
    position: relative;
    z-index: 100;

    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`;

export const WinRate = styled.span`
    padding: ${({ theme }) => theme.spacing(1.5)};
    border-left: 1px solid black;

    display: block;
    flex: 0 0 auto;

    font-weight: bold;
`;

export const WinRateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    background: #313131;
`;

export const CardImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &:before {
        content: "";

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background: linear-gradient(90deg, rgba(49, 49, 30, 1) 0%, rgba(49, 49, 30, 1) 5%, rgba(0, 0, 0, 0) 100%);
    }
`;
