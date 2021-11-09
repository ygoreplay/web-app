import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    background: rgba(49, 49, 30, 1);
`;

export const Item = styled.div`
    padding: ${({ theme }) => theme.spacing(1.5)};

    position: relative;
    display: flex;

    &:not(:last-of-type) {
        border-bottom: 1px solid black;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

export const CardName = styled.span`
    display: block;
    flex: 1 1 auto;

    position: relative;
    z-index: 30;

    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`;

export const CardImage = styled.div`
    width: 300px;

    position: absolute;
    top: 0;
    right: 48px;
    bottom: 0;

    background-size: cover;
    background-position: center;

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

export const UsageCount = styled.span`
    width: 48px;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;

    color: #f4d442;
    background: #313131;
`;
