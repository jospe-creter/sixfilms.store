export type Language = 'en' | 'rw' | 'sw' | 'fr'

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'rw', label: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'sw', label: 'Swahili', flag: '🇹🇿' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
]

export type Translations = {
  nav: {
    home: string
    search: string
    movies: string
    myList: string
    language: string
  }
  hero: {
    watchNow: string
    moreInfo: string
    download: string
  }
  movie: {
    play: string
    download: string
    back: string
    relatedMovies: string
    description: string
  }
  search: {
    placeholder: string
    noResults: string
    searchMovies: string
  }
  categories: {
    all: string
    action: string
    romance: string
    rwandanFilms: string
    thriller: string
    comedy: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      search: 'Search',
      movies: 'Movies',
      myList: 'My List',
      language: 'Language',
    },
    hero: {
      watchNow: 'Watch Now',
      moreInfo: 'More Info',
      download: 'Download',
    },
    movie: {
      play: 'Play',
      download: 'Download',
      back: 'Back',
      relatedMovies: 'Related Movies',
      description: 'Description',
    },
    search: {
      placeholder: 'Search movies...',
      noResults: 'No results found',
      searchMovies: 'Search Movies',
    },
    categories: {
      all: 'All',
      action: 'Action',
      romance: 'Romance',
      rwandanFilms: 'Rwandan Films',
      thriller: 'Thriller',
      comedy: 'Comedy',
    },
  },
  rw: {
    nav: {
      home: 'Ahabanza',
      search: 'Shakisha',
      movies: 'Filimi',
      myList: 'Urutonde Rwange',
      language: 'Ururimi',
    },
    hero: {
      watchNow: 'Reba Nonaha',
      moreInfo: 'Amakuru Menshi',
      download: 'Manura',
    },
    movie: {
      play: 'Tangira',
      download: 'Manura',
      back: 'Subira Inyuma',
      relatedMovies: 'Filimi Zifitanye Isano',
      description: 'Ibisobanuro',
    },
    search: {
      placeholder: 'Shakisha filimi...',
      noResults: 'Nta makuru abonetse',
      searchMovies: 'Shakisha Filimi',
    },
    categories: {
      all: 'Byose',
      action: 'Ibikorwa',
      romance: 'Urukundo',
      rwandanFilms: 'Filimi z\'u Rwanda',
      thriller: 'Ubwoba',
      comedy: 'Akamizero',
    },
  },
  sw: {
    nav: {
      home: 'Nyumbani',
      search: 'Tafuta',
      movies: 'Filamu',
      myList: 'Orodha Yangu',
      language: 'Lugha',
    },
    hero: {
      watchNow: 'Tazama Sasa',
      moreInfo: 'Maelezo Zaidi',
      download: 'Pakua',
    },
    movie: {
      play: 'Cheza',
      download: 'Pakua',
      back: 'Rudi',
      relatedMovies: 'Filamu Zinazohusiana',
      description: 'Maelezo',
    },
    search: {
      placeholder: 'Tafuta filamu...',
      noResults: 'Hakuna matokeo yaliyopatikana',
      searchMovies: 'Tafuta Filamu',
    },
    categories: {
      all: 'Zote',
      action: 'Vitendo',
      romance: 'Mapenzi',
      rwandanFilms: 'Filamu za Rwanda',
      thriller: 'Kutisha',
      comedy: 'Vichekesho',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      search: 'Rechercher',
      movies: 'Films',
      myList: 'Ma Liste',
      language: 'Langue',
    },
    hero: {
      watchNow: 'Regarder',
      moreInfo: 'Plus d\'infos',
      download: 'Télécharger',
    },
    movie: {
      play: 'Lire',
      download: 'Télécharger',
      back: 'Retour',
      relatedMovies: 'Films Similaires',
      description: 'Description',
    },
    search: {
      placeholder: 'Rechercher des films...',
      noResults: 'Aucun résultat trouvé',
      searchMovies: 'Rechercher des Films',
    },
    categories: {
      all: 'Tous',
      action: 'Action',
      romance: 'Romance',
      rwandanFilms: 'Films Rwandais',
      thriller: 'Thriller',
      comedy: 'Comédie',
    },
  },
}

export function getTranslations(lang: Language): Translations {
  return translations[lang]
}

export const categoryKeys: Record<string, keyof Translations['categories']> = {
  Action: 'action',
  Romance: 'romance',
  'Rwandan Films': 'rwandanFilms',
  Thriller: 'thriller',
  Comedy: 'comedy',
}
