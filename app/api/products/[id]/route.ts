import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Mock product lookup
  const product = {
    id,
    name: "Brass Diya Set",
    price: 45,
    stock: 50,
    description: "Traditional brass oil lamps",
    image: "/brass-diya-lamp.png",
  }

  return NextResponse.json({ product })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()

  const updatedProduct = {
    id,
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({ product: updatedProduct })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return NextResponse.json({
    success: true,
    message: `Product ${id} deleted`,
  })
}
