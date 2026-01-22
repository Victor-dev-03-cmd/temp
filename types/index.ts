export interface Temple {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  address: string
  city: string
  district: string
  province: string
  country: string
  latitude?: number
  longitude?: number
  phone?: string
  email?: string
  website?: string
  openingTime?: string
  closingTime?: string
  featuredImage?: string
  isActive: boolean
  isFeatured: boolean
  viewCount: number
  vendor?: {
    id: string
    businessName: string
  }
  gallery?: {
    id: string
    imageUrl: string
    caption?: string
  }[]
  _count?: {
    tickets: number
    products: number
    reviews: number
  }
}

export interface Ticket {
  id: string
  templeId: string
  name: string
  type: "POOJA" | "ARCHANAI" | "DARSHAN" | "PARKING" | "SPECIAL"
  description?: string
  price: number
  currency: string
  maxBookingsPerDay?: number
  requiresName: boolean
  requiresRasi: boolean
  requiresNakshatram: boolean
  maxExtraPeople: number
  extraPersonCharge: number
  isActive: boolean
  vehiclePricing?: {
    id: string
    vehicleType: string
    price: number
  }[]
}

export interface Product {
  id: string
  templeId: string
  name: string
  slug: string
  sku?: string
  description?: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  costPrice?: number
  currency: string
  stock: number
  lowStockThreshold: number
  weight?: number
  weightUnit: string
  featuredImage?: string
  isActive: boolean
  isFeatured: boolean
  images?: {
    id: string
    imageUrl: string
    altText?: string
  }[]
  collections?: {
    id: string
    name: string
    slug: string
  }[]
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  orderNumber: string
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"
  subtotal: number
  shippingCost: number
  taxAmount: number
  serviceFee: number
  discountAmount: number
  totalAmount: number
  currency: string
  shippingMethod?: string
  trackingNumber?: string
  createdAt: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    totalPrice: number
  }[]
}

export interface TicketBooking {
  id: string
  bookingNumber: string
  bookingDate: string
  visitorName: string
  visitorPhone?: string
  visitorEmail?: string
  rasi?: string
  nakshatram?: string
  extraPeopleCount: number
  vehicleType?: string
  vehicleNumber?: string
  quantity: number
  unitPrice: number
  extraPeopleCharge: number
  serviceFee: number
  totalAmount: number
  currency: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "USED" | "EXPIRED"
  qrCode?: string
  ticket: Ticket
  temple: Temple
}

export interface Vendor {
  id: string
  businessName: string
  businessEmail: string
  businessPhone: string
  ticketCommission: number
  productCommission: number
  isApproved: boolean
  walletBalance: number
  temple?: Temple
}

export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalTickets: number
  totalProducts: number
  pendingOrders: number
  pendingWithdrawals: number
  recentOrders: Order[]
  recentBookings: TicketBooking[]
}
