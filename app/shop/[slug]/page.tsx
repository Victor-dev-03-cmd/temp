import { notFound } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { ProductDetailClient } from "@/components/shop/product-detail-client"

// Mock product data - same as shop page
const products = [
  {
    id: "1",
    slug: "brass-diya-set",
    name: "Brass Diya Set",
    description:
      "Traditional brass oil lamps for pooja. Handcrafted by skilled artisans using traditional techniques passed down through generations. Each diya is made from pure brass and features intricate engravings that reflect light beautifully during prayers.",
    price: 45,
    originalPrice: 55,
    images: ["/brass-diya-set-collection.jpg", "/brass-diya-lamp-lit.jpg", "/brass-diya-lamp-traditional.jpg"],
    category: "Pooja Items",
    temple: "Sri Ranganathaswamy Temple",
    templeSlug: "sri-ranganathaswamy-temple",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    stock: 25,
    variants: {
      size: [
        { name: "Small (3 pc)", priceAdjust: 0 },
        { name: "Medium (5 pc)", priceAdjust: 15 },
        { name: "Large (7 pc)", priceAdjust: 30 },
      ],
      finish: [
        { name: "Traditional", priceAdjust: 0 },
        { name: "Antique", priceAdjust: 10 },
        { name: "Polished", priceAdjust: 5 },
      ],
    },
    features: ["Handcrafted", "Pure Brass", "Temple Blessed"],
    specifications: {
      Material: "Pure Brass",
      Weight: "250g - 500g",
      Origin: "Srirangam, Tamil Nadu",
      Care: "Clean with tamarind paste for shine",
    },
  },
  {
    id: "2",
    slug: "sandalwood-prayer-beads",
    name: "Sandalwood Prayer Beads",
    description:
      "108 bead mala for meditation and chanting. Made from authentic sandalwood sourced from Mysore, these prayer beads carry a natural fragrance that aids in meditation and spiritual practice.",
    price: 35,
    images: ["/prayer-beads-close-up.jpg", "/mala-in-hand.jpg", "/sandalwood-prayer-beads-mala.jpg"],
    category: "Spiritual Items",
    temple: "Meenakshi Amman Temple",
    templeSlug: "meenakshi-amman-temple",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    stock: 40,
    variants: {
      size: [
        { name: "108 Beads", priceAdjust: 0 },
        { name: "54 Beads", priceAdjust: -10 },
        { name: "27 Beads (Wrist)", priceAdjust: -15 },
      ],
      beadSize: [
        { name: "6mm", priceAdjust: 0 },
        { name: "8mm", priceAdjust: 5 },
        { name: "10mm", priceAdjust: 10 },
      ],
    },
    features: ["Authentic Sandalwood", "Hand-knotted", "Natural Fragrance"],
    specifications: {
      Material: "Mysore Sandalwood",
      "Bead Count": "27 / 54 / 108",
      Fragrance: "Natural, lasting 2+ years",
      Thread: "Silk with guru bead",
    },
  },
  {
    id: "3",
    slug: "temple-prasadam-box",
    name: "Temple Prasadam Box",
    description:
      "Assorted temple sweets and sacred offerings. This curated box contains traditional prasadam items prepared in temple kitchens following ancient recipes and rituals.",
    price: 25,
    originalPrice: 30,
    images: ["/prasadam-variety.jpg", "/laddu-prasadam.jpg", "/indian-temple-prasadam-sweets-box.jpg"],
    category: "Prasadam",
    temple: "Tirumala Venkateswara Temple",
    templeSlug: "tirumala-venkateswara-temple",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    stock: 15,
    variants: {
      size: [
        { name: "Small Box", priceAdjust: 0 },
        { name: "Medium Box", priceAdjust: 15 },
        { name: "Large Box", priceAdjust: 30 },
      ],
      type: [
        { name: "Mixed Sweets", priceAdjust: 0 },
        { name: "Laddu Special", priceAdjust: 5 },
        { name: "Dry Fruits Mix", priceAdjust: 20 },
      ],
    },
    features: ["Temple Made", "Fresh Daily", "Blessed"],
    specifications: {
      Contents: "Assorted Prasadam",
      "Shelf Life": "7 days",
      Storage: "Cool, dry place",
      Allergens: "Contains nuts, dairy",
    },
  },
  {
    id: "4",
    slug: "silk-pooja-cloth",
    name: "Silk Pooja Cloth",
    description:
      "Premium silk cloth for deity decoration. Woven from the finest Kanchipuram silk with traditional temple motifs and zari borders.",
    price: 65,
    images: ["/silk-angavastram-folded.jpg", "/silk-cloth-border.jpg", "/silk-pooja-cloth-red-gold.jpg"],
    category: "Pooja Items",
    temple: "Nallur Kandaswamy Temple",
    templeSlug: "nallur-kandaswamy-temple",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    stock: 20,
    variants: {
      color: [
        { name: "Red & Gold", priceAdjust: 0 },
        { name: "Yellow & Gold", priceAdjust: 0 },
        { name: "Green & Gold", priceAdjust: 5 },
        { name: "White & Silver", priceAdjust: 10 },
      ],
      size: [
        { name: "Small (1m)", priceAdjust: 0 },
        { name: "Medium (2m)", priceAdjust: 25 },
        { name: "Large (3m)", priceAdjust: 50 },
      ],
    },
    features: ["Pure Silk", "Zari Border", "Traditional Weave"],
    specifications: {
      Material: "Pure Kanchipuram Silk",
      Border: "Real Zari (Gold Thread)",
      Origin: "Kanchipuram, Tamil Nadu",
      Care: "Dry clean only",
    },
  },
  {
    id: "5",
    slug: "bronze-ganesha-idol",
    name: "Bronze Ganesha Idol",
    description:
      "Handcrafted bronze statue of Lord Ganesha. Created using the ancient lost-wax casting technique by master craftsmen. Each piece is unique and carries the blessings of generations of artisan tradition.",
    price: 150,
    originalPrice: 180,
    images: ["/bronze-ganesha-idol-statue.jpg", "/ganesha-idol-detail.jpg", "/ganesha-idol-back.jpg"],
    category: "Idols & Statues",
    temple: "Sri Ranganathaswamy Temple",
    templeSlug: "sri-ranganathaswamy-temple",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    stock: 8,
    variants: {
      size: [
        { name: '4" Height', priceAdjust: 0 },
        { name: '6" Height', priceAdjust: 75 },
        { name: '8" Height', priceAdjust: 150 },
        { name: '12" Height', priceAdjust: 300 },
      ],
      finish: [
        { name: "Natural Bronze", priceAdjust: 0 },
        { name: "Antique Finish", priceAdjust: 25 },
        { name: "Gold Plated", priceAdjust: 100 },
      ],
    },
    features: ["Lost-Wax Cast", "Panchaloha Bronze", "Artisan Made"],
    specifications: {
      Material: "Panchaloha (5-metal alloy)",
      Technique: "Lost-wax casting",
      Weight: "500g - 3kg",
      Origin: "Swamimalai, Tamil Nadu",
    },
  },
  {
    id: "6",
    slug: "camphor-tablets",
    name: "Pure Camphor Tablets",
    description:
      "100% pure camphor for aarti and pooja rituals. Burns cleanly without residue and fills the space with a purifying fragrance.",
    price: 12,
    images: ["/camphor-tablets-pack.jpg", "/camphor-burning.jpg"],
    category: "Pooja Items",
    temple: "Meenakshi Amman Temple",
    templeSlug: "meenakshi-amman-temple",
    rating: 4.5,
    reviews: 312,
    inStock: true,
    stock: 100,
    variants: {
      quantity: [
        { name: "50g Pack", priceAdjust: 0 },
        { name: "100g Pack", priceAdjust: 10 },
        { name: "250g Pack", priceAdjust: 22 },
      ],
    },
    features: ["100% Pure", "Clean Burn", "No Residue"],
    specifications: {
      Purity: "100% Natural Camphor",
      "Burn Time": "2-3 minutes per tablet",
      Storage: "Airtight container",
      Uses: "Aarti, Pooja, Meditation",
    },
  },
  {
    id: "7",
    slug: "kumkum-turmeric-set",
    name: "Kumkum & Turmeric Set",
    description:
      "Traditional kumkum and turmeric powder set for daily pooja. Made from natural ingredients following traditional recipes.",
    price: 15,
    images: ["/kumkum-turmeric-set.jpg", "/kumkum-powder.jpg"],
    category: "Pooja Items",
    temple: "Tirumala Venkateswara Temple",
    templeSlug: "tirumala-venkateswara-temple",
    rating: 4.6,
    reviews: 178,
    inStock: true,
    stock: 75,
    variants: {
      size: [
        { name: "Small Set", priceAdjust: 0 },
        { name: "Medium Set", priceAdjust: 8 },
        { name: "Large Set", priceAdjust: 15 },
      ],
    },
    features: ["Natural", "Temple Grade", "Long Lasting"],
    specifications: {
      Contents: "Kumkum, Turmeric, Chandan",
      Weight: "50g each",
      Purity: "100% Natural",
      "Shelf Life": "12 months",
    },
  },
  {
    id: "8",
    slug: "incense-sticks-collection",
    name: "Temple Incense Collection",
    description:
      "Premium incense sticks in traditional temple fragrances. Hand-rolled using natural ingredients and essential oils.",
    price: 18,
    images: ["/incense-sticks-bundle.jpg", "/incense-burning.jpg"],
    category: "Spiritual Items",
    temple: "Nallur Kandaswamy Temple",
    templeSlug: "nallur-kandaswamy-temple",
    rating: 4.7,
    reviews: 145,
    inStock: false,
    stock: 0,
    variants: {
      fragrance: [
        { name: "Sandalwood", priceAdjust: 0 },
        { name: "Jasmine", priceAdjust: 0 },
        { name: "Rose", priceAdjust: 0 },
        { name: "Mixed Pack", priceAdjust: 5 },
      ],
      quantity: [
        { name: "20 Sticks", priceAdjust: 0 },
        { name: "50 Sticks", priceAdjust: 12 },
        { name: "100 Sticks", priceAdjust: 22 },
      ],
    },
    features: ["Hand-rolled", "Natural Oils", "Long Burning"],
    specifications: {
      "Burn Time": "45 minutes per stick",
      Ingredients: "Natural herbs, oils, wood powder",
      "Sticks Per Pack": "20 / 50 / 100",
      Origin: "Bangalore, Karnataka",
    },
  },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.name} | Temple Platform Shop`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  // Get related products from same category or temple
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.templeSlug === product.templeSlug))
    .slice(0, 4)

  return (
    <MainLayout>
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </MainLayout>
  )
}
