"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  Globe,
  Ticket,
  Package,
  Calendar,
  ShoppingCart,
  ThumbsUp,
  Minus,
  Plus,
  Check,
  Camera,
  Maximize2,
  MessageSquare,
  Share2,
} from "lucide-react"
import { Users } from "lucide-react" // Import Users icon

const mockReviews = [
  {
    id: "r1",
    userName: "Priya Sharma",
    userImage: "/indian-woman-avatar.png",
    rating: 5,
    date: "2024-12-15",
    comment:
      "A truly divine experience! The morning pooja was incredibly peaceful. The temple staff were very helpful and the entire atmosphere was spiritually uplifting.",
    helpful: 24,
  },
  {
    id: "r2",
    userName: "Rajesh Kumar",
    userImage: "/indian-man-avatar.png",
    rating: 4,
    date: "2024-12-10",
    comment:
      "Beautiful temple with rich history. VIP darshan was worth it, saved a lot of time. The prasadam was delicious!",
    helpful: 18,
  },
  {
    id: "r3",
    userName: "Lakshmi Devi",
    userImage: "/elderly-indian-woman-avatar.jpg",
    rating: 5,
    date: "2024-12-05",
    comment:
      "Have been visiting this temple for years. The online booking system makes it so convenient now. Highly recommend the special archanai service.",
    helpful: 31,
  },
  {
    id: "r4",
    userName: "Arun Venkatesh",
    userImage: "/young-indian-man-avatar.jpg",
    rating: 4,
    date: "2024-11-28",
    comment:
      "Great temple, well maintained. Parking facility is convenient. Would suggest visiting early morning for a peaceful experience.",
    helpful: 12,
  },
]

const mockEvents = [
  {
    id: "1",
    name: "Vaikunta Ekadasi",
    date: "2025-01-10",
    time: "4:00 AM - 10:00 PM",
    description: "Annual festival celebrating the opening of the gates of Vaikunta",
    type: "festival",
    highlight: true,
  },
  {
    id: "2",
    name: "Thai Pongal Celebration",
    date: "2025-01-14",
    time: "6:00 AM - 8:00 PM",
    description: "Harvest festival with special poojas and prasadam distribution",
    type: "festival",
    highlight: false,
  },
  {
    id: "3",
    name: "Monthly Pradosham",
    date: "2025-01-13",
    time: "5:00 PM - 9:00 PM",
    description: "Special evening pooja dedicated to Lord Shiva",
    type: "pooja",
    highlight: false,
  },
  {
    id: "4",
    name: "Ranganaatha Brahmotsavam",
    date: "2025-03-15",
    time: "5:00 AM - 11:00 PM",
    description: "10-day grand festival with processions and special rituals",
    type: "festival",
    highlight: true,
  },
]

const mockGalleryPhotos = [
  {
    id: "g1",
    url: "/temple-gopuram-tower.jpg",
    title: "Main Gopuram",
    category: "Architecture",
  },
  {
    id: "g2",
    url: "/temple-corridor-pillars.jpg",
    title: "1000 Pillar Hall",
    category: "Architecture",
  },
  {
    id: "g3",
    url: "/temple-deity-sanctum.jpg",
    title: "Main Sanctum",
    category: "Deity",
  },
  {
    id: "g4",
    url: "/temple-tank-water.jpg",
    title: "Temple Tank",
    category: "Premises",
  },
  {
    id: "g5",
    url: "/temple-festival-chariot-procession.jpg",
    title: "Annual Festival",
    category: "Festival",
  },
  {
    id: "g6",
    url: "/temple-evening-lamps.jpg",
    title: "Evening Aarti",
    category: "Rituals",
  },
  {
    id: "g7",
    url: "/temple-entrance-gate.jpg",
    title: "Temple Entrance",
    category: "Architecture",
  },
  {
    id: "g8",
    url: "/temple-ceiling-art.jpg",
    title: "Ceiling Paintings",
    category: "Art",
  },
]

