// app/components/AdaptedArticleCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";

// 新的、更智能的辅助函数，用于从 Strapi 的 Rich Text 结构中提取纯文本并截断
const extractAndTruncateText = (content: any[] | null | undefined, length: number): string => {
    if (!content || !Array.isArray(content)) {
        return "这篇文章没有提供描述。";
    }

    let plainText = '';
    // 遍历所有内容块 (比如段落)
    for (const block of content) {
        // 遍历每个块的子节点
        if (block.children && Array.isArray(block.children)) {
            for (const child of block.children) {
                // 如果子节点有 text 属性，就拼接到我们的纯文本字符串中
                if (child.text) {
                    plainText += child.text + ' ';
                }
            }
        }
    }

    plainText = plainText.trim(); // 去掉末尾的空格

    if (plainText.length <= length) {
        return plainText;
    }
    return plainText.substring(0, length) + "...";
};

type ArticleCardProps = {
    article: Article;
};

export function AdaptedArticleCard({ article }: ArticleCardProps) {
    // 我们不再需要 strapiUrl 来拼接地址了

    // --- 这是核心修改 ---
    // 如果 article.featureImage 存在 (是一个 URL 字符串)，就直接使用它
    // 否则，使用占位图
    const imageUrl = article.featureImage || "https://placehold.co/600x400?text=No+Image";
    // --------------------

    const description = extractAndTruncateText(article.content, 100);
    const publishedDate = new Date(article.publishedAt).toLocaleDateString();

    return (
        <Link href={`/blog/${article.slug}`}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-800 bg-black transition duration-200 hover:shadow-xl hover:shadow-[#f4a443]/20">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-900">
                    <Image
                        src={imageUrl}
                        fill
                        alt={`Thumbnail for ${article.title}`}
                        className="transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
                    />
                </div>
                <div className="p-4">
                    <h2 className="my-4 text-lg font-bold text-[#f4a443]">
                        {article.title}
                    </h2>
                    <p className="my-4 text-sm font-normal text-zinc-400 h-20">
                        {description}
                    </p>
                    <div className="mt-10 flex flex-row items-center justify-between">
                        <span className="text-sm text-gray-500">{publishedDate}</span>
                        <div className="relative z-10 block rounded-xl bg-[#f4a443] px-6 py-2 text-xs font-bold text-black">
                            Read More
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

