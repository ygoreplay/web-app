import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apollo";

import { theme } from "@styles/theme";
import "@styles/globals.css";
import "react-mosaic-component/react-mosaic-component.css";
import "react-virtualized/styles.css";
import "swiper/css";

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
