import styled from "@emotion/styled";

export const Item = styled.div`
    padding: ${({ theme }) => theme.spacing(1)};

    display: flex;
    box-sizing: border-box;

    transition: background-color 0.1s ease;

    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }

    &:not(:last-child) {
        border-bottom: 1px solid #414345;
    }
`;

export const CardImage = styled.div`
    margin-right: ${({ theme }) => theme.spacing(1)};

    width: 55px;
    height: 80px;

    position: relative;

    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;

export const CardDescription = styled.div`
    margin: 0;
    padding: 0;
`;

export const CardName = styled.span`
    display: block;
`;

export const Container = styled.div`
    display: flex;
`;

export const CardDescriptionItem = styled.span`
    display: block;

    font-size: 14px;

    color: rgba(255, 255, 255, 0.6);

    &:not(:last-child) {
        content: "·";

        padding: ${({ theme }) => theme.spacing(0.5)};

        display: block;
    }
`;

export const BanList = styled.div`
    width: 64px;
    height: 64px;

    position: absolute;
    top: 0;
    right: 0;
    z-index: 10000;

    background-image: url(https://ygoreplay-static.s3.ap-northeast-2.amazonaws.com/card-limit.png);
    background-repeat: no-repeat;

    transform-origin: right top;
    transform: scale(0.4) translate(12px, -12px);
`;