const tickets = [
  {
    id: "1",
    name: "Morning Pooja Ticket",
    type: "POOJA",
    description: "Special morning pooja with archana for your family",
    price: 50,
    maxPerDay: 100,
    requiresRasi: true,
    requiresNakshatram: true,
    timings: ["6:00 AM", "7:00 AM", "8:00 AM"],
    maxExtraPersons: 4,
    extraPersonCharge: 10,
  },
  {
    id: "2",
    name: "VIP Darshan",
    type: "DARSHAN",
    description: "Skip the queue with VIP darshan access",
    price: 200,
    maxPerDay: 50,
    requiresRasi: false,
    requiresNakshatram: false,
    timings: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
    maxExtraPersons: 3,
    extraPersonCharge: 150,
  },
  {
    id: "3",
    name: "Special Archanai",
    type: "ARCHANAI",
    description: "Personalized archanai with your name and star",
    price: 100,
    maxPerDay: 200,
    requiresRasi: true,
    requiresNakshatram: true,
    timings: ["Morning", "Evening"],
    maxExtraPersons: 5,
    extraPersonCharge: 25,
  },
  {
    id: "4",
    name: "Car Parking",
    type: "PARKING",
    description: "Secure parking space within temple premises",
    price: 20,
    maxPerDay: null,
    requiresRasi: false,
    requiresNakshatram: false,
    timings: ["All Day"],
    maxExtraPersons: 0,
    extraPersonCharge: 0,
  },
]

const products = [
  {
    id: "p1",
    name: "Brass Diya Set",
    description:
      "Traditional brass oil lamps for pooja. Handcrafted by skilled artisans using traditional techniques. Perfect for daily worship and special occasions.",
    price: 45,
    image: "/brass-diya-lamp.png",
    stock: 50,
    templeId: "1",
    variants: [
      {
        type: "size",
        options: ["Small (3 piece)", "Medium (5 piece)", "Large (7 piece)"],
        priceAdjustment: [0, 15, 30],
      },
      { type: "finish", options: ["Polished", "Antique", "Matte"], priceAdjustment: [0, 5, 0] },
    ],
    gallery: ["/brass-diya-lamp.png", "/brass-diya-lamp-traditional.jpg"],
  },
  {
    id: "p2",
    name: "Sandalwood Prayer Beads",
    description:
      "108 bead mala for meditation and chanting. Made from authentic sandalwood with natural fragrance that lasts for years.",
    price: 35,
    image: "/prayer-beads.jpg",
    stock: 30,
    templeId: "1",
    variants: [
      { type: "bead size", options: ["6mm", "8mm", "10mm"], priceAdjustment: [0, 5, 10] },
      { type: "tassel color", options: ["Red", "Saffron", "Maroon", "Gold"], priceAdjustment: [0, 0, 0, 3] },
    ],
    gallery: ["/prayer-beads.jpg", "/sandalwood-prayer-beads-mala.jpg"],
  },
  {
    id: "p3",
    name: "Temple Prasadam Box",
    description:
      "Sacred prasadam sweets from the temple. Freshly prepared with pure ghee and traditional recipes blessed by temple priests.",
    price: 25,
    image: "/prasadam-box.jpg",
    stock: 100,
    templeId: "1",
    variants: [{ type: "size", options: ["250g", "500g", "1kg"], priceAdjustment: [0, 20, 45] }],
    gallery: ["/prasadam-box.jpg", "/indian-temple-prasadam-sweets-box.jpg"],
  },
  {
    id: "p4",
    name: "Silk Pooja Cloth",
    description:
      "Premium quality silk cloth for deity decoration. Woven with intricate traditional patterns and gold zari work.",
    price: 55,
    image: "/silk-cloth.jpg",
    stock: 25,
    templeId: "1",
    variants: [
      { type: "size", options: ["Small (1m)", "Medium (2m)", "Large (3m)"], priceAdjustment: [0, 40, 80] },
      {
        type: "color",
        options: ["Red & Gold", "Yellow & Gold", "Green & Gold", "Maroon & Gold"],
        priceAdjustment: [0, 0, 0, 5],
      },
    ],
    gallery: ["/silk-cloth.jpg", "/silk-pooja-cloth-red-gold.jpg"],
  },
]

