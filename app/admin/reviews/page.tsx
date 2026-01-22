import { Suspense } from "react"
import AdminReviewsClient from "./reviews-client"

export default function AdminReviewsPage() {
  return (
    <Suspense fallback={null}>
      <AdminReviewsClient />
    </Suspense>
  )
}
