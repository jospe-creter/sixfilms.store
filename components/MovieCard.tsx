'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

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

type MovieCardProps = {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { language } = useLanguage()
  const title = movie.title[language] || movie.title['en']

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="movie-card relative group cursor-pointer rounded-md overflow-hidden bg-zinc-900 w-[200px] sm:w-[230px]">
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={movie.thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />

          {/* Play overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            {movie.rating}
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5">
          <h3 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-[#E50914] transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
            <span>{movie.year}</span>
            <span className="w-0.5 h-0.5 bg-gray-600 rounded-full" />
            <span>{movie.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
