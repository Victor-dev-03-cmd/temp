import { type NextRequest, NextResponse } from "next/server"

// Mock orders storage
const orders: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const status = searchParams.get("status")

  let filteredOrders = [...orders]

  if (userId) {
    filteredOrders = filteredOrders.filter((order) => order.userId === userId)
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status)
  }

  return NextResponse.json({ orders: filteredOrders })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const order = {
      id: `ORD-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(order)

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
