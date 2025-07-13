// lib/strapi.ts

import type { Article } from '@/lib/types';

export async function getArticleBySlug(slug: string): Promise<Article[] | null> {
    const strapiUrl = process.env.STRAPI_API_URL || 'http://127.0.0.1:8888';
    const apiUrl = new URL('/api/articles', strapiUrl);
    apiUrl.searchParams.append('filters[slug][$eq]', slug);

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
export async function fetchArticles({ query }: { query?: string } = {}): Promise<Article[]> {
    const strapiUrl = process.env.STRAPI_API_URL || 'http://127.0.0.1:8888';
    const apiUrl = new URL('/api/articles', strapiUrl);

    apiUrl.searchParams.append('sort', 'publishedAt:desc');

    if (query) {
        apiUrl.searchParams.append('filters[$or][0][title][$containsi]', query);
        apiUrl.searchParams.append('filters[$or][1][content][$containsi]', query);
    }

    try {
        const response = await fetch(apiUrl.toString(), { cache: 'no-store' });
        if (!response.ok) {
            console.error(`[strapi.ts] 获取文章列表失败: ${response.status} ${response.statusText}`);
            return [];
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error(`[strapi.ts] 获取文章列表时发生错误:`, error);
        return [];
    }
}