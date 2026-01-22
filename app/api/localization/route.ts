import { NextResponse } from "next/server"
import localizationConfig from "@/config/localization.json"

export async function GET() {
  // Return only enabled languages and currencies
  const enabledLanguages = localizationConfig.languages.filter((l) => l.enabled)
  const enabledCurrencies = localizationConfig.currencies.filter((c) => c.enabled)

  return NextResponse.json({
    languages: enabledLanguages,
    currencies: enabledCurrencies,
    defaultLanguage: localizationConfig.languages.find((l) => l.default)?.code || "en",
    defaultCurrency: localizationConfig.currencies.find((c) => c.default)?.code || "USD",
  })
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    // In production, this would update the config file or database
    // For now, we return success
    return NextResponse.json({ success: true, message: "Localization settings updated" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 })
  }
}
