"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Ticket, Package, Grid, List, Clock, ArrowRight, Heart } from "lucide-react"

const temples = [
  {
    id: "1",
    name: "Sri Ranganathaswamy Temple",
    slug: "sri-ranganathaswamy-temple",
    description:
      "One of the most illustrious Vaishnava temples in South India, known for its magnificent architecture and spiritual significance.",
    location: "Srirangam, Tamil Nadu, India",
    image: "/sri-ranganathaswamy-temple-srirangam-gopuram.jpg",
    rating: 4.9,
    reviews: 1250,
    ticketCount: 8,
    productCount: 24,
    featured: true,
    openTime: "6:00 AM - 9:00 PM",
    priceFrom: 50,
  },
  {
    id: "2",
    name: "Meenakshi Amman Temple",
    slug: "meenakshi-amman-temple",
    description:
      "Historic Hindu temple dedicated to Meenakshi, a form of Parvati, featuring stunning Dravidian architecture.",
    location: "Madurai, Tamil Nadu, India",
    image: "/meenakshi-amman-temple-madurai-colorful-gopuram.jpg",
    rating: 4.8,
    reviews: 980,
    ticketCount: 12,
    productCount: 35,
    featured: true,
    openTime: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
    priceFrom: 100,
  },
  {
    id: "3",
    name: "Nallur Kandaswamy Temple",
    slug: "nallur-kandaswamy-temple",
    description: "One of the most significant Hindu temples in the Jaffna District, dedicated to Lord Murugan.",
    location: "Jaffna, Sri Lanka",
    image: "/nallur-kandaswamy-temple-jaffna-kovil.jpg",
    rating: 4.7,
    reviews: 560,
    ticketCount: 5,
    productCount: 15,
    featured: false,
    openTime: "5:30 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    priceFrom: 25,
  },
  {
    id: "4",
    name: "Batu Caves Temple",
    slug: "batu-caves-temple",
    description:
      "A limestone hill comprising three major caves and several smaller ones, featuring a giant Lord Murugan statue.",
    location: "Selangor, Malaysia",
    image: "/batu-caves-temple-malaysia-murugan-statue.jpg",
    rating: 4.6,
    reviews: 2100,
    ticketCount: 6,
    productCount: 18,
    featured: true,
    openTime: "6:00 AM - 9:00 PM",
    priceFrom: 0,
  },
  {
    id: "5",
    name: "Tirupati Balaji Temple",
    slug: "tirumala-venkateswara-temple",
    description: "The richest and most visited religious site in the world, dedicated to Lord Venkateswara.",
    location: "Tirupati, Andhra Pradesh, India",
    image: "/tirupati-balaji-temple-tirumala-golden-gopuram.jpg",
    rating: 4.9,
    reviews: 5200,
    ticketCount: 15,
    productCount: 50,
    featured: true,
    openTime: "3:00 AM - 12:00 AM",
    priceFrom: 300,
  },
  {
    id: "6",
    name: "Sri Mariamman Temple",
    slug: "sri-mariamman-temple-singapore",
    description: "Singapore's oldest Hindu temple dedicated to goddess Mariamman, known for its ornate gopuram.",
    location: "Chinatown, Singapore",
    image: "/sri-mariamman-temple-singapore-chinatown.jpg",
    rating: 4.5,
    reviews: 890,
    ticketCount: 4,
    productCount: 12,
    featured: false,
    openTime: "7:00 AM - 12:00 PM, 6:00 PM - 9:00 PM",
    priceFrom: 0,
  },
  {
    id: "7",
    name: "Kapaleeshwarar Temple",
    slug: "kapaleeshwarar-temple",
    description: "A temple of Shiva located in Mylapore, Chennai, featuring classic Dravidian architecture.",
    location: "Chennai, Tamil Nadu, India",
    image: "/kapaleeshwarar-temple-chennai-mylapore-gopuram.jpg",
    rating: 4.7,
    reviews: 720,
    ticketCount: 6,
    productCount: 20,
    featured: false,
    openTime: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    priceFrom: 50,
  },
  {
    id: "8",
    name: "Brihadeeswarar Temple",
    slug: "brihadeeswarar-temple",
    description: "UNESCO World Heritage Site, one of the largest temples in India, built by Raja Raja Chola I.",
    location: "Thanjavur, Tamil Nadu, India",
    image: "/brihadeeswarar-temple-thanjavur-big-temple.jpg",
    rating: 4.8,
    reviews: 1100,
    ticketCount: 5,
    productCount: 18,
    featured: true,
    openTime: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    priceFrom: 30,
  },
]

export function TempleList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  const sortedTemples = [...temples].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      case "name":
        return a.name.localeCompare(b.name)
      case "price-low":
        return a.priceFrom - b.priceFrom
      case "price-high":
        return b.priceFrom - a.priceFrom
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  return (
    <div>
      {/* Header with results count and controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b">
        <div>
          <h2 className="text-lg font-semibold">All Temples</h2>
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{temples.length}</span> sacred destinations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44 bg-background">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviewed</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedTemples.map((temple) => (
            <Link key={temple.id} href={`/temples/${temple.slug}`} className="group">
              <Card className="overflow-hidden h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={temple.image || "/placeholder.svg"}
                    alt={temple.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {temple.featured && (
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0">Featured</Badge>
                    )}
                  </div>

                  {/* Wishlist button */}
                  <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-4 w-4 text-white" />
                  </button>

                  {/* Price tag */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg">
                      <span className="text-xs text-muted-foreground">From</span>
                      <span className="text-lg font-bold text-primary ml-1">
                        {temple.priceFrom === 0 ? "Free" : `$${temple.priceFrom}`}
                      </span>
                    </div>
                  </div>

                  {/* Temple name overlay */}
                  <div className="absolute bottom-3 left-3 right-20">
                    <h3 className="font-bold text-lg text-white leading-tight line-clamp-2">{temple.name}</h3>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Location */}
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {temple.location}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{temple.description}</p>

                  {/* Timing */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 pb-4 border-b">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{temple.openTime}</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-md">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span className="text-sm font-semibold">{temple.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({temple.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Ticket className="h-3.5 w-3.5 text-primary" />
                        {temple.ticketCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5 text-primary" />
                        {temple.productCount}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {sortedTemples.map((temple) => (
            <Link key={temple.id} href={`/temples/${temple.slug}`} className="group block">
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-80 aspect-video md:aspect-[4/3] flex-shrink-0 overflow-hidden">
                    <Image
                      src={temple.image || "/placeholder.svg"}
                      alt={temple.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:bg-gradient-to-l" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {temple.featured && (
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0">Featured</Badge>
                      )}
                    </div>

                    {/* Wishlist button */}
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{temple.name}</h3>
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-md flex-shrink-0">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-semibold">{temple.rating}</span>
                          <span className="text-xs text-muted-foreground">({temple.reviews.toLocaleString()})</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        {temple.location}
                      </p>

                      <p className="text-muted-foreground mb-4 line-clamp-2">{temple.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {temple.openTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-sm">
                          <Ticket className="h-4 w-4 text-primary" />
                          {temple.ticketCount} Tickets
                        </span>
                        <span className="flex items-center gap-1.5 text-sm">
                          <Package className="h-4 w-4 text-primary" />
                          {temple.productCount} Products
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground block">From</span>
                          <span className="text-xl font-bold text-primary">
                            {temple.priceFrom === 0 ? "Free" : `$${temple.priceFrom}`}
                          </span>
                        </div>
                        <Button className="gap-1">
                          Book Now
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
