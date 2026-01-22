"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Package, Eye, Download, Truck } from "lucide-react"

const orders = [
  {
    id: "ORD-2024-001",
    date: "December 28, 2024",
    status: "DELIVERED",
    total: 165,
    items: [
      { name: "Brass Diya Set", quantity: 2, price: 90, image: "/brass-diya-lamp.png" },
      { name: "Temple Prasadam Box", quantity: 3, price: 75, image: "/prasadam-sweets-box.jpg" },
    ],
    shipping: {
      address: "123 Main St, Chennai, TN 600001",
      trackingNumber: "SHIP123456789",
    },
  },
  {
    id: "ORD-2024-002",
    date: "December 25, 2024",
    status: "SHIPPED",
    total: 85,
    items: [{ name: "Silk Angavastram", quantity: 1, price: 85, image: "/silk-cloth.jpg" }],
    shipping: {
      address: "456 Temple Rd, Madurai, TN 625001",
      trackingNumber: "SHIP987654321",
    },
  },
  {
    id: "ORD-2024-003",
    date: "December 20, 2024",
    status: "PROCESSING",
    total: 120,
    items: [{ name: "Silver Plated Pooja Thali", quantity: 1, price: 120, image: "/silver-pooja-thali.jpg" }],
    shipping: {
      address: "789 Divine Ave, Coimbatore, TN 641001",
    },
  },
]

export function OrdersClient() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "default"
      case "SHIPPED":
        return "secondary"
      case "PROCESSING":
        return "outline"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
            <Button asChild>
              <a href="/shop">Browse Shop</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-mono">{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground">+{order.items.length - 3} more</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                  <p className="font-semibold">Total: ${order.total}</p>
                  <div className="flex gap-2">
                    {order.shipping.trackingNumber && (
                      <Button variant="outline" size="sm">
                        <Truck className="mr-2 h-4 w-4" />
                        Track
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>{selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Order Date</span>
                <span className="font-medium">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p className="text-sm text-muted-foreground">{selectedOrder.shipping.address}</p>
                {selectedOrder.shipping.trackingNumber && (
                  <p className="text-sm mt-2">
                    <span className="text-muted-foreground">Tracking: </span>
                    <span className="font-mono">{selectedOrder.shipping.trackingNumber}</span>
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">${selectedOrder.total}</span>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
