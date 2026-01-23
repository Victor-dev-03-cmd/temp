import { type NextRequest, NextResponse } from "next/server"
// import { login } from "@/lib/auth" // Commented out as 'login' is no longer exported

export async function POST(request: NextRequest) {
  try {
    // const { email, password } = await request.json()

    // if (!email || !password) {
    //   return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    // }

    // const user = await login(email, password) // This function is no longer available

    // return NextResponse.json({ user, message: "Login successful" })
    return NextResponse.json({ message: "Login functionality is currently disabled. Please implement your own authentication logic." }, { status: 501 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: error instanceof Error ? error.message : "Login failed" }, { status: 401 })
  }
}
