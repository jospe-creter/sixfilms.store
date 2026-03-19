import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MovieRow from '@/components/MovieRow'
import moviesData from '@/data/movies.json'

const CATEGORIES = ['Action', 'Romance', 'Rwandan Films', 'Thriller', 'Comedy']

export default function Home() {
  const featuredMovie = moviesData[0]

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />

      {/* Hero */}
      <Hero movie={featuredMovie} />

      {/* Movie Rows */}
      <div className="pb-16 -mt-20 relative z-10">
        {CATEGORIES.map(category => {
          const movies = moviesData.filter(m => m.category === category)
          return (
            <MovieRow
              key={category}
              category={category}
              movies={movies}
            />
          )
        })}
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
