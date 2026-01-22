import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketCode, vendorId } = body

    if (!ticketCode) {
      return NextResponse.json({ error: "Ticket code is required" }, { status: 400 })
    }

    // Mock ticket validation - in production, query database
    const mockTickets: Record<
      string,
      {
        id: string
        ticketNumber: string
        ticketType: string
        templeName: string
        visitorName: string
        visitDate: string
        visitTime: string
        persons: number
        status: string
        usedAt?: string
      }
    > = {
      "TKT-ABC123": {
        id: "1",
        ticketNumber: "TKT-ABC123",
        ticketType: "VIP Darshan",
        templeName: "Sri Venkateswara Temple",
        visitorName: "Ramesh Kumar",
        visitDate: "2024-12-28",
        visitTime: "09:00 AM - 10:00 AM",
        persons: 2,
        status: "VALID",
      },
      "TKT-DEF456": {
        id: "2",
        ticketNumber: "TKT-DEF456",
        ticketType: "Special Darshan",
        templeName: "Sri Venkateswara Temple",
        visitorName: "Priya Sharma",
        visitDate: "2024-12-29",
        visitTime: "11:00 AM - 12:00 PM",
        persons: 4,
        status: "VALID",
      },
      "TKT-USED001": {
        id: "3",
        ticketNumber: "TKT-USED001",
        ticketType: "VIP Darshan",
        templeName: "Sri Venkateswara Temple",
        visitorName: "Test User",
        visitDate: "2024-12-27",
        visitTime: "08:00 AM - 09:00 AM",
        persons: 1,
        status: "USED",
        usedAt: "2024-12-27T08:15:00Z",
      },
    }

    const ticket = mockTickets[ticketCode.toUpperCase()]

    if (!ticket) {
      return NextResponse.json({
        valid: false,
        error: "Invalid ticket code. Ticket not found in the system.",
      })
    }

    if (ticket.status === "USED") {
      return NextResponse.json({
        valid: true,
        ticket: {
          ...ticket,
          status: "USED",
        },
        warning: "This ticket has already been used.",
      })
    }

    if (ticket.status === "CANCELLED") {
      return NextResponse.json({
        valid: false,
        error: "This ticket has been cancelled.",
        ticket,
      })
    }

    if (ticket.status === "EXPIRED") {
      return NextResponse.json({
        valid: false,
        error: "This ticket has expired.",
        ticket,
      })
    }

    return NextResponse.json({
      valid: true,
      ticket,
    })
  } catch (error) {
    console.error("Ticket validation error:", error)
    return NextResponse.json({ error: "Failed to validate ticket" }, { status: 500 })
  }
}
