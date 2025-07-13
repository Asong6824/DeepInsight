// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar'; // 1. 在这里导入你的 Navbar 组件

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DeepInsight', // 你可以自定义网站标题
    description: '由 Next.js 和 Strapi 驱动的高性能内容门户', // 自定义描述
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-black`}>
        {/* 2. 将 Navbar 放在这里，位于所有页面内容(children)之上 */}
        <Navbar />

        {/* 3. 给 main 标签添加一个上边距 (pt-20) */}
        {/* 因为我们的 Navbar 是固定定位(fixed)，高度为 h-20 (5rem)，
             所以需要给下面的主内容区一个等高的上边距，防止内容被 Navbar 遮挡。 */}
        <main className="pt-20">
            {children} {/* `children` 会是你每个 page.tsx 的实际内容 */}
        </main>
        </body>
        </html>
    );
}