import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Mock order lookup
  const order = {
    id,
    status: "CONFIRMED",
    paymentStatus: "PAID",
    items: [],
    total: 0,
    createdAt: new Date().toISOString(),
  }

  return NextResponse.json({ order })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  // Update order status
  const updatedOrder = {
    id,
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({ order: updatedOrder })
}
