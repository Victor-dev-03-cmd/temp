import { type NextRequest, NextResponse } from "next/server"

const temples = [
  {
    id: "1",
    name: "Sri Ranganathaswamy Temple",
    slug: "sri-ranganathaswamy-temple",
    description: "One of the most illustrious Vaishnava temples in South India.",
    location: "Srirangam, Tamil Nadu, India",
    image: "/hindu-temple-gopuram-colorful.jpg",
    rating: 4.9,
    reviews: 1250,
    ticketCount: 8,
    productCount: 24,
    featured: true,
    status: "APPROVED",
  },
  {
    id: "2",
    name: "Meenakshi Amman Temple",
    slug: "meenakshi-amman-temple",
    description: "Historic Hindu temple dedicated to Meenakshi, a form of Parvati.",
    location: "Madurai, Tamil Nadu, India",
    image: "/meenakshi-temple-towers.jpg",
    rating: 4.8,
    reviews: 980,
    ticketCount: 12,
    productCount: 35,
    featured: true,
    status: "APPROVED",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get("featured")
  const search = searchParams.get("search")

  let filteredTemples = temples.filter((t) => t.status === "APPROVED")

  if (featured === "true") {
    filteredTemples = filteredTemples.filter((t) => t.featured)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredTemples = filteredTemples.filter(
      (t) => t.name.toLowerCase().includes(searchLower) || t.location.toLowerCase().includes(searchLower),
    )
  }

  return NextResponse.json({ temples: filteredTemples })
}
