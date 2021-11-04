import styled from "@emotion/styled";

export const Root = styled.form`
    max-width: 360px;

    margin-right: ${({ theme }) => theme.spacing(2)};

    position: sticky;
    top: ${({ theme }) => theme.spacing(9)};

    @media (min-width: 0px) and (orientation: landscape) {
        top: ${({ theme }) => theme.spacing(8)};
    }

    @media (min-width: 600px) {
        top: ${({ theme }) => theme.spacing(10)};
    }
`;
