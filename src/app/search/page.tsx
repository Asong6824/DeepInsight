"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { fetchArticles } from '../../lib/strapi';
import { Article } from '../../lib/types';
import { AdaptedArticleCard } from '../../components/AdaptedArticleCard';
import { ArticleParallaxScroll } from '../../components/ArticleParallaxScroll';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  console.log('Search query from URL:', query); // <-- 调试日志
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      const performSearch = async () => {
        console.log('Calling fetchArticles with query:', query);
        setLoading(true);
        try {
          const fetchedArticles = await fetchArticles({ query });
          setArticles(fetchedArticles);
        } catch (err) {
          setError('Failed to fetch articles.');
          console.error(err);
        }
        setLoading(false);
      };
      performSearch();
    }
  }, [query]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
        {articles.length > 0 ? (
            // --- 替换成下面的网格布局 ---
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                  <AdaptedArticleCard key={article.id} article={article} />
              ))}
            </div>
        ) : (
            <p>No articles found.</p>
        )}
      </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
