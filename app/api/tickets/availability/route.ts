import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ticketId = searchParams.get("ticketId")
  const date = searchParams.get("date")

  if (!ticketId || !date) {
    return NextResponse.json({ error: "ticketId and date are required" }, { status: 400 })
  }

  // Mock availability check
  const availability = {
    ticketId,
    date,
    slots: [
      { time: "6:00 AM", available: 15, total: 20 },
      { time: "7:00 AM", available: 8, total: 20 },
      { time: "8:00 AM", available: 20, total: 20 },
      { time: "9:00 AM", available: 0, total: 15 },
      { time: "11:00 AM", available: 12, total: 15 },
      { time: "3:00 PM", available: 15, total: 15 },
      { time: "5:00 PM", available: 10, total: 15 },
    ],
  }

  return NextResponse.json(availability)
}
