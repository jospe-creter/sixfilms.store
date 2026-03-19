'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, getTranslations, Translations } from '@/lib/i18n'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: getTranslations('en'),
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sixfilms-language') as Language | null
    if (stored && ['en', 'rw', 'sw', 'fr'].includes(stored)) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('sixfilms-language', lang)
    }
  }

  const t = getTranslations(language)

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage, t: getTranslations('en') }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
