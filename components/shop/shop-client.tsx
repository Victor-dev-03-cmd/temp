"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Grid3X3,
  List,
  Star,
  MapPin,
  SlidersHorizontal,
  Package,
  Sparkles,
  Truck,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface ProductVariant {
  name: string
  priceAdjust: number
}

interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  temple: string
  templeSlug: string
  rating: number
  reviews: number
  inStock: boolean
  stock: number
  variants?: Record<string, ProductVariant[]>
  features?: string[]
}

// Mock products data
const products: Product[] = [
  {
    id: "1",
    slug: "brass-diya-set",
    name: "Brass Diya Set",
    description: "Traditional brass oil lamps for pooja",
    price: 45,
    originalPrice: 55,
    images: ["/brass-diya-set-collection.jpg", "/brass-diya-lamp-lit.jpg"],
    category: "Pooja Items",
    temple: "Sri Ranganathaswamy Temple",
    templeSlug: "sri-ranganathaswamy-temple",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    stock: 25,
    features: ["Handcrafted", "Pure Brass"],
  },
  {
    id: "2",
    slug: "sandalwood-prayer-beads",
    name: "Sandalwood Prayer Beads",
    description: "108 bead mala for meditation and chanting",
    price: 35,
    images: ["/prayer-beads-close-up.jpg", "/mala-in-hand.jpg"],
    category: "Spiritual Items",
    temple: "Meenakshi Amman Temple",
    templeSlug: "meenakshi-amman-temple",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    stock: 40,
    features: ["Authentic Sandalwood", "Hand-knotted"],
  },
  {
    id: "3",
    slug: "temple-prasadam-box",
    name: "Temple Prasadam Box",
    description: "Assorted temple sweets and sacred offerings",
    price: 25,
    originalPrice: 30,
    images: ["/prasadam-variety.jpg", "/laddu-prasadam.jpg"],
    category: "Prasadam",
    temple: "Tirumala Venkateswara Temple",
    templeSlug: "tirumala-venkateswara-temple",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    stock: 15,
    features: ["Temple Made", "Fresh Daily"],
  },
  {
    id: "4",
    slug: "silk-pooja-cloth",
    name: "Silk Pooja Cloth",
    description: "Premium silk cloth for deity decoration",
    price: 65,
    images: ["/silk-angavastram-folded.jpg", "/silk-cloth-border.jpg"],
    category: "Pooja Items",
    temple: "Nallur Kandaswamy Temple",
    templeSlug: "nallur-kandaswamy-temple",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    stock: 20,
    features: ["Pure Silk", "Zari Border"],
  },
  {
    id: "5",
    slug: "bronze-ganesha-idol",
    name: "Bronze Ganesha Idol",
    description: "Handcrafted bronze statue of Lord Ganesha",
    price: 150,
    originalPrice: 180,
    images: ["/bronze-ganesha-idol-statue.jpg", "/ganesha-idol-detail.jpg"],
    category: "Idols & Statues",
    temple: "Sri Ranganathaswamy Temple",
    templeSlug: "sri-ranganathaswamy-temple",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    stock: 8,
    features: ["Lost-Wax Cast", "Panchaloha Bronze"],
  },
  {
    id: "6",
    slug: "camphor-tablets",
    name: "Pure Camphor Tablets",
    description: "100% pure camphor for aarti and pooja",
    price: 12,
    images: ["/camphor-tablets-pack.jpg", "/camphor-burning.jpg"],
    category: "Pooja Items",
    temple: "Meenakshi Amman Temple",
    templeSlug: "meenakshi-amman-temple",
    rating: 4.5,
    reviews: 312,
    inStock: true,
    stock: 100,
    features: ["100% Pure", "Clean Burn"],
  },
  {
    id: "7",
    slug: "kumkum-turmeric-set",
    name: "Kumkum & Turmeric Set",
    description: "Traditional kumkum and turmeric powder set",
    price: 15,
    images: ["/kumkum-turmeric-set.jpg", "/kumkum-powder.jpg"],
    category: "Pooja Items",
    temple: "Tirumala Venkateswara Temple",
    templeSlug: "tirumala-venkateswara-temple",
    rating: 4.6,
    reviews: 178,
    inStock: true,
    stock: 75,
    features: ["Natural", "Temple Grade"],
  },
  {
    id: "8",
    slug: "incense-sticks-collection",
    name: "Temple Incense Collection",
    description: "Premium incense sticks in traditional temple fragrances",
    price: 18,
    images: ["/incense-sticks-bundle.jpg", "/incense-burning.jpg"],
    category: "Spiritual Items",
    temple: "Nallur Kandaswamy Temple",
    templeSlug: "nallur-kandaswamy-temple",
    rating: 4.7,
    reviews: 145,
    inStock: false,
    stock: 0,
    features: ["Hand-rolled", "Natural Oils"],
  },
]

const categories = ["All", "Pooja Items", "Spiritual Items", "Prasadam", "Idols & Statues"]

export function ShopClient() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showInStock, setShowInStock] = useState(false)

  // Removed selectedProduct, selectedVariants, quantity, currentImageIndex, isWishlisted state as they are no longer needed for modal-based product view
  // Removed FilterSidebar component as it's replaced by Sheet content

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesStock = !showInStock || product.inStock
      return matchesSearch && matchesCategory && matchesPrice && matchesStock
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return 0
        default:
          return 0
      }
    })

  const handleQuickAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      type: "product",
    })
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Temple Shop</h1>
              <p className="text-muted-foreground">Authentic spiritual items from sacred temples across India</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <span>{products.length}+ Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Temple Blessed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Price Range</Label>
                    <div className="pt-4">
                      <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={10} />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={showInStock}
                      onCheckedChange={(checked) => setShowInStock(checked as boolean)}
                    />
                    <Label htmlFor="inStock" className="text-sm">
                      Show in-stock items only
                    </Label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden h-full">
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate">{product.temple}</span>
                    </div>
                    <h3 className="font-medium line-clamp-1 mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{product.description}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 aspect-square sm:aspect-auto flex-shrink-0">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <Badge variant="secondary">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{product.temple}</span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                      </div>
                      {product.features && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
