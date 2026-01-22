"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingBag, Ticket, Package } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

export function CartClient() {
  const { items, updateQuantity, removeItem, getSubtotal, getServiceFee, getCartTotal } = useCart()
  const [couponCode, setCouponCode] = useState("")

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring temples and add tickets or products to your cart.
            </p>
            <Button asChild>
              <Link href="/temples">Browse Temples</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=96&width=96"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {item.type === "TICKET" ? <Ticket className="h-3 w-3" /> : <Package className="h-3 w-3" />}
                            {item.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.templeName}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {item.type === "TICKET" && (
                      <div className="mt-2 text-sm text-muted-foreground space-y-1">
                        {item.date && item.time && (
                          <p>
                            Date: {item.date} at {item.time}
                          </p>
                        )}
                        {item.devotee && <p>Devotee: {item.devotee}</p>}
                        {item.rasi && (
                          <p>
                            Rasi: {item.rasi} | Nakshatram: {item.nakshatram}
                          </p>
                        )}
                        {item.extraPersons && item.extraPersons > 0 && item.extraPersonCharge && (
                          <p>
                            Extra Persons: {item.extraPersons} (+${item.extraPersons * item.extraPersonCharge})
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      {item.type === "PRODUCT" ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      )}
                      <p className="text-lg font-semibold">
                        $
                        {(
                          item.price * item.quantity +
                          (item.extraPersons && item.extraPersonCharge
                            ? item.extraPersons * item.extraPersonCharge
                            : 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Coupon Code */}
              <div className="flex gap-2">
                <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <Button variant="outline">Apply</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee (2.5%)</span>
                  <span>${getServiceFee().toFixed(2)}</span>
                </div>
                <Separator />\
