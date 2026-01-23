import { type NextRequest, NextResponse } from "next/server"

// Replace with your own data fetching logic
const fetchLanguage = async (locale: string) => {
  // In a real application, you would fetch this from a database or a file
  const languages: Record<string, any> = {
    en: {
      translations: { "nav.home": "Home", "nav.temples": "Temples" },
      name: "English",
      nativeName: "English",
    },
    ta: {
      translations: { "nav.home": "முகப்பு", "nav.temples": "கோயில்கள்" },
      name: "Tamil",
      nativeName: "தமிழ்",
    },
  }
  return languages[locale] || null
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  try {
    const { locale } = await params

    const language = await fetchLanguage(locale)

    if (!language) {
      return NextResponse.json({
        translations: {},
        locale,
      })
    }

    return NextResponse.json({
      translations: language.translations,
      locale: locale,
      name: language.name,
      nativeName: language.nativeName,
    })
  } catch (error) {
    console.error("Language fetch error:", error)
    return NextResponse.json({
      translations: {},
      locale: "en",
    })
  }
}
