import { type NextRequest, NextResponse } from "next/server"

// Mock cart storage (in production, use database)
const carts = new Map<string, any[]>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, billingDetails, paymentMethod } = body

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    if (!billingDetails?.email || !billingDetails?.firstName) {
      return NextResponse.json({ error: "Billing details required" }, { status: 400 })
    }

    // Calculate totals
    const subtotal = items.reduce((acc: number, item: any) => {
      const itemTotal = item.price * item.quantity
      const extraCharge = item.extraPersons ? item.extraPersons * (item.extraPersonCharge || 0) : 0
      return acc + itemTotal + extraCharge
    }, 0)

    const serviceFee = subtotal * 0.025 // 2.5% service fee
    const total = subtotal + serviceFee

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order record
    const order = {
      id: orderId,
      items,
      billingDetails,
      paymentMethod,
      subtotal,
      serviceFee,
      total,
      status: "PENDING",
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString(),
    }

    // In production, save to database and create Stripe payment intent
    // For now, simulate successful payment
    order.status = "CONFIRMED"
    order.paymentStatus = "PAID"

    // Generate tickets for ticket items
    const tickets = items
      .filter((item: any) => item.type === "TICKET")
      .map((item: any) => ({
        id: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        orderId,
        ...item,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${orderId}-${item.id}`,
      }))

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        tickets,
      },
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
