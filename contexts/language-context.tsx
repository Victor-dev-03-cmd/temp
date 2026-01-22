"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

interface LanguageContextType {
  locale: string
  languages: Language[]
  currentLanguage: Language
  translations: Record<string, string>
  setLocale: (locale: string) => void
  t: (key: string, fallback?: string) => string
}

const defaultLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰" },
  { code: "my", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("en")
  const [languages] = useState<Language[]>(defaultLanguages)
  const [translations, setTranslations] = useState<Record<string, string>>({})

  const currentLanguage = languages.find((l) => l.code === locale) || languages[0]

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "en"
    setLocaleState(savedLocale)
    loadTranslations(savedLocale)
  }, [])

  const loadTranslations = async (loc: string) => {
    try {
      const res = await fetch(`/api/languages/${loc}`)
      if (res.ok) {
        const data = await res.json()
        setTranslations(data.translations || {})
      }
    } catch (error) {
      console.error("Failed to load translations:", error)
    }
  }

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    loadTranslations(newLocale)
  }

  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key
  }

  return (
    <LanguageContext.Provider value={{ locale, languages, currentLanguage, translations, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
