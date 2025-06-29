// lib/types.ts

// StrapiMedia 和 StrapiImageFormat 类型现在可以安全地移除了，因为不再使用
// interface StrapiImageFormat { ... }
// interface StrapiMedia { ... }

interface Author {
    // ... (Author 类型保持不变)
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: any[] | null; // Rich Text 字段是对象数组
    publishedAt: string;
    description?: string | null;
    featureImage: string | null; // <-- 这是主要的修改
    author: Author | null;
}