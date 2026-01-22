"use client"

import type React from "react"
import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/layout/main-layout"
import { useCurrency } from "@/contexts/currency-context"
import { Search, MapPin, Star, Clock, Package, Ticket, X, TrendingUp } from "lucide-react"

// Mock temple data for search
const temples = [
  {
    id: "1",
    slug: "sri-ranganathaswamy-temple",
    name: "Sri Ranganathaswamy Temple",
    location: "Srirangam, Tamil Nadu, India",
    image: "/sri-ranganathaswamy-temple-gopuram.jpg",
    rating: 4.8,
    reviewCount: 3250,
    description: "One of the most illustrious Vaishnava temples in South India",
    ticketCount: 5,
    category: "Hindu",
  },
  {
    id: "2",
    slug: "nallur-kandaswamy-temple",
    name: "Nallur Kandaswamy Temple",
    location: "Jaffna, Sri Lanka",
    image: "/nallur-kandaswamy-hindu-temple-jaffna.jpg",
    rating: 4.9,
    reviewCount: 2150,
    description: "One of the most significant Hindu temples in Jaffna",
    ticketCount: 4,
    category: "Hindu",
  },
  {
    id: "3",
    slug: "meenakshi-amman-temple",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu, India",
    image: "/meenakshi-amman-temple-madurai-colorful-gopuram.jpg",
    rating: 4.9,
    reviewCount: 2150,
    description: "Historic Hindu temple located on the southern bank of the Vaigai River",
    ticketCount: 4,
    category: "Hindu",
  },
  {
    id: "4",
    slug: "tirumala-venkateswara-temple",
    name: "Tirumala Venkateswara Temple",
    location: "Tirupati, Andhra Pradesh, India",
    image: "/tirumala-venkateswara-temple-tirupati-golden-gopur.jpg",
    rating: 4.9,
    reviewCount: 5000,
    description: "The most visited religious site in the world",
    ticketCount: 6,
    category: "Hindu",
  },
]

// Mock product data for search
const products = [
  {
    id: "1",
    slug: "brass-diya-lamp",
    name: "Brass Diya Lamp Set",
    templeName: "Sri Ranganathaswamy Temple",
    image: "/brass-diya-lamp-traditional.jpg",
    price: 450,
    originalPrice: 550,
    rating: 4.7,
    category: "Pooja Items",
  },
  {
    id: "2",
    slug: "sandalwood-prayer-beads",
    name: "Sandalwood Prayer Beads",
    templeName: "Meenakshi Amman Temple",
    image: "/sandalwood-prayer-beads-mala.jpg",
    price: 350,
    originalPrice: null,
    rating: 4.8,
    category: "Spiritual Items",
  },
  {
    id: "3",
    slug: "temple-prasadam-box",
    name: "Temple Prasadam Gift Box",
    templeName: "Tirumala Venkateswara Temple",
    image: "/indian-temple-prasadam-sweets-box.jpg",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    category: "Prasadam",
  },
  {
    id: "4",
    slug: "silk-pooja-cloth",
    name: "Pure Silk Pooja Cloth",
    templeName: "Nallur Kandaswamy Temple",
    image: "/silk-pooja-cloth-red-gold.jpg",
    price: 799,
    originalPrice: null,
    rating: 4.6,
    category: "Textiles",
  },
  {
    id: "5",
    slug: "bronze-ganesha-idol",
    name: "Bronze Ganesha Idol",
    templeName: "Meenakshi Amman Temple",
    image: "/bronze-ganesha-idol-statue.jpg",
    price: 1250,
    originalPrice: 1500,
    rating: 4.8,
    category: "Idols & Statues",
  },
]

