import { Suspense } from "react"
import AdminEventsClient from "./events-client"

export default function AdminEventsPage() {
  return (
    <Suspense fallback={null}>
      <AdminEventsClient />
    </Suspense>
  )
}
