import { type NextRequest, NextResponse } from "next/server"

// Mock tickets data
const tickets = [
  {
    id: "1",
    templeId: "1",
    name: "Morning Pooja Ticket",
    type: "POOJA",
    description: "Special morning pooja with archana for your family",
    price: 50,
    maxPerDay: 100,
    availableSlots: 85,
    requiresRasi: true,
    requiresNakshatram: true,
    timings: ["6:00 AM", "7:00 AM", "8:00 AM"],
    maxExtraPersons: 4,
    extraPersonCharge: 10,
    isActive: true,
  },
  {
    id: "2",
    templeId: "1",
    name: "VIP Darshan",
    type: "DARSHAN",
    description: "Skip the queue with VIP darshan access",
    price: 200,
    maxPerDay: 50,
    availableSlots: 23,
    requiresRasi: false,
    requiresNakshatram: false,
    timings: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
    maxExtraPersons: 3,
    extraPersonCharge: 150,
    isActive: true,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const templeId = searchParams.get("templeId")
  const type = searchParams.get("type")
  const date = searchParams.get("date")

  let filteredTickets = [...tickets]

  if (templeId) {
    filteredTickets = filteredTickets.filter((t) => t.templeId === templeId)
  }

  if (type) {
    filteredTickets = filteredTickets.filter((t) => t.type === type)
  }

  // Filter only active tickets
  filteredTickets = filteredTickets.filter((t) => t.isActive)

  return NextResponse.json({ tickets: filteredTickets })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.templeId || !body.name || !body.type || body.price === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newTicket = {
      id: `${Date.now()}`,
      ...body,
      availableSlots: body.maxPerDay,
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    tickets.push(newTicket)

    return NextResponse.json({ ticket: newTicket })
  } catch (error) {
    console.error("Create ticket error:", error)
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}
