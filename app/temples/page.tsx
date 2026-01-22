import { Suspense } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { TempleList } from "@/components/temples/temple-list"
import { TempleFilters } from "@/components/temples/temple-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Ticket, Star, Shield } from "lucide-react"

export const metadata = {
  title: "Browse Temples - Temple Platform",
  description: "Discover and explore temples worldwide. Book tickets and shop products.",
}

function TempleListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-xl overflow-hidden border">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TemplesPage() {
  return (
    <MainLayout>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hindu-temple-silhouette-pattern.jpg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Sacred Temples</h1>
            <p className="text-lg text-amber-100 mb-8 leading-relaxed">
              Explore ancient temples, book darshan tickets online, and experience divine blessings from the comfort of
              your home. Plan your spiritual journey today.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <MapPin className="h-5 w-5 text-amber-300" />
                <span className="text-white font-medium">50+ Temples</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Ticket className="h-5 w-5 text-amber-300" />
                <span className="text-white font-medium">Online Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Star className="h-5 w-5 text-amber-300" />
                <span className="text-white font-medium">Verified Reviews</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Shield className="h-5 w-5 text-amber-300" />
                <span className="text-white font-medium">Secure Payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-xl" />}>
              <TempleFilters />
            </Suspense>
          </aside>

          {/* Temple Grid */}
          <div className="flex-1">
            <Suspense fallback={<TempleListSkeleton />}>
              <TempleList />
            </Suspense>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
