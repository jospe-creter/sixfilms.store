import { notFound } from 'next/navigation'
import moviesData from '@/data/movies.json'
import MovieDetailClient from '@/components/MovieDetailClient'

type Props = {
  params: { id: string }
}

export function generateStaticParams() {
  return moviesData.map(movie => ({ id: movie.id }))
}

export function generateMetadata({ params }: Props) {
  const movie = moviesData.find(m => m.id === params.id)
  if (!movie) return { title: 'Movie Not Found' }
  return {
    title: `${movie.title.en} — SIXFILMS.STORE`,
    description: movie.description.en,
  }
}

export default function MoviePage({ params }: Props) {
  const movie = moviesData.find(m => m.id === params.id)

  if (!movie) {
    notFound()
  }

  const relatedMovies = moviesData
    .filter(m => m.category === movie.category && m.id !== movie.id)
    .slice(0, 6)

  return <MovieDetailClient movie={movie} relatedMovies={relatedMovies} />
}
