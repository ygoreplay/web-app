import styled from "@emotion/styled";
import { Card } from "@query";
import { getColorByCardType } from "@utils/getColorByCardType";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
`;

export const Column = styled.div`
    width: 250px;

    margin: 0 ${({ theme }) => theme.spacing(1)} 0 0;
    padding: 0;
`;

export const Item = styled.div`
    padding: ${({ theme }) => theme.spacing(1)};
    border: 1px solid black;
    border-bottom: 0;

    position: relative;

    color: white;
    background: #31311e;

    font-size: 0.9em;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

    &:last-of-type {
        border-bottom: 1px solid black;
    }
`;

export const Separator = styled.div`
    padding: ${({ theme }) => theme.spacing(1.5)};
    border: 1px solid black;
    border-bottom: 0;

    color: white;
    background: #31311e;

    * {
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
`;

export const Graphics = styled.div`
    position: absolute;
    top: 0;
    left: 10%;
    right: 0;
    bottom: 0;

    font-size: 0.9em;

    background-size: cover;
    background-position: center center;

    &:before {
        content: "";

        background: rgb(49, 49, 30);
        background: linear-gradient(90deg, rgba(49, 49, 30, 1) 0%, rgba(49, 49, 30, 1) 10%, rgba(0, 0, 0, 0) 85%);

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;

export const CardType = styled.div<{ card: Pick<Card, "type" | "monsterType"> }>`
    width: 8px;
    border-right: 1px solid black;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    background: ${({ card }) => getColorByCardType(card)};
`;

export const Label = styled.span`
    width: calc(100% - ${({ theme }) => theme.spacing(3)});

    padding-left: 8px;

    display: block;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    position: relative;
    z-index: 10;
`;

export const Count = styled.div`
    width: ${({ theme }) => theme.spacing(3)};

    border-right: 1px solid #000;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    text-align: center;

    color: #f4d442;
    background: #313131;
`;
