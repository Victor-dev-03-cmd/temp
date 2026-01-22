import { prisma } from "./prisma"

export interface SiteSettings {
  siteName: string
  siteDescription: string
  logoUrl: string
  logoWidth: number
  logoHeight: number
  faviconUrl: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  maintenanceMode: boolean
  maintenanceMessage: string
  defaultCurrency: string
  defaultLanguage: string
  emailFromName: string
  emailFromAddress: string
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  smtpSecure: boolean
  stripePublicKey: string
  stripeSecretKey: string
  stripeWebhookSecret: string
  googleMapsApiKey: string
  serviceFeePercentage: number
  minWithdrawalAmount: number
  autoApproveReviews: boolean
  enableMultipleCurrencies: boolean
  enableMultipleLanguages: boolean
}

const defaultSettings: SiteSettings = {
  siteName: "Temple Platform",
  siteDescription: "Book tickets and shop from temples worldwide",
  logoUrl: "/logo.png",
  logoWidth: 150,
  logoHeight: 50,
  faviconUrl: "/favicon.ico",
  primaryColor: "#B8860B",
  secondaryColor: "#8B4513",
  fontFamily: "Inter",
  maintenanceMode: false,
  maintenanceMessage: "We are currently undergoing maintenance. Please check back soon.",
  defaultCurrency: "USD",
  defaultLanguage: "en",
  emailFromName: "Temple Platform",
  emailFromAddress: "noreply@templeplatform.com",
  smtpHost: "",
  smtpPort: 587,
  smtpUsername: "",
  smtpPassword: "",
  smtpSecure: false,
  stripePublicKey: "",
  stripeSecretKey: "",
  stripeWebhookSecret: "",
  googleMapsApiKey: "",
  serviceFeePercentage: 2.5,
  minWithdrawalAmount: 100,
  autoApproveReviews: false,
  enableMultipleCurrencies: true,
  enableMultipleLanguages: true,
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await prisma.setting.findMany()
    const settingsMap: Record<string, string> = {}

    settings.forEach((setting) => {
      settingsMap[setting.key] = setting.value
    })

    return {
      ...defaultSettings,
      ...Object.fromEntries(
        Object.entries(settingsMap).map(([key, value]) => {
          const defaultValue = defaultSettings[key as keyof SiteSettings]
          if (typeof defaultValue === "boolean") {
            return [key, value === "true"]
          }
          if (typeof defaultValue === "number") {
            return [key, Number.parseFloat(value) || defaultValue]
          }
          return [key, value]
        }),
      ),
    } as SiteSettings
  } catch {
    return defaultSettings
  }
}

export async function getSetting<K extends keyof SiteSettings>(key: K): Promise<SiteSettings[K]> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key },
    })

    if (!setting) {
      return defaultSettings[key]
    }

    const defaultValue = defaultSettings[key]
    if (typeof defaultValue === "boolean") {
      return (setting.value === "true") as SiteSettings[K]
    }
    if (typeof defaultValue === "number") {
      return (Number.parseFloat(setting.value) || defaultValue) as SiteSettings[K]
    }
    return setting.value as SiteSettings[K]
  } catch {
    return defaultSettings[key]
  }
}

export async function updateSetting(key: string, value: string | number | boolean): Promise<void> {
  const stringValue = String(value)

  await prisma.setting.upsert({
    where: { key },
    update: { value: stringValue },
    create: {
      key,
      value: stringValue,
      type: typeof value,
    },
  })
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<void> {
  const operations = Object.entries(settings).map(([key, value]) =>
    prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: {
        key,
        value: String(value),
        type: typeof value,
      },
    }),
  )

  await prisma.$transaction(operations)
}
