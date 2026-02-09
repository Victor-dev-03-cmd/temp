import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, country } = await request.json() // <-- இங்கே country பெறப்படுகிறது

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Email, password, and name are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 })
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          country, // <-- இங்கே country அனுப்பப்படுகிறது
        },
      },
    })

    if (error) {
      // Supabase-ல் இருந்து வரும் பிழையை நேரடியாகக் காட்டுகிறோம்.
      // இது "Database error saving new user" போன்ற தெளிவான செய்தியைக் கொடுக்கும்.
      return NextResponse.json({ message: error.message }, { status: 400 })
    }

    if (!data.user) {
      return NextResponse.json({ message: "Registration failed for an unknown reason." }, { status: 500 })
    }

    return NextResponse.json({
      user: { id: data.user.id, email: data.user.email, name: data.user.user_metadata.name },
      message: "Registration successful. Please check your email for verification.",
    })
  } catch (error) {
    console.error("Registration API error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An unexpected error occurred." },
      { status: 500 },
    )
  }
}
