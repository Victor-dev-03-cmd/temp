import { Suspense } from "react"
import { BookingsClient } from "./bookings-client"

export default function VendorBookingsPage() {
  return (
    <Suspense fallback={null}>
      <BookingsClient />
    </Suspense>
  )
}
