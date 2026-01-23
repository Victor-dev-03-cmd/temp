import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  try {
    const { locale } = await params

    const language = await prisma.language.findUnique({
      where: { code: locale, isActive: true },
    })

    if (!language) {
      return NextResponse.json({
        translations: {},
        locale,
      })
    }

    const translations = JSON.parse(language.translations || "{}")

    return NextResponse.json({
      translations,
      locale: language.code,
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
