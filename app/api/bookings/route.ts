import { type NextRequest, NextResponse } from "next/server"

// Mock bookings storage
const bookings: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const templeId = searchParams.get("templeId")
  const date = searchParams.get("date")

  let filteredBookings = [...bookings]

  if (userId) {
    filteredBookings = filteredBookings.filter((b) => b.userId === userId)
  }

  if (templeId) {
    filteredBookings = filteredBookings.filter((b) => b.templeId === templeId)
  }

  if (date) {
    filteredBookings = filteredBookings.filter((b) => b.date === date)
  }

  return NextResponse.json({ bookings: filteredBookings })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate booking data
    if (!body.ticketId || !body.date || !body.time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check availability (mock)
    const booking = {
      id: `BKG-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      ...body,
      status: "CONFIRMED",
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BKG-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    bookings.push(booking)

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
