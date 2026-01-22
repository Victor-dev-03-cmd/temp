import { MainLayout } from "@/components/layout/main-layout"
import { CheckoutClient } from "@/components/checkout/checkout-client"

export const metadata = {
  title: "Checkout - Temple Platform",
  description: "Complete your purchase",
}

export default function CheckoutPage() {
  return (
    <MainLayout>
      <CheckoutClient />
    </MainLayout>
  )
}
