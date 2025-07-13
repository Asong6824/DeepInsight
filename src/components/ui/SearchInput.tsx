"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="px-3 py-2 text-sm text-white bg-black border border-[#f4a443] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f4a443]"
      />
      <button type="submit" className="ml-2 px-4 py-2 text-sm font-medium text-black bg-[#f4a443] rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4a443]">
        Search
      </button>
    </form>
  );
}
