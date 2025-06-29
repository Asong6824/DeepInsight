// app/page.tsx
import { getArticles } from '@/lib/strapi';
import { ArticleParallaxScroll } from '@/components/ArticleParallaxScroll'; // 导入我们改造后的组件

export default async function HomePage() {
  // 1. 获取文章数据，这部分不变
  const articles = await getArticles();

  // 如果没有文章，显示提示信息
  if (!articles || articles.length === 0) {
    return (
        <main className="p-8 text-center">
          <h1 className="text-4xl font-bold">欢迎来到我的门户</h1>
          <p className="mt-4">目前还没有任何文章。</p>
        </main>
    );
  }

  // 2. 将获取到的文章数据直接传递给我们的新组件
  return <ArticleParallaxScroll articles={articles} />;
}