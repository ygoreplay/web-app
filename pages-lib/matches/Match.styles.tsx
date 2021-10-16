import styled from "@emotion/styled";

export const Root = styled.div`
    min-height: 100%;

    margin: 0;
    padding: 0;

    display: flex;
`;

export const SideBar = styled.div`
    max-width: 300px;

    border-right: 1px solid #e0e5ee;

    flex: 0 0 300px;
`;

export const Wrapper = styled.div``;

export const Content = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};

    flex: 1 1 auto;
`;

export const Title = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
    border-bottom: 1px solid #e0e5ee;

    text-align: center;
`;

export const FieldGroup = styled.div`
    margin: ${({ theme }) => theme.spacing(2)} 0;
`;

export const Field = styled.div`
    padding: ${({ theme }) => theme.spacing(1)};
    border-bottom: 1px solid #e0e5ee;

    display: flex;

    font-size: 0.85em;

    &:first-of-type {
        border-top: 1px solid #e0e5ee;
    }
`;

export const FieldTitle = styled.span`
    display: block;

    flex: 1 1 auto;

    color: rgba(0, 0, 0, 0.65);
`;

export const FieldValue = styled.span`
    display: block;
`;
