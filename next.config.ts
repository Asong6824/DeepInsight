import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                // 这是我们新添加的，针对你的 OSS 域名
                protocol: 'https',
                hostname: 'blog-assets-asong.tos-cn-beijing.volces.com',
            },
            {
                // 这是之前为占位图添加的
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                // 这是为本地 Strapi 服务添加的
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
            },
        ],
    },
};

export default nextConfig;