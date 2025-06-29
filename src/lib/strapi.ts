// lib/strapi.ts

import type { Article } from '@/lib/types';

export async function getArticleBySlug(slug: string): Promise<Article[] | null> {
    const strapiUrl = process.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
    const apiUrl = new URL('/api/articles', strapiUrl);
    apiUrl.searchParams.append('filters[slug][$eq]', slug);
    apiUrl.searchParams.append('populate', 'featureImage');

    try {
        const response = await fetch(apiUrl.toString(), { cache: 'no-store' });
        if (!response.ok) {
            console.error(`[strapi.ts] 响应失败，状态码: ${response.status}`);
            return null;
        }
        const result = await response.json();
        if (result.data && result.data.length > 0) {
            return result.data[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error(`[strapi.ts] 在 fetch 过程中发生致命错误:`, error);
        return null;
    }
}

/**
 * 获取所有已发布的文章列表，按发布日期倒序排列
 * @returns 返回文章数组
 */
export async function getArticles(): Promise<Article[]> {
    const strapiUrl = process.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
    const apiUrl = new URL('/api/articles', strapiUrl);

    // --- 最终修正 ---
    // 我们只保留 sort 参数，因为 featureImage 已经是文本字段，不再需要 populate
    apiUrl.searchParams.append('sort', 'publishedAt:desc');
    // apiUrl.searchParams.append('populate', 'featureImage'); // <-- 删除或注释掉这一行
    // ----------------

    try {
        const response = await fetch(apiUrl.toString(), { cache: 'no-store' });
        if (!response.ok) {
            console.error(`[strapi.ts] 获取文章列表失败: ${response.status} ${response.statusText}`);
            return [];
        }
        const result = await response.json();
        // 现在返回的数据中，featureImage 将直接是一个 URL 字符串 (如果内容已填写)
        return result.data;
    } catch (error) {
        console.error(`[strapi.ts] 获取文章列表时发生错误:`, error);
        return [];
    }
}