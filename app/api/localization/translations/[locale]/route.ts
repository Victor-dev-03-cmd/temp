import { NextResponse } from "next/server"
import localizationConfig from "@/config/localization.json"

export async function GET(request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const translations =
    localizationConfig.translations[locale as keyof typeof localizationConfig.translations] ||
    localizationConfig.translations.en

  return NextResponse.json({ translations })
}
