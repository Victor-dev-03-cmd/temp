import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, ArrowRight } from "lucide-react"

const featuredTemples = [
  {
    id: "1",
    name: "Sri Ranganathaswamy Temple",
    slug: "sri-ranganathaswamy-temple",
    location: "Srirangam, Tamil Nadu, India",
    image: "/hindu-temple-gopuram-colorful.jpg",
    rating: 4.9,
    reviews: 1250,
    ticketPrice: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Meenakshi Amman Temple",
    slug: "meenakshi-amman-temple",
    location: "Madurai, Tamil Nadu, India",
    image: "/meenakshi-temple-towers.jpg",
    rating: 4.8,
    reviews: 980,
    ticketPrice: 100,
    featured: true,
  },
  {
    id: "3",
    name: "Nallur Kandaswamy Temple",
    slug: "nallur-kandaswamy-temple",
    location: "Jaffna, Sri Lanka",
    image: "/kovil-temple-architecture.jpg",
    rating: 4.7,
    reviews: 560,
    ticketPrice: 25,
    featured: false,
  },
  {
    id: "4",
    name: "Batu Caves Temple",
    slug: "batu-caves-temple",
    location: "Selangor, Malaysia",
    image: "/batu-caves-temple-malaysia.jpg",
    rating: 4.6,
    reviews: 2100,
    ticketPrice: 30,
    featured: true,
  },
]

export function FeaturedTemples() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Temples</h2>
            <p className="text-muted-foreground">Discover popular temples and book tickets online</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/temples">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemples.map((temple) => (
            <Link key={temple.id} href={`/temples/${temple.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="relative aspect-[4/3]">
                  <Image src={temple.image || "/placeholder.svg"} alt={temple.name} fill className="object-cover" />
                  {temple.featured && <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1">{temple.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{temple.location}</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{temple.rating}</span>
                      <span className="text-xs text-muted-foreground">({temple.reviews})</span>
                    </div>
                    <p className="text-sm">
                      From <span className="font-semibold text-primary">${temple.ticketPrice}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/temples">
              View All Temples
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
