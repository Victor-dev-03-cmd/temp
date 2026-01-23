import { NextResponse } from "next/server"

// Replace with your own data fetching logic
const fetchCurrencies = async () => {
  // In a real application, you would fetch this from a database or a file
  return [
    { code: "USD", name: "US Dollar", symbol: "$", exchangeRate: 1, isDefault: true },
    { code: "INR", name: "Indian Rupee", symbol: "₹", exchangeRate: 83, isDefault: false },
    { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", exchangeRate: 325, isDefault: false },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", exchangeRate: 4.7, isDefault: false },
  ]
}

export async function GET() {
  try {
    const currencies = await fetchCurrencies()
    const defaultCurrency = currencies.find((c) => c.isDefault)

    return NextResponse.json({
      currencies: currencies.map((c) => ({
        code: c.code,
        name: c.name,
        symbol: c.symbol,
        exchangeRate: c.exchangeRate,
      })),
      default: defaultCurrency?.code || "USD",
    })
  } catch (error) {
    console.error("Currencies fetch error:", error)
    // Return default currency if database is not available
    return NextResponse.json({
      currencies: [
        { code: "USD", name: "US Dollar", symbol: "$", exchangeRate: 1 },
        { code: "INR", name: "Indian Rupee", symbol: "₹", exchangeRate: 83 },
        { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", exchangeRate: 325 },
        { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", exchangeRate: 4.7 },
      ],
      default: "USD",
    })
  }
}
