import { MainLayout } from "@/components/layout/main-layout"
import { ShopClient } from "@/components/shop/shop-client"

export const metadata = {
  title: "Shop - Temple Platform",
  description: "Shop for religious items, prasadam, and temple merchandise",
}

export default function ShopPage() {
  return (
    <MainLayout>
      <ShopClient />
    </MainLayout>
  )
}
