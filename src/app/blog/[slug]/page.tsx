// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug } from '@/lib/strapi';
import type { Article } from '@/lib/types';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function ArticlePage({ params: { slug } }: { params: { slug: string } }) {
    const article: Article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // --- 这是核心修改 ---
    // 直接使用 article.featureImage，它现在是一个 URL 字符串
    const imageUrl = article.featureImage;
    // 我们不再能从 API 获取宽高，所以下面会调整 Image 组件的用法
    // --------------------

    return (
        <article style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <p className="text-gray-500 mb-6">
                发布于: {new Date(article.publishedAt).toLocaleDateString()}
            </p>

            {/* --- 图片渲染方式修改 --- */}
            {imageUrl && (
                // 为了使用 fill 属性，需要一个相对定位的父容器来定义尺寸
                <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={`Feature image for ${article.title}`}
                        fill // 使用 fill 属性让图片填满父容器
                        className="object-cover" // 保持图片比例并裁剪
                        priority
                    />
                </div>
            )}
            {/* ------------------------- */}

            <div className="prose lg:prose-xl max-w-none">
                {article.content && <BlocksRenderer content={article.content} />}
            </div>
        </article>
    );
}