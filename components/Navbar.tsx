'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { languages, Language } from '@/lib/i18n'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus()
    }
  }, [showSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  const currentLang = languages.find(l => l.code === language)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-blur ${
        scrolled
          ? 'bg-black/95 shadow-lg shadow-black/50'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl sm:text-2xl font-black tracking-tight">
                <span className="text-[#E50914]">SIX</span>
                <span className="text-white">FILMS</span>
                <span className="text-gray-400 text-sm font-normal">.STORE</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-5">
              <Link href="/" className="text-sm text-gray-200 hover:text-white transition-colors">
                {t.nav.home}
              </Link>
              <Link href="/search" className="text-sm text-gray-200 hover:text-white transition-colors">
                {t.nav.movies}
              </Link>
              <Link href="/search" className="text-sm text-gray-200 hover:text-white transition-colors">
                {t.nav.myList}
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.search.placeholder}
                    className="bg-black/80 border border-white/30 text-white text-sm px-3 py-1.5 rounded-l focus:outline-none focus:border-white/70 w-40 sm:w-56"
                    onBlur={() => {
                      if (!searchQuery) setShowSearch(false)
                    }}
                  />
                  <button
                    type="submit"
                    className="bg-white/10 border border-white/30 border-l-0 px-3 py-1.5 rounded-r hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-300 hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded border border-white/10 hover:border-white/20"
              >
                <span>{currentLang?.flag}</span>
                <span className="hidden sm:inline">{currentLang?.label}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${showLangMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl shadow-black/50 overflow-hidden z-50">
                  <div className="py-1">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language)
                          setShowLangMenu(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          language === lang.code
                            ? 'bg-[#E50914]/20 text-white'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {language === lang.code && (
                          <svg className="w-4 h-4 ml-auto text-[#E50914]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
