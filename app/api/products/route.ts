import { type NextRequest, NextResponse } from "next/server"

// Mock products data
const products = [
  {
    id: "1",
    templeId: "1",
    name: "Brass Diya Set",
    sku: "PRD-001",
    category: "POOJA_ITEMS",
    description: "Traditional brass oil lamps for pooja",
    price: 45,
    costPrice: 30,
    stock: 50,
    image: "/brass-diya-lamp.png",
    isActive: true,
  },
  {
    id: "2",
    templeId: "1",
    name: "Sandalwood Prayer Beads",
    sku: "PRD-002",
    category: "ACCESSORIES",
    description: "108 bead mala for meditation and chanting",
    price: 35,
    costPrice: 20,
    stock: 100,
    image: "/prayer-beads.jpg",
    isActive: true,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const templeId = searchParams.get("templeId")
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filteredProducts = [...products]

  if (templeId) {
    filteredProducts = filteredProducts.filter((p) => p.templeId === templeId)
  }

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
    )
  }

  // Filter only active products with stock
  filteredProducts = filteredProducts.filter((p) => p.isActive)

  return NextResponse.json({ products: filteredProducts })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.templeId || !body.name || body.price === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newProduct = {
      id: `${Date.now()}`,
      sku: `PRD-${Date.now()}`,
      ...body,
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json({ product: newProduct })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
