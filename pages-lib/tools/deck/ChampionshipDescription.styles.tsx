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
`;

export const DescriptionItem = styled.div`
    padding: ${({ theme }) => theme.spacing(1, 2)};

    border-bottom: 1px solid rgba(31, 73, 117, 0.33);

    display: flex;

    font-size: 14px;
`;

export const Title = styled.div`
    > strong {
        font-weight: 400;

        color: white;
    }
`;

export const Value = styled.div``;
