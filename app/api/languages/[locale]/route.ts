import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const translations: { [key: string]: any } = {
    en: {
      "welcome": "Welcome",
      "home": "Home",
    },
    ta: {
      "welcome": "வரவேற்பு",
      "home": "முகப்பு",
    }
  };

  const selectedTranslations = translations[locale as string] || translations.en;

  return NextResponse.json({
    translations: selectedTranslations,
    locale: locale,
  });
}