// Popular searches
const popularSearches = ["Darshan tickets", "Pooja booking", "Prasadam", "VIP entry", "Abhishekam", "Temple timing"]

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { formatPrice } = useCurrency()

  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState("all")
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Save search to recent
  const saveSearch = (term: string) => {
    if (!term.trim()) return
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  // Filter results based on query
  const filteredTemples = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return temples.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    )
  }, [query])

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.templeName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [query])

  const totalResults = filteredTemples.length + filteredProducts.length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      saveSearch(query.trim())
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleQuickSearch = (term: string) => {
    setQuery(term)
    saveSearch(term)
    router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <>
      {/* Search Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search temples, tickets, products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg rounded-full border-2 focus-visible:ring-primary"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>

          {/* Quick Search Tags */}
          {!query && (
            <div className="max-w-2xl mx-auto mt-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
                    onClick={() => handleQuickSearch(term)}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* No query state */}
        {!query && (
          <div className="max-w-2xl mx-auto">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-muted-foreground">Recent Searches</h3>
                  <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="text-xs">
                    Clear all
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent transition-colors px-3 py-1"
                      onClick={() => handleQuickSearch(term)}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Browse Categories */}
            <div>
              <h3 className="font-medium text-muted-foreground mb-4">Browse Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/temples">
                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Temples</p>
                      <p className="text-sm text-muted-foreground">{temples.length} temples</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/temples">
                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Ticket className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Tickets</p>
                      <p className="text-sm text-muted-foreground">Book darshan</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/shop">
                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Products</p>
                      <p className="text-sm text-muted-foreground">{products.length} items</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/shop?category=prasadam">
                  <Card className="hover:border-primary transition-colors cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Prasadam</p>
                      <p className="text-sm text-muted-foreground">Sacred offerings</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {totalResults > 0
                  ? `${totalResults} result${totalResults !== 1 ? "s" : ""} for "${query}"`
                  : `No results for "${query}"`}
              </h2>
            </div>

            {totalResults > 0 ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
                  <TabsTrigger value="temples">Temples ({filteredTemples.length})</TabsTrigger>
                  <TabsTrigger value="products">Products ({filteredProducts.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-8">
                  {/* Temples Section */}
                  {filteredTemples.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Temples
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {filteredTemples.map((temple) => (
                          <Link key={temple.id} href={`/temples/${temple.slug}`}>
                            <Card className="overflow-hidden hover:border-primary transition-colors">
                              <div className="flex">
                                <div className="relative w-32 h-32 shrink-0">
                                  <Image
                                    src={temple.image || "/placeholder.svg"}
                                    alt={temple.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <CardContent className="p-4 flex-1">
                                  <h4 className="font-semibold line-clamp-1">{temple.name}</h4>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {temple.location}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm font-medium">{temple.rating}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      ({temple.reviewCount} reviews)
                                    </span>
                                  </div>
                                  <Badge variant="secondary" className="mt-2">
                                    <Ticket className="h-3 w-3 mr-1" />
                                    {temple.ticketCount} ticket types
                                  </Badge>
                                </CardContent>
                              </div>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products Section */}
                  {filteredProducts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        Products
                      </h3>
                      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                        {filteredProducts.map((product) => (
                          <Link key={product.id} href={`/shop/${product.slug}`}>
                            <Card className="overflow-hidden hover:border-primary transition-colors">
                              <div className="relative aspect-square">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                                {product.originalPrice && (
                                  <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                                )}
                              </div>
                              <CardContent className="p-3">
                                <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{product.templeName}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
                                  {product.originalPrice && (
                                    <span className="text-xs text-muted-foreground line-through">
                                      {formatPrice(product.originalPrice)}
                                    </span>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="temples">
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredTemples.map((temple) => (
                      <Link key={temple.id} href={`/temples/${temple.slug}`}>
                        <Card className="overflow-hidden hover:border-primary transition-colors">
                          <div className="flex">
                            <div className="relative w-32 h-32 shrink-0">
                              <Image
                                src={temple.image || "/placeholder.svg"}
                                alt={temple.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-4 flex-1">
                              <h4 className="font-semibold line-clamp-1">{temple.name}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {temple.location}
                              </p>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{temple.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{temple.rating}</span>
                                </div>
                                <Badge variant="secondary">
                                  <Ticket className="h-3 w-3 mr-1" />
                                  {temple.ticketCount} tickets
                                </Badge>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="products">
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    {filteredProducts.map((product) => (
                      <Link key={product.id} href={`/shop/${product.slug}`}>
                        <Card className="overflow-hidden hover:border-primary transition-colors">
                          <div className="relative aspect-square">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                            {product.originalPrice && <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>}
                          </div>
                          <CardContent className="p-3">
                            <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{product.templeName}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-semibold text-primary">{formatPrice(product.price)}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or browse our categories</p>
                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline">
                    <Link href="/temples">Browse Temples</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/shop">Shop Products</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default function SearchPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
        <SearchContent />
      </Suspense>
    </MainLayout>
  )
}
