import { type NextRequest, NextResponse } from "next/server"
import { register } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.email || !data.password || !data.name) {
      return NextResponse.json({ message: "Email, password, and name are required" }, { status: 400 })
    }

    if (data.password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 })
    }

    const user = await register(data)

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      message: "Registration successful",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 },
    )
  }
}
