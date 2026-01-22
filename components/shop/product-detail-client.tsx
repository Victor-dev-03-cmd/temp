"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  MapPin,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Minus,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

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
  specifications?: Record<string, string>
}

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter()
  const { addItem, items, getCartTotal } = useCart()
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    if (product.variants) {
      Object.entries(product.variants).forEach(([key, options]) => {
        if (options.length > 0) {
          defaults[key] = options[0].name
        }
      })
    }
    return defaults
  })
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showCartSuccess, setShowCartSuccess] = useState(false)
  const [addedItem, setAddedItem] = useState<{
    name: string
    price: number
    quantity: number
    image: string
    variantInfo: string
  } | null>(null)

  const calculateTotalPrice = () => {
    let total = product.price
    if (product.variants) {
      Object.entries(selectedVariants).forEach(([key, value]) => {
        const variantGroup = product.variants?.[key]
        if (variantGroup) {
          const selected = variantGroup.find((v) => v.name === value)
          if (selected) {
            total += selected.priceAdjust
          }
        }
      })
    }
    return total * quantity
  }

  const getUnitPrice = () => {
    let total = product.price
    if (product.variants) {
      Object.entries(selectedVariants).forEach(([key, value]) => {
        const variantGroup = product.variants?.[key]
        if (variantGroup) {
          const selected = variantGroup.find((v) => v.name === value)
          if (selected) {
            total += selected.priceAdjust
          }
        }
      })
    }
    return total
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const variantInfo = Object.entries(selectedVariants)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")

      const itemData = {
        id: `${product.id}-${Object.values(selectedVariants).join("-")}`,
        name: product.name,
        price: getUnitPrice(),
        quantity,
        image: product.images[0],
        type: "product" as const,
        variantInfo,
      }

      addItem(itemData)

      setAddedItem({
        name: product.name,
        price: getUnitPrice(),
        quantity,
        image: product.images[0],
        variantInfo,
      })
      setShowCartSuccess(true)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      })
    }
  }

  return (
    <div className="bg-background pb-8">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1 pl-0">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-muted-foreground">/</span>
            <Link href="/shop" className="text-muted-foreground hover:text-foreground">
              Shop
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/shop?category=${product.category}`} className="text-muted-foreground hover:text-foreground">
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                    onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {/* Wishlist & Share */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full shadow-lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <Image src={img || "/placeholder.svg"} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    In Stock ({product.stock})
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <Link
                href={`/temples/${product.templeSlug}`}
                className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm"
              >
                <MapPin className="h-4 w-4" />
                {product.temple}
              </Link>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">${getUnitPrice().toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" />
                    {feature}
                  </Badge>
                ))}
              </div>
            )}

            <Separator />

            {/* Variants */}
            {product.variants && Object.entries(product.variants).length > 0 && (
              <div className="space-y-4">
                {Object.entries(product.variants).map(([key, options]) => (
                  <div key={key}>
                    <label className="text-sm font-medium capitalize mb-2 block">
                      {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                      <span className="text-primary">{selectedVariants[key]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <Button
                          key={option.name}
                          variant={selectedVariants[key] === option.name ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedVariants((prev) => ({ ...prev, [key]: option.name }))}
                          className="min-w-[80px]"
                        >
                          {option.name}
                          {option.priceAdjust !== 0 && (
                            <span className="ml-1 text-xs opacity-70">
                              ({option.priceAdjust > 0 ? "+" : ""}${option.priceAdjust})
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {product.inStock && <span className="text-sm text-muted-foreground">{product.stock} available</span>}
              </div>
            </div>

            {/* Total & Add to Cart */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Price</span>
                <span className="text-2xl font-bold">${calculateTotalPrice().toFixed(2)}</span>
              </div>
              <Button
                className="w-full h-12 text-lg gap-2"
                disabled={!product.inStock || isAddingToCart}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {product.specifications ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                          <dd className="text-sm mt-1">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-muted-foreground">No specifications available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{product.rating}</div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{product.reviews} reviews</div>
                    </div>
                    <Separator orientation="vertical" className="h-16" />
                    <div className="flex-1">
                      <Button variant="outline">Write a Review</Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-center py-8">
                    Reviews will appear here once customers submit them.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/shop/${relatedProduct.slug}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="text-xs text-muted-foreground">{relatedProduct.rating}</span>
                      </div>
                      <p className="font-bold mt-1">${relatedProduct.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showCartSuccess} onOpenChange={setShowCartSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Item Added to Cart</DialogTitle>
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>

            <h3 className="text-xl font-semibold mb-2">Added to Cart!</h3>
            <p className="text-muted-foreground text-sm mb-6">Your item has been added to your shopping cart</p>

            {/* Added Item Preview */}
            {addedItem && (
              <div className="w-full bg-muted/50 rounded-xl p-4 mb-6">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={addedItem.image || "/placeholder.svg"}
                      alt={addedItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium line-clamp-1">{addedItem.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{addedItem.variantInfo}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Qty: {addedItem.quantity}</span>
                      <span className="font-semibold text-primary">
                        ${(addedItem.price * addedItem.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Summary */}
            <div className="w-full flex items-center justify-between text-sm mb-6 px-2">
              <span className="text-muted-foreground">
                Cart Total ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
              <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-3">
              <Button asChild className="w-full h-12">
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart & Checkout
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 bg-transparent"
                onClick={() => setShowCartSuccess(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
