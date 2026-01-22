import { MainLayout } from "@/components/layout/main-layout"
import { CartClient } from "@/components/cart/cart-client"

export const metadata = {
  title: "Shopping Cart - Temple Platform",
  description: "Review your cart and proceed to checkout",
}

export default function CartPage() {
  return (
    <MainLayout>
      <CartClient />
    </MainLayout>
  )
}
