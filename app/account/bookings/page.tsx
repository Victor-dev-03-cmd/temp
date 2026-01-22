import { MainLayout } from "@/components/layout/main-layout"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { BookingsClient } from "@/components/account/bookings-client"

export const metadata = {
  title: "My Bookings - Temple Platform",
  description: "View your ticket bookings",
}

export default function BookingsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <AccountSidebar />
          <div className="flex-1">
            <BookingsClient />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
