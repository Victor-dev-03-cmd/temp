import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 })
  }

  const {
    templeName,
    ownerName,
    address,
    country,
    state,
    city,
    vendorEmail,
    vendorMobile,
  } = await request.json()

  if (!templeName || !ownerName || !address || !country || !state || !city || !vendorEmail || !vendorMobile) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('vendor_requests')
    .insert({
      user_id: user.id,
      temple_name: templeName,
      owner_name: ownerName,
      address,
      country,
      state,
      city,
      vendor_email: vendorEmail,
      vendor_mobile: vendorMobile,
      status: 'PENDING',
    })
    .select()
    .single()

  if (error) {
    console.error("Error submitting vendor request:", error)
    return NextResponse.json({ message: error.message || "Failed to submit vendor request." }, { status: 500 })
  }

  return NextResponse.json({ message: "Vendor request submitted successfully.", request: data })
}
