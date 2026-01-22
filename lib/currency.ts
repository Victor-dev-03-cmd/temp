import { prisma } from "./prisma"

export interface CurrencyInfo {
  code: string
  name: string
  symbol: string
  exchangeRate: number
}

export async function getCurrencies(): Promise<CurrencyInfo[]> {
  const currencies = await prisma.currency.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  })

  return currencies.map((c) => ({
    code: c.code,
    name: c.name,
    symbol: c.symbol,
    exchangeRate: Number(c.exchangeRate),
  }))
}

export async function getDefaultCurrency(): Promise<CurrencyInfo> {
  const currency = await prisma.currency.findFirst({
    where: { isDefault: true, isActive: true },
  })

  if (!currency) {
    return {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
      exchangeRate: 1,
    }
  }

  return {
    code: currency.code,
    name: currency.name,
    symbol: currency.symbol,
    exchangeRate: Number(currency.exchangeRate),
  }
}

export function convertCurrency(amount: number, fromRate: number, toRate: number): number {
  // Convert to base currency (USD) first, then to target
  const baseAmount = amount / fromRate
  return baseAmount * toRate
}

export function formatCurrency(amount: number, currencyCode: string, symbol: string): string {
  return `${symbol}${amount.toFixed(2)}`
}
