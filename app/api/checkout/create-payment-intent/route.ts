import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "usd", orderId } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // In production, use Stripe to create payment intent
    // const paymentIntent = await createPaymentIntent(amount, currency, { orderId })

    // Mock response for demo
    const clientSecret = `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 24)}`

    return NextResponse.json({
      clientSecret,
      amount,
      currency,
    })
  } catch (error) {
    console.error("Payment intent error:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
