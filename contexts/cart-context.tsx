"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  type: "TICKET" | "PRODUCT"
  productId?: string
  ticketId?: string
  templeId: string
  templeName: string
  name: string
  price: number
  quantity: number
  image?: string
  // Ticket specific fields
  date?: string
  time?: string
  devotee?: string
  rasi?: string
  nakshatram?: string
  extraPersons?: number
  extraPersonCharge?: number
}

interface CartContextType {
  items: CartItem[]
  loading: boolean
  addItem: (item: Omit<CartItem, "id">) => void
  addTicket: (ticket: Omit<CartItem, "id" | "type">) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getSubtotal: () => number
  getServiceFee: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "temple_platform_cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load cart:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, loading])

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // For products, check if already in cart
    if (item.type === "PRODUCT" && item.productId) {
      const existingItem = items.find((i) => i.type === "PRODUCT" && i.productId === item.productId)
      if (existingItem) {
        updateQuantity(existingItem.id, existingItem.quantity + (item.quantity || 1))
        return
      }
    }

    setItems((prev) => [...prev, { ...item, id }])
  }

  const addTicket = (ticket: Omit<CartItem, "id" | "type">) => {
    addItem({ ...ticket, type: "TICKET" })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const basePrice = item.price * item.quantity
      const extraCharge = item.extraPersons && item.extraPersonCharge ? item.extraPersons * item.extraPersonCharge : 0
      return total + basePrice + extraCharge
    }, 0)
  }

  const getServiceFee = () => {
    return getSubtotal() * 0.025 // 2.5% service fee
  }

  const getCartTotal = () => {
    return getSubtotal() + getServiceFee()
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        addTicket,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotal,
        getSubtotal,
        getServiceFee,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
