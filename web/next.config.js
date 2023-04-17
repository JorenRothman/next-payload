/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
            },
        ],
    },
    webpack(config) {
        config.output = config.output || {};
        config.output.devtoolModuleFilenameTemplate = function (info) {
            return 'file:///' + encodeURI(info.absoluteResourcePath);
        };
        return config;
    },
};

module.exports = nextConfig;
