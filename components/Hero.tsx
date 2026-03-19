'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { Language } from '@/lib/i18n'

type Movie = {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  thumbnail: string
  videoUrl: string
  downloadUrl: string
  category: string
  year: number
  rating: string
  duration: string
}

type HeroProps = {
  movie: Movie
}

export default function Hero({ movie }: HeroProps) {
  const { language, t } = useLanguage()
  const router = useRouter()

  const title = movie.title[language] || movie.title['en']
  const description = movie.description[language] || movie.description['en']

  return (
    <div className="relative w-full h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.thumbnail.replace('/400/225', '/1920/1080')})` }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-40 hero-gradient-bottom" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl pt-16">
            {/* Category Badge */}
            <span className="inline-block text-xs font-semibold tracking-widest text-[#E50914] uppercase mb-3 bg-[#E50914]/10 px-3 py-1 rounded">
              {movie.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
              {title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-300">
              <span className="text-green-400 font-semibold">{movie.rating}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>{movie.year}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>{movie.duration}</span>
            </div>

            {/* Description */}
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 line-clamp-3 drop-shadow">
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push(`/movie/${movie.id}`)}
                className="btn-netflix text-base px-6 py-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t.hero.watchNow}
              </button>

              <button
                onClick={() => router.push(`/movie/${movie.id}`)}
                className="btn-secondary text-base px-6 py-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.hero.moreInfo}
              </button>

              <a
                href={movie.downloadUrl}
                download
                className="btn-secondary text-base px-6 py-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.hero.download}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
