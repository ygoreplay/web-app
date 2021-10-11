import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const Root = styled(Card)`
    margin: 0;
    padding: 0;
    border: 1px solid rgb(229, 232, 236);
`;

export const TitleWrapper = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
`;

export const Content = styled.div`
    margin: 0;
    padding: 0;
    border-top: 1px solid rgb(229, 232, 236);
`;
