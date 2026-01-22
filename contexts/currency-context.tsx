"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
  exchangeRate: number
}

interface CurrencyContextType {
  currency: Currency
  currencies: Currency[]
  setCurrency: (code: string) => void
  convert: (amount: number, fromCode?: string) => number
  format: (amount: number) => string
}

const defaultCurrencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", exchangeRate: 1 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", exchangeRate: 83.12 },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", flag: "🇱🇰", exchangeRate: 324.5 },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", exchangeRate: 4.72 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", exchangeRate: 1.35 },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", exchangeRate: 0.79 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", exchangeRate: 0.92 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", exchangeRate: 1.53 },
]

const defaultCurrency = defaultCurrencies[0]

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrency)
  const [currencies] = useState<Currency[]>(defaultCurrencies)

  useEffect(() => {
    const savedCode = localStorage.getItem("currency")
    if (savedCode) {
      const saved = currencies.find((c) => c.code === savedCode)
      if (saved) setCurrencyState(saved)
    }
  }, [currencies])

  const setCurrency = (code: string) => {
    const selected = currencies.find((c) => c.code === code)
    if (selected) {
      setCurrencyState(selected)
      localStorage.setItem("currency", code)
    }
  }

  const convert = (amount: number, fromCode?: string): number => {
    if (!fromCode || fromCode === currency.code) {
      return amount * currency.exchangeRate
    }
    const fromCurrency = currencies.find((c) => c.code === fromCode)
    if (!fromCurrency) return amount
    const baseAmount = amount / fromCurrency.exchangeRate
    return baseAmount * currency.exchangeRate
  }

  const format = (amount: number): string => {
    return `${currency.symbol}${amount.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, currencies, setCurrency, convert, format }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
