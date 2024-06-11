/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx';

const nextConfig = withMDX({
    extension: /\.mdx?$/,
})({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack(config) {
        config.externals = config.externals || [];
        return config;
    },
});

export default nextConfig;
