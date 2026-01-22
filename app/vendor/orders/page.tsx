"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Eye, Printer, Download, CheckCircle, Clock, Package, XCircle } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1 234-567-8901",
    type: "TICKET",
    items: [
      {
        name: "VIP Darshan",
        quantity: 2,
        price: 200,
        date: "2024-12-30",
        time: "10:00 AM",
        rasi: "Mesha",
        nakshatram: "Ashwini",
      },
    ],
    total: 400,
    status: "CONFIRMED",
    paymentStatus: "PAID",
    createdAt: "2024-12-28 10:30 AM",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234-567-8902",
    type: "PRODUCT",
    items: [
      { name: "Brass Diya Set", quantity: 1, price: 45 },
      { name: "Kumkum Set", quantity: 2, price: 30 },
    ],
    total: 75,
    status: "PROCESSING",
    paymentStatus: "PAID",
    createdAt: "2024-12-28 09:15 AM",
    shippingAddress: "123 Main St, Chennai, TN 600001",
  },
  {
    id: "ORD-003",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    type: "TICKET",
    items: [
      {
        name: "Morning Pooja",
        quantity: 4,
        price: 200,
        date: "2024-12-29",
        time: "6:00 AM",
        rasi: "Vrishabha",
        nakshatram: "Rohini",
      },
    ],
    total: 200,
    status: "PENDING",
    paymentStatus: "PENDING",
    createdAt: "2024-12-28 08:45 AM",
  },
  {
    id: "ORD-004",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543211",
    type: "PRODUCT",
    items: [{ name: "Silk Angavastram", quantity: 1, price: 85 }],
    total: 85,
    status: "SHIPPED",
    paymentStatus: "PAID",
    createdAt: "2024-12-27 04:20 PM",
    shippingAddress: "456 Temple Rd, Madurai, TN 625001",
    trackingNumber: "TRACK123456",
  },
  {
    id: "ORD-005",
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 234-567-8905",
    type: "TICKET",
    items: [
      {
        name: "Special Archanai",
        quantity: 1,
        price: 100,
        date: "2024-12-31",
        time: "8:00 AM",
        rasi: "Kanya",
        nakshatram: "Hasta",
      },
    ],
    total: 100,
    status: "COMPLETED",
    paymentStatus: "PAID",
    createdAt: "2024-12-26 02:10 PM",
  },
]

export default function VendorOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "tickets") return matchesSearch && order.type === "TICKET"
    if (activeTab === "products") return matchesSearch && order.type === "PRODUCT"
    if (activeTab === "pending") return matchesSearch && order.status === "PENDING"
    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "CONFIRMED":
        return "default"
      case "PROCESSING":
        return "secondary"
      case "SHIPPED":
        return "outline"
      case "PENDING":
        return "outline"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "CONFIRMED":
        return <CheckCircle className="h-4 w-4" />
      case "PROCESSING":
        return <Clock className="h-4 w-4" />
      case "SHIPPED":
        return <Package className="h-4 w-4" />
      case "CANCELLED":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Manage your temple orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {orders.filter((o) => o.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "PROCESSING" || o.status === "CONFIRMED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${orders.filter((o) => o.paymentStatus === "PAID").reduce((acc, o) => acc + o.total, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.type}</Badge>
                  </TableCell>
                  <TableCell>{order.items.length} item(s)</TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedOrder(order)
                            setIsDetailOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" />
                          Print Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {order.status === "PENDING" && (
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Order
                          </DropdownMenuItem>
                        )}
                        {order.status === "PROCESSING" && order.type === "PRODUCT" && (
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            Mark as Shipped
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order {selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p className="text-sm">{selectedOrder.email}</p>
                  <p className="text-sm">{selectedOrder.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{selectedOrder.createdAt}</p>
                  <Badge variant={getStatusColor(selectedOrder.status)} className="mt-1">
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>

              {selectedOrder.shippingAddress && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <p className="font-medium">{selectedOrder.shippingAddress}</p>
                  {selectedOrder.trackingNumber && (
                    <p className="text-sm">
                      Tracking: <span className="font-mono">{selectedOrder.trackingNumber}</span>
                    </p>
                  )}
                </div>
              )}

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        {"date" in item && (
                          <div className="text-sm text-muted-foreground mt-1">
                            <p>
                              Date: {item.date} at {item.time}
                            </p>
                            <p>
                              Rasi: {item.rasi} | Nakshatram: {item.nakshatram}
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between items-center">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">${selectedOrder.total}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.type === "PRODUCT" && selectedOrder.status === "PROCESSING" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Update Status</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SHIPPED">Shipped</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
