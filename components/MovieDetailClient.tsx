'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import moviesData from '@/data/movies.json'

type Movie = (typeof moviesData)[0]

type MovieDetailClientProps = {
  movie: Movie
  relatedMovies: Movie[]
}

export default function MovieDetailClient({ movie, relatedMovies }: MovieDetailClientProps) {
  const { language, t } = useLanguage()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  const title = movie.title[language] || movie.title['en']
  const description = movie.description[language] || movie.description['en']

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />

      <div className="pt-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 mt-4 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.movie.back}
        </button>

        {/* Video Player Section */}
        <div className="w-full bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50 mb-8">
          <video
            ref={videoRef}
            src={movie.videoUrl}
            controls
            className="w-full aspect-video"
            poster={movie.thumbnail.replace('/400/225', '/1280/720')}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Movie Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            {/* Category + Title */}
            <span className="text-xs font-semibold tracking-widest text-[#E50914] uppercase">
              {movie.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-3">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-gray-400">
              <span className="text-green-400 font-semibold border border-green-400/30 px-2 py-0.5 rounded text-xs">
                {movie.rating}
              </span>
              <span>{movie.year}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span>{movie.duration}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play()
                    videoRef.current.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="btn-netflix px-6 py-2.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t.movie.play}
              </button>

              <a
                href={movie.downloadUrl}
                download
                className="btn-secondary px-6 py-2.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.movie.download}
              </a>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#E50914] rounded-full inline-block" />
                {t.movie.description}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Thumbnail Sidebar */}
          <div className="hidden lg:block">
            <div className="rounded-lg overflow-hidden shadow-lg sticky top-24">
              <img
                src={movie.thumbnail}
                alt={title}
                className="w-full aspect-video object-cover"
              />
              <div className="bg-zinc-900 p-4">
                <p className="text-gray-400 text-sm font-medium mb-2">Quick Info</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Year</span>
                    <span className="text-white">{movie.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="text-white">{movie.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rating</span>
                    <span className="text-white">{movie.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Genre</span>
                    <span className="text-white">{movie.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#E50914] rounded-full inline-block" />
              {t.movie.relatedMovies}
            </h2>
            <div className="flex flex-wrap gap-4">
              {relatedMovies.map(m => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
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
