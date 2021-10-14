import styled from "@emotion/styled";
import { Card } from "@query";

export const Root = styled.div`
    width: 250px;

    margin: 0;
    padding: 0;
`;

export const TitleWrapper = styled.div`
    margin: 0;
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

export const Graphics = styled.div`
    position: absolute;
    top: 0;
    left: 10%;
    right: 0;
    bottom: 0;

    background-size: cover;
    background-position: center center;

    &:before {
        content: "";

        background: rgb(49, 49, 30);
        background: linear-gradient(90deg, rgba(49, 49, 30, 1) 0%, rgba(49, 49, 30, 1) 10%, rgba(0, 0, 0, 0) 65%);

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;

export const CardType = styled.div<{ type: Card["type"] }>`
    width: 8px;
    border-right: 1px solid black;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    background: ${({ type }) => {
        switch (type) {
            case "Monster":
                return "rgb(152,74,35)";

            case "Spell":
                return "rgb(3, 141, 125)";

            default:
                return "rgb(166,23,111)";
        }
    }};
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
