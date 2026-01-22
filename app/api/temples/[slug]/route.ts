import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Mock temple lookup
  const temple = {
    id: "1",
    name: "Sri Ranganathaswamy Temple",
    slug,
    description: "One of the most illustrious Vaishnava temples in South India.",
    location: "Srirangam, Tamil Nadu, India",
    address: "Srirangam, Tiruchirappalli, Tamil Nadu 620006, India",
    image: "/hindu-temple-gopuram-colorful.jpg",
    rating: 4.9,
    reviews: 1250,
    timings: {
      weekday: "6:00 AM - 9:00 PM",
      weekend: "6:00 AM - 9:00 PM",
    },
    contact: {
      phone: "+91 431 243 0257",
      email: "info@srirangam.org",
    },
    amenities: ["Parking", "Wheelchair Access", "Shoe Storage", "Prasadam Counter"],
  }

  return NextResponse.json({ temple })
}
