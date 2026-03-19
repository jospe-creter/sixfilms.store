'use client'

import { useRef } from 'react'
import MovieCard from './MovieCard'
import { useLanguage } from '@/context/LanguageContext'
import { categoryKeys } from '@/lib/i18n'

type Movie = {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  thumbnail: string
  category: string
  year: number
  rating: string
  duration: string
}

type MovieRowProps = {
  category: string
  movies: Movie[]
}

export default function MovieRow({ category, movies }: MovieRowProps) {
  const { t } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 600
      scrollRef.current.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      })
    }
  }

  if (movies.length === 0) return null

  const catKey = categoryKeys[category] as keyof typeof t.categories
  const categoryLabel = catKey ? t.categories[catKey] : category

  return (
    <div className="mb-8 group/row">
      {/* Row Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-3">
        <h2 className="text-lg sm:text-xl font-bold text-white group-hover/row:text-[#E50914] transition-colors">
          {categoryLabel}
          <span className="ml-2 text-[#E50914] text-sm opacity-0 group-hover/row:opacity-100 transition-opacity">
            ›
          </span>
        </h2>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/70 hover:bg-black/90 text-white opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/70 hover:bg-black/90 text-white opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Movies */}
        <div
          ref={scrollRef}
          className="scroll-row px-4 sm:px-6 lg:px-8"
        >
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}
