import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketCode, vendorId, scannedBy } = body

    if (!ticketCode) {
      return NextResponse.json({ error: "Ticket code is required" }, { status: 400 })
    }

    // In production, update the database
    // For now, return success response
    const usedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: "Ticket marked as used successfully",
      data: {
        ticketCode,
        usedAt,
        scannedBy,
        vendorId,
      },
    })
  } catch (error) {
    console.error("Mark ticket used error:", error)
    return NextResponse.json({ error: "Failed to mark ticket as used" }, { status: 500 })
  }
}
