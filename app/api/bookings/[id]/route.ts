import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Mock booking lookup
  const booking = {
    id,
    status: "CONFIRMED",
    ticketName: "VIP Darshan",
    temple: "Sri Ranganathaswamy Temple",
    date: "2024-12-30",
    time: "9:00 AM",
    devotee: "John Doe",
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${id}`,
  }

  return NextResponse.json({ booking })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  // Update booking
  const updatedBooking = {
    id,
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({ booking: updatedBooking })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Cancel booking
  return NextResponse.json({
    success: true,
    message: `Booking ${id} cancelled`,
  })
}
