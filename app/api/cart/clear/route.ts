import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.id },
    })

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      })
    }

    return NextResponse.json({ message: "Cart cleared" })
  } catch (error) {
    console.error("Cart clear error:", error)
    return NextResponse.json({ message: "Failed to clear cart" }, { status: 500 })
  }
}
