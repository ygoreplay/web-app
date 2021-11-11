import styled from "@emotion/styled";
import { generateAspectRatio } from "@styles/generateAspectRatio";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};

    background: #f2f3f9;
`;

export const CardContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

export const CardImage = styled.div`
    position: relative;

    background-size: cover;
    background-position: center;

    ${generateAspectRatio(1, 1)}

    cursor: pointer;

    &:after {
        content: "";

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: rgba(0, 0, 0, 0);

        transition: background-color 0.15s ease;
    }

    &:hover {
        &:after {
            background-color: rgba(0, 0, 0, 0.25);
        }
    }

    > .content {
        display: flex;
        align-items: center;
        justify-content: center;

        color: white;
        background: rgba(0, 0, 0, 0.6);

        > svg {
            width: 48px;
            height: 48px;

            display: block;
        }
    }
`;

export const CardName = styled.div`
    padding: ${({ theme }) => theme.spacing(1)};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const CardType = styled.div`
    padding: ${({ theme }) => theme.spacing(1)};
    border-top: 1px solid rgba(0, 0, 0, 0.05);

    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.45);
`;

export const CardItem = styled.div`
    width: calc(((100% - (16px * 9)) / 10));

    margin-bottom: ${({ theme }) => theme.spacing(2)};
    border-radius: 6px;

    overflow: hidden;

    box-shadow: 0 6px 25px rgb(24 25 31 / 5%);
    background: white;

    transition: box-shadow 150ms ease, transform 150ms ease;

    &:not(:nth-of-type(10n)) {
        margin-right: ${({ theme }) => theme.spacing(2)};
    }

    &:hover {
        box-shadow: rgb(24 25 31 / 15%) 0 6px 35px;
        transform: translateY(-4px);
    }
`;
