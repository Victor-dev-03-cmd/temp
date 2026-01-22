import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const featuredProducts = [
  {
    id: "1",
    name: "Brass Diya Set (5 pieces)",
    slug: "brass-diya-set",
    temple: "Sri Ranganathaswamy Temple",
    image: "/brass-diya-lamp-traditional.jpg",
    price: 45,
    compareAtPrice: 60,
    inStock: true,
  },
  {
    id: "2",
    name: "Sandalwood Prayer Beads",
    slug: "sandalwood-prayer-beads",
    temple: "Meenakshi Amman Temple",
    image: "/sandalwood-prayer-beads-mala.jpg",
    price: 35,
    compareAtPrice: null,
    inStock: true,
  },
  {
    id: "3",
    name: "Temple Prasadam Box",
    slug: "temple-prasadam-box",
    temple: "Nallur Kandaswamy Temple",
    image: "/indian-sweets-prasadam-box.jpg",
    price: 25,
    compareAtPrice: null,
    inStock: true,
  },
  {
    id: "4",
    name: "Silk Angavastram",
    slug: "silk-angavastram",
    temple: "Batu Caves Temple",
    image: "/silk-angavastram-traditional-cloth.jpg",
    price: 85,
    compareAtPrice: 100,
    inStock: false,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Temple Shop</h2>
            <p className="text-muted-foreground">Authentic religious products from temples</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex bg-transparent">
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full group">
                <div className="relative aspect-square bg-secondary/20">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.compareAtPrice && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      Sale
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <Badge variant="secondary">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-3 md:p-4">
                  <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{product.temple}</p>
                  <h3 className="font-medium text-sm md:text-base mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">${product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
