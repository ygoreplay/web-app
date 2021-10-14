import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Main = styled.main<{ padding?: boolean; withoutPadding?: boolean }>`
    margin: 0;
    padding: ${({ theme, padding, withoutPadding }) => (withoutPadding ? "0" : theme.spacing(2, padding ? 2 : 0))};
`;

export const Root = styled.div<{ fullHeight?: boolean }>`
    margin: 0;
    padding: 0;

    ${({ fullHeight }) =>
        fullHeight
            ? css`
                  height: 100%;

                  display: flex;
                  flex-direction: column;

                  > main {
                      height: 100%;
                  }
              `
            : ""}
`;
