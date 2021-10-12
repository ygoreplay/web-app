/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test(".svg"));
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }

        config.module.rules.push({
            loader: "@svgr/webpack",
            options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
            },
            test: /\.svg$/,
        });

        return config;
    },
};
