import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const currencies = await prisma.currency.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    })

    const defaultCurrency = currencies.find((c) => c.isDefault)

    return NextResponse.json({
      currencies: currencies.map((c) => ({
        code: c.code,
        name: c.name,
        symbol: c.symbol,
        exchangeRate: Number(c.exchangeRate),
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
