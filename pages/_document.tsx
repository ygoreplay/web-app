import React from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#008cff" />
                    <meta name="msapplication-TileColor" content="#2d89ef" />
                    <meta name="theme-color" content="#008CFF" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id="dialog-container" />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
