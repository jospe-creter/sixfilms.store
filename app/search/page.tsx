'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import { useLanguage } from '@/context/LanguageContext'
import { categoryKeys } from '@/lib/i18n'
import moviesData from '@/data/movies.json'

const CATEGORIES = ['Action', 'Romance', 'Rwandan Films', 'Thriller', 'Comedy']

function SearchContent() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [activeCategory, setActiveCategory] = useState('All')
  const [inputValue, setInputValue] = useState(initialQuery)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    setInputValue(q)
  }, [searchParams])

  const filteredMovies = moviesData.filter(movie => {
    const title = (movie.title[language] || movie.title['en']).toLowerCase()
    const desc = (movie.description[language] || movie.description['en']).toLowerCase()
    const q = query.toLowerCase()
    const matchesQuery = !q || title.includes(q) || desc.includes(q)
    const matchesCategory = activeCategory === 'All' || movie.category === activeCategory
    return matchesQuery && matchesCategory
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(inputValue)
  }

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />

      <div className="pt-24 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-6">
          {t.search.searchMovies}
        </h1>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2 max-w-xl">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 bg-zinc-900 border border-white/10 focus:border-white/40 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none transition-colors text-sm"
            />
            <button
              type="submit"
              className="btn-netflix px-5 py-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('All')}
            className={`category-pill ${activeCategory === 'All' ? 'active' : ''}`}
          >
            {t.categories.all}
          </button>
          {CATEGORIES.map(cat => {
            const catKey = categoryKeys[cat] as keyof typeof t.categories
            const label = catKey ? t.categories[catKey] : cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Results Count */}
        {query && (
          <p className="text-gray-400 text-sm mb-4">
            {filteredMovies.length} result{filteredMovies.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-400 text-lg font-medium">{t.search.noResults}</p>
            {query && (
              <p className="text-gray-600 text-sm mt-2">
                Try a different search term or category
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-[#E50914] font-bold">SIX</span>
          <span className="text-white font-bold">FILMS</span>
          <span className="text-gray-500">.STORE</span>
          {' '}— All rights reserved.
        </p>
      </footer>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#141414] min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