const rasiOptions = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
]

const nakshatramOptions = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
]

interface TempleDetailClientProps {
  temple: {
    id: string
    name: string
    slug: string
    description: string
    longDescription?: string
    location: string
    address?: string
    image: string
    gallery?: string[]
    rating: number
    reviews: number
    ticketCount: number
    productCount: number
    featured: boolean
    timings?: {
      weekday: string
      weekend: string
      special?: string
    }
    contact?: {
      phone: string
      email: string
      website?: string
    }
    amenities?: string[]
  }
}

export function TempleDetailClient({ temple }: TempleDetailClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTicket, setSelectedTicket] = useState<(typeof tickets)[0] | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    rasi: "",
    nakshatram: "",
    time: "",
    extraPersons: 0,
  })
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const { addItem } = useCart()
  const { toast } = useToast()

  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [productQuantity, setProductQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [productModalOpen, setProductModalOpen] = useState(false)

  const [selectedPhoto, setSelectedPhoto] = useState<(typeof mockGalleryPhotos)[0] | null>(null)
  const [galleryFilter, setGalleryFilter] = useState<string>("all")
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [userRating, setUserRating] = useState(5)
  const [userReview, setUserReview] = useState("")

  const handleBookTicket = (ticket: (typeof tickets)[0]) => {
    setSelectedTicket(ticket)
    setBookingDetails({
      name: "",
      rasi: "",
      nakshatram: "",
      time: ticket.timings[0],
      extraPersons: 0,
    })
    setIsBookingOpen(true)
  }

  const handleAddToCart = async (product: (typeof products)[0]) => {
    await addItem(product as any, 1)
  }

  const calculateTicketTotal = () => {
    if (!selectedTicket) return 0
    const basePrice = selectedTicket.price
    const extraCharge = bookingDetails.extraPersons * selectedTicket.extraPersonCharge
    return basePrice + extraCharge
  }

  const renderStars = (rating: number, interactive = false, onChange?: (r: number) => void) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30",
              interactive && "cursor-pointer hover:scale-110 transition-transform",
            )}
            onClick={() => interactive && onChange?.(star)}
          />
        ))}
      </div>
    )
  }

  const handleViewProduct = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setProductQuantity(1)
    // Set default variants
    const defaults: Record<string, string> = {}
    product.variants?.forEach((variant) => {
      defaults[variant.type] = variant.options[0]
    })
    setSelectedVariants(defaults)
    setProductModalOpen(true)
  }

  const getProductPrice = () => {
    if (!selectedProduct) return 0
    let price = selectedProduct.price
    selectedProduct.variants?.forEach((variant) => {
      const selectedOption = selectedVariants[variant.type]
      const optionIndex = variant.options.indexOf(selectedOption)
      if (optionIndex >= 0 && variant.priceAdjustment[optionIndex]) {
        price += variant.priceAdjustment[optionIndex]
      }
    })
    return price
  }

  const handleAddProductToCart = () => {
    if (!selectedProduct) return
    const variantString = Object.entries(selectedVariants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ")

    addItem({
      type: "PRODUCT",
      productId: selectedProduct.id,
      templeId: temple.id,
      templeName: temple.name,
      name: `${selectedProduct.name}${variantString ? ` (${variantString})` : ""}`,
      price: getProductPrice(),
      quantity: productQuantity,
      image: selectedProduct.image,
    })

    toast({
      title: "Added to cart",
      description: `${productQuantity}x ${selectedProduct.name} added to your cart`,
    })
    setProductModalOpen(false)
  }

  const filteredGalleryPhotos =
    galleryFilter === "all"
      ? mockGalleryPhotos
      : mockGalleryPhotos.filter((photo) => photo.category.toLowerCase() === galleryFilter.toLowerCase())

  const galleryCategories = ["all", ...Array.from(new Set(mockGalleryPhotos.map((p) => p.category)))]

  const handleSubmitReview = () => {
    // In a real app, this would submit the review
    console.log("Submitting review:", { rating: userRating, comment: userReview })
    setUserReview("")
    setUserRating(5)
    setReviewDialogOpen(false)
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image src={temple.image || "/placeholder.svg"} alt={temple.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            {temple.featured && <Badge className="mb-3">Featured Temple</Badge>}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{temple.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {temple.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {temple.rating} ({temple.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {temple.longDescription || temple.description}
                </p>
                {temple.amenities && temple.amenities.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {temple.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Events Section */}
            {mockEvents.length > 0 && (
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Upcoming Events</h2>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {mockEvents.map((event) => (
                      <div key={event.id} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <h4 className="font-semibold">
                                {event.name}
                                {event.highlight && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    Highlight
                                  </Badge>
                                )}
                              </h4>
                              <span className="text-sm text-muted-foreground whitespace-nowrap">{event.date}</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-sm mb-2">{event.description}</p>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{event.time}</span>
                              <Badge variant="secondary" className="text-xs capitalize">
                                {event.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tickets & Products Tabs */}
            <Tabs defaultValue="tickets">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tickets" className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  Tickets ({tickets.length})
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Products ({products.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tickets" className="space-y-4 mt-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{ticket.name}</h3>
                            <Badge variant="outline">{ticket.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {ticket.timings.join(", ")}
                            </span>
                            {ticket.maxExtraPersons > 0 && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Up to {ticket.maxExtraPersons} extra
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold">${ticket.price}</p>
                            {ticket.extraPersonCharge > 0 && (
                              <p className="text-xs text-muted-foreground">+${ticket.extraPersonCharge}/extra person</p>
                            )}
                          </div>
                          <Button onClick={() => handleBookTicket(ticket)}>Book Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="products" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleViewProduct(product)}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.variants && product.variants.length > 0 && (
                          <Badge className="absolute top-2 right-2 bg-primary">{product.variants.length} Options</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold">${product.price}</span>
                            {product.variants && product.variants.length > 0 && (
                              <span className="text-sm text-muted-foreground ml-1">+</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewProduct(product)
                            }}
                          >
                            View Options
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Temple Gallery Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Temple Gallery</h2>
                  <Badge variant="secondary">{mockGalleryPhotos.length} Photos</Badge>
                </div>
                <div className="flex gap-2">
                  {galleryCategories.map((category) => (
                    <Button
                      key={category}
                      variant={galleryFilter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGalleryFilter(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {filteredGalleryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                      index === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className={`relative ${index === 0 ? "aspect-square" : "aspect-square"}`}>
                      <Image
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-medium text-sm">{photo.title}</p>
                        <p className="text-xs text-white/70">{photo.category}</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full p-1.5">
                          <Maximize2 className="h-4 w-4 text-gray-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                View All Photos
              </Button>
            </div>

            {/* Full Reviews Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Visitor Reviews</h2>
                </div>
                <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Star className="h-4 w-4 mr-2" />
                      Write a Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Write a Review</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Your Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} onClick={() => setUserRating(star)} className="focus:outline-none">
                              <Star
                                className={`h-8 w-8 ${
                                  star <= userRating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Your Review</label>
                        <textarea
                          className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Share your experience at this temple..."
                          value={userReview}
                          onChange={(e) => setUserReview(e.target.value)}
                        />
                      </div>
                      <Button className="w-full" onClick={handleSubmitReview}>
                        Submit Review
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Rating Summary */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center md:border-r md:pr-8">
                      <div className="text-5xl font-bold text-primary">{temple.rating}</div>
                      <div className="flex justify-center gap-0.5 my-2">{renderStars(temple.rating)}</div>
                      <p className="text-sm text-muted-foreground">
                        Based on {temple.reviews.toLocaleString()} reviews
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage =
                          rating === 5 ? 68 : rating === 4 ? 22 : rating === 3 ? 7 : rating === 2 ? 2 : 1
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm w-3">{rating}</span>
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground w-10">{percentage}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review List */}
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={review.userImage || "/placeholder.svg"}
                            alt={review.userName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-semibold">{review.userName}</h4>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(review.date), "MMMM d, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                            <Badge variant="secondary" className="text-xs">
                              Verified Visit
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                          <div className="flex items-center gap-4 mt-4">
                            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              Helpful ({review.helpful})
                            </button>
                            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              Reply
                            </button>
                            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <Share2 className="h-4 w-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Load More Reviews
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Temple Info Card */}
            <Card>
              <CardContent className="space-y-3">
                {temple.timings && (
                  <>
                    <div>
                      <p className="text-sm font-medium">Weekdays</p>
                      <p className="text-sm text-muted-foreground">{temple.timings.weekday}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Weekends</p>
                      <p className="text-sm text-muted-foreground">{temple.timings.weekend}</p>
                    </div>
                    {temple.timings.special && (
                      <div>
                        <p className="text-sm font-medium">Special Days</p>
                        <p className="text-sm text-muted-foreground">{temple.timings.special}</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Contact Card */}
            {temple.contact && (
              <Card>
                <CardContent className="space-y-3">
                  <a
                    href={`tel:${temple.contact.phone}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    {temple.contact.phone}
                  </a>
                  <a
                    href={`mailto:${temple.contact.email}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    {temple.contact.email}
                  </a>
                  {temple.contact.website && (
                    <a
                      href={temple.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Website
                    </a>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Address Card */}
            {temple.address && (
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{temple.address}</p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(temple.address)}`}
                      target="_blank"
                    >
                      Get Directions
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Events Section (Sidebar) */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Upcoming Events</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary">
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {mockEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border transition-colors hover:border-primary/50 ${
                        event.highlight ? "bg-amber-50 border-amber-200" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex flex-col items-center justify-center min-w-[45px] h-[45px] rounded-lg text-center ${
                            event.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          <span className="text-[10px] font-medium uppercase">
                            {format(new Date(event.date), "MMM")}
                          </span>
                          <span className="text-lg font-bold leading-none">{format(new Date(event.date), "d")}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium truncate">{event.name}</h4>
                            {event.highlight && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-500 text-white rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Reviews Section (truncated for sidebar) */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Reviews</h3>
                  </div>
                  <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="h-8">
                        <Star className="h-3 w-3 mr-1" />
                        Write Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Your Rating</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} onClick={() => setUserRating(star)} className="focus:outline-none">
                                <Star
                                  className={`h-8 w-8 ${
                                    star <= userRating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Your Review</label>
                          <textarea
                            className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Share your experience at this temple..."
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                          />
                        </div>
                        <Button className="w-full" onClick={handleSubmitReview}>
                          Submit Review
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center gap-2 mb-4 p-3 bg-amber-50 rounded-lg">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="text-lg font-bold">{temple.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    Based on {temple.reviews.toLocaleString()} reviews
                  </span>
                </div>

                <div className="space-y-4">
                  {mockReviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div
                          className="h-8 w-8 rounded-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${review.userImage || "/placeholder.svg"})` }}
                        >
                          {review.userName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium truncate">{review.userName}</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {format(new Date(review.date), "MMM d, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 my-1">{renderStars(review.rating)}</div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2 transition-colors">
                            <ThumbsUp className="h-3 w-3" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-transparent mt-4" size="sm">
                  View All {temple.reviews.toLocaleString()} Reviews
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book {selectedTicket?.name}</DialogTitle>
            <DialogDescription>{selectedTicket?.description}</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4 py-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Select Date</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select
                  value={bookingDetails.time}
                  onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, time: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTicket.timings.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Devotee Name */}
              <div className="space-y-2">
                <Label htmlFor="devoteeName">Devotee Name</Label>
                <Input
                  id="devoteeName"
                  placeholder="Enter name for archana/pooja"
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Rasi Selection */}
              {selectedTicket.requiresRasi && (
                <div className="space-y-2">
                  <Label>Rasi (Star Sign)</Label>
                  <Select
                    value={bookingDetails.rasi}
                    onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, rasi: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {rasiOptions.map((rasi) => (
                        <SelectItem key={rasi} value={rasi}>
                          {rasi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Nakshatram Selection */}
              {selectedTicket.requiresNakshatram && (
                <div className="space-y-2">
                  <Label>Nakshatram (Birth Star)</Label>
                  <Select
                    value={bookingDetails.nakshatram}
                    onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, nakshatram: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Nakshatram" />
                    </SelectTrigger>
                    <SelectContent>
                      {nakshatramOptions.map((star) => (
                        <SelectItem key={star} value={star}>
                          {star}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Extra Persons */}
              {selectedTicket.maxExtraPersons > 0 && (
                <div className="space-y-2">
                  <Label>Extra Persons (+${selectedTicket.extraPersonCharge} each)</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          extraPersons: Math.max(0, prev.extraPersons - 1),
                        }))
                      }
                      disabled={bookingDetails.extraPersons === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{bookingDetails.extraPersons}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setBookingDetails((prev) => ({
                          ...prev,
                          extraPersons: Math.min(selectedTicket.maxExtraPersons, prev.extraPersons + 1),
                        }))
                      }
                      disabled={bookingDetails.extraPersons >= selectedTicket.maxExtraPersons}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Max {selectedTicket.maxExtraPersons}</span>
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t pt-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Price</span>
                    <span>${selectedTicket.price}</span>
                  </div>
                  {bookingDetails.extraPersons > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>
                        Extra Persons ({bookingDetails.extraPersons} x ${selectedTicket.extraPersonCharge})
                      </span>
                      <span>${bookingDetails.extraPersons * selectedTicket.extraPersonCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${calculateTicketTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsBookingOpen(false)}>
              <Check className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product View Modal */}
      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedProduct.name}</DialogTitle>
                <DialogDescription>{selectedProduct.description}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* Product Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Variant Options */}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Select Options</h4>
                    {selectedProduct.variants.map((variant) => (
                      <div key={variant.type} className="space-y-2">
                        <Label className="capitalize">{variant.type}</Label>
                        <div className="flex flex-wrap gap-2">
                          {variant.options.map((option, idx) => {
                            const isSelected = selectedVariants[variant.type] === option
                            const priceAdj = variant.priceAdjustment[idx]
                            return (
                              <Button
                                key={option}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                className="relative"
                                onClick={() =>
                                  setSelectedVariants((prev) => ({
                                    ...prev,
                                    [variant.type]: option,
                                  }))
                                }
                              >
                                {isSelected && <Check className="h-3 w-3 mr-1" />}
                                {option}
                                {priceAdj > 0 && <span className="ml-1 text-xs opacity-70">+${priceAdj}</span>}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))}
                      disabled={productQuantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-lg font-semibold">{productQuantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setProductQuantity(Math.min(selectedProduct.stock, productQuantity + 1))}
                      disabled={productQuantity >= selectedProduct.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">{selectedProduct.stock} available</span>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Unit Price</span>
                    <span>${getProductPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quantity</span>
                    <span>x {productQuantity}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${(getProductPrice() * productQuantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setProductModalOpen(false)} className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
                <Button onClick={handleAddProductToCart} className="w-full sm:w-auto">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart - ${(getProductPrice() * productQuantity).toFixed(2)}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Write Review Dialog (using the generic one) */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>Share your experience at {temple.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Your Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-8 w-8 cursor-pointer hover:scale-110 transition-transform",
                      star <= newReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30 hover:text-yellow-400/50",
                    )}
                    onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="review-comment">Your Review</Label>
              <Textarea
                id="review-comment"
                placeholder="Tell us about your experience..."
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, this would submit the review
                setIsReviewDialogOpen(false)
                setNewReview({ rating: 5, comment: "" })
              }}
              disabled={!newReview.comment.trim()}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Gallery Lightbox Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedPhoto && (
            <>
              <div className="relative aspect-video bg-black">
                <Image
                  src={selectedPhoto.url || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold">{selectedPhoto.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedPhoto.category}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
