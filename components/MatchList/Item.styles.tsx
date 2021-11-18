import styled from "@emotion/styled";

export const TitleCard = styled.div<{ won?: boolean }>`
    width: 200px;

    margin: 0;
    padding: 0;

    position: absolute;
    top: 0;
    bottom: 0;

    background-size: cover;
    background-color: black;

    filter: grayscale(0.6);
    opacity: 0.5;

    &:after {
        content: "";

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;

export const Part = styled.div<{ won?: boolean }>`
    padding: ${({ theme }) => theme.spacing(2)};

    position: relative;
    display: flex;
    flex: 1 1;

    color: ${({ won }) => (won ? "rgb(0, 127, 255)" : "inherit")};

    &:first-of-type {
        justify-content: flex-end;

        ${TitleCard} {
            left: 0;

            &:after {
                background: linear-gradient(90deg, rgba(0, 0, 0, 0) 35%, rgba(255, 255, 255, 1) 80%);
            }
        }
    }

    &:not(:first-of-type) {
        ${TitleCard} {
            right: 0;
            transform: scaleX(-1);

            &:after {
                background: linear-gradient(90deg, rgba(0, 0, 0, 0) 15%, rgba(255, 255, 255, 1) 75%);
            }
        }
    }
`;

export const Versus = styled.span`
    padding: ${({ theme }) => theme.spacing(2)} 0;

    display: block;

    color: rgba(0, 0, 0, 0.35);
`;

export const DeckName = styled.span``;
export const PlayerName = styled.span`
    margin: 0 ${({ theme }) => theme.spacing(1)};
    opacity: 0.5;
`;

export const TierIndicator = styled.div`
    width: ${({ theme }) => theme.spacing(1)};
    height: ${({ theme }) => theme.spacing(1)};

    border-radius: 100%;

    position: absolute;
    top: ${({ theme }) => theme.spacing(1)};
    left: ${({ theme }) => theme.spacing(1)};

    background: rgba(255, 165, 0, 0.45);
`;

export const Root = styled.a`
    margin: 0;
    padding: 0;

    display: flex;
    align-content: center;
    justify-content: center;

    position: relative;

    background: white;

    &:not(:last-child) {
        border-bottom: 1px solid #e3e8f0;
    }

    &:hover {
        background: #f2f2f2;

        ${Part} {
            &:first-of-type {
                justify-content: flex-end;

                ${TitleCard} {
                    left: 0;

                    &:after {
                        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 35%, #f2f2f2 80%);
                    }
                }
            }

            &:not(:first-of-type) {
                ${TitleCard} {
                    right: 0;
                    transform: scaleX(-1);

                    &:after {
                        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 35%, #f2f2f2 80%);
                    }
                }
            }
        }
    }
`;
