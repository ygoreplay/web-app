import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import { IncomingHttpHeaders } from "http";
import fetch from "isomorphic-unfetch";
import isEqual from "lodash/isEqual";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { createUploadLink } from "apollo-upload-client";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
    const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                "Access-Control-Allow-Origin": "*",
                Cookie: headers?.cookie ?? "",
            },
        }).then(response => response);
    };

    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
                    );
                if (networkError) console.error(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
            }),
            // this uses apollo-link-http under the hood, so all the options here come from that package
            createUploadLink({
                uri: process.env.API_ENTRYPOINT || process.env.NEXT_PUBLIC_GRAPHQL_URI,
                fetchOptions: {
                    mode: "cors",
                },
                credentials: "include",
                fetch: enhancedFetch,
            }),
        ]),
        cache: new InMemoryCache({}),
    });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
    headers?: IncomingHttpHeaders | null;
    initialState?: InitialState | null;
}

export const initializeApollo = ({ headers, initialState }: IInitializeApollo = { headers: null, initialState: null }) => {
    const localApolloClient = apolloClient ?? createApolloClient(headers);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = localApolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [...sourceArray, ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))],
        });

        // Restore the cache with the merged data
        localApolloClient.cache.restore(data);
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return localApolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = localApolloClient;

    return localApolloClient;
};

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: AppProps["pageProps"]) => {
    if (pageProps?.props) {
        // eslint-disable-next-line no-param-reassign
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
};

export function useApollo(pageProps: AppProps["pageProps"]) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    return useMemo(() => initializeApollo({ initialState: state }), [state]);
}
