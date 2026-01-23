import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ items: [] })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                temple: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    })

    return NextResponse.json({
      items:
        cart?.items.map((item) => ({
          id: item.id,
          productId: item.productId,
          templeId: item.product.templeId,
          quantity: item.quantity,
          product: {
            id: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            price: Number(item.product.price),
            featuredImage: item.product.featuredImage,
            stock: item.product.stock,
            temple: item.product.temple,
          },
        })) || [],
    })
  } catch (error) {
    console.error("Cart fetch error:", error)
    return NextResponse.json({ items: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ message: "Please login to add items to cart" }, { status: 401 })
    }

    const { productId, quantity = 1 } = await request.json()

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.id },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.id },
      })
    }

    // Check if item exists
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }

    return NextResponse.json({ message: "Item added to cart" })
  } catch (error) {
    console.error("Cart add error:", error)
    return NextResponse.json({ message: "Failed to add item to cart" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    const cart = await prisma.cart.findUnique({
      where: { userId: session.id },
    })

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 })
    }

    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      })
    } else {
      await prisma.cartItem.updateMany({
        where: { cartId: cart.id, productId },
        data: { quantity },
      })
    }

    return NextResponse.json({ message: "Cart updated" })
  } catch (error) {
    console.error("Cart update error:", error)
    return NextResponse.json({ message: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    const cart = await prisma.cart.findUnique({
      where: { userId: session.id },
    })

    if (cart && productId) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      })
    }

    return NextResponse.json({ message: "Item removed" })
  } catch (error) {
    console.error("Cart delete error:", error)
    return NextResponse.json({ message: "Failed to remove item" }, { status: 500 })
  }
}
