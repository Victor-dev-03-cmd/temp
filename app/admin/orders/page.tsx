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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, ShoppingCart, Package, DollarSign, Clock, CalendarIcon, X } from "lucide-react"
import { format, subDays, startOfDay, endOfDay, isWithinInterval, parseISO } from "date-fns"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    temple: "Sri Venkateswara Temple",
    type: "TICKET",
    items: [{ name: "VIP Darshan", quantity: 2, price: 200 }],
    total: 400,
    status: "COMPLETED",
    paymentStatus: "PAID",
    createdAt: "2024-12-28T10:30:00",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    temple: "Meenakshi Amman Temple",
    type: "PRODUCT",
    items: [
      { name: "Brass Diya Set", quantity: 1, price: 45 },
      { name: "Kumkum Set", quantity: 2, price: 30 },
    ],
    total: 75,
    status: "PROCESSING",
    paymentStatus: "PAID",
    createdAt: "2024-12-28T09:15:00",
  },
  {
    id: "ORD-003",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    temple: "Jagannath Temple",
    type: "TICKET",
    items: [{ name: "Morning Pooja", quantity: 4, price: 200 }],
    total: 200,
    status: "PENDING",
    paymentStatus: "PENDING",
    createdAt: "2024-12-27T08:45:00",
  },
  {
    id: "ORD-004",
    customer: "Priya Sharma",
    email: "priya@example.com",
    temple: "Sri Venkateswara Temple",
    type: "MIXED",
    items: [
      { name: "Special Archanai", quantity: 1, price: 100 },
      { name: "Prasadam Box", quantity: 2, price: 50 },
    ],
    total: 150,
    status: "COMPLETED",
    paymentStatus: "PAID",
    createdAt: "2024-12-26T16:20:00",
  },
  {
    id: "ORD-005",
    customer: "Mike Johnson",
    email: "mike@example.com",
    temple: "Meenakshi Amman Temple",
    type: "PRODUCT",
    items: [{ name: "Silk Angavastram", quantity: 1, price: 85 }],
    total: 85,
    status: "CANCELLED",
    paymentStatus: "REFUNDED",
    createdAt: "2024-12-20T14:10:00",
  },
  {
    id: "ORD-006",
    customer: "Anita Patel",
    email: "anita@example.com",
    temple: "Golden Temple",
    type: "TICKET",
    items: [{ name: "Special Darshan", quantity: 3, price: 150 }],
    total: 450,
    status: "COMPLETED",
    paymentStatus: "PAID",
    createdAt: "2024-12-15T11:00:00",
  },
  {
    id: "ORD-007",
    customer: "Suresh Menon",
    email: "suresh@example.com",
    temple: "Kashi Vishwanath Temple",
    type: "PRODUCT",
    items: [{ name: "Rudraksha Mala", quantity: 2, price: 120 }],
    total: 240,
    status: "COMPLETED",
    paymentStatus: "PAID",
    createdAt: "2024-12-01T09:30:00",
  },
]

type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const [dateFilter, setDateFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const getDateRange = (filter: string): DateRange => {
    const today = new Date()
    switch (filter) {
      case "today":
        return { from: startOfDay(today), to: endOfDay(today) }
      case "yesterday":
        const yesterday = subDays(today, 1)
        return { from: startOfDay(yesterday), to: endOfDay(yesterday) }
      case "last7days":
        return { from: startOfDay(subDays(today, 7)), to: endOfDay(today) }
      case "last30days":
        return { from: startOfDay(subDays(today, 30)), to: endOfDay(today) }
      case "last90days":
        return { from: startOfDay(subDays(today, 90)), to: endOfDay(today) }
      case "custom":
        return dateRange
      default:
        return { from: undefined, to: undefined }
    }
  }

  const isOrderInDateRange = (orderDate: string, range: DateRange): boolean => {
    if (!range.from && !range.to) return true
    const date = parseISO(orderDate)
    if (range.from && range.to) {
      return isWithinInterval(date, { start: range.from, end: range.to })
    }
    if (range.from) {
      return date >= range.from
    }
    if (range.to) {
      return date <= range.to
    }
    return true
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.temple.toLowerCase().includes(searchQuery.toLowerCase())

    const currentDateRange = getDateRange(dateFilter)
    const matchesDate = isOrderInDateRange(order.createdAt, currentDateRange)

    if (activeTab === "all") return matchesSearch && matchesDate
    if (activeTab === "tickets") return matchesSearch && matchesDate && order.type === "TICKET"
    if (activeTab === "products") return matchesSearch && matchesDate && order.type === "PRODUCT"
    if (activeTab === "pending") return matchesSearch && matchesDate && order.status === "PENDING"
    return matchesSearch && matchesDate
  })

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value)
    if (value !== "custom") {
      setDateRange({ from: undefined, to: undefined })
    }
  }

  const clearDateFilter = () => {
    setDateFilter("all")
    setDateRange({ from: undefined, to: undefined })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "PROCESSING":
        return "secondary"
      case "PENDING":
        return "outline"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "default"
      case "PENDING":
        return "secondary"
      case "REFUNDED":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatOrderDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd, yyyy hh:mm a")
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground text-sm md:text-base">View and manage all orders across temples</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">{filteredOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Pending</CardTitle>
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-amber-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold text-amber-600">
              {filteredOrders.filter((o) => o.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Processing</CardTitle>
            <Package className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold text-blue-600">
              {filteredOrders.filter((o) => o.status === "PROCESSING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">
              $
              {filteredOrders
                .filter((o) => o.paymentStatus === "PAID")
                .reduce((acc, o) => acc + o.total, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex">
                  <TabsTrigger value="all" className="text-xs md:text-sm">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="tickets" className="text-xs md:text-sm">
                    Tickets
                  </TabsTrigger>
                  <TabsTrigger value="products" className="text-xs md:text-sm">
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs md:text-sm">
                    Pending
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-1 gap-2 md:justify-end">
                <div className="relative flex-1 md:flex-initial md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by Date:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                  <SelectTrigger className="w-[140px] md:w-[160px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last90days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                {dateFilter === "custom" && (
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-auto justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          "Pick date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={(range) => {
                          setDateRange({ from: range?.from, to: range?.to })
                        }}
                        numberOfMonths={2}
                      />
                      <div className="p-3 border-t flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setDateRange({ from: undefined, to: undefined })
                          }}
                        >
                          Clear
                        </Button>
                        <Button size="sm" onClick={() => setIsCalendarOpen(false)}>
                          Apply
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {dateFilter !== "all" && (
                  <Button variant="ghost" size="sm" onClick={clearDateFilter} className="h-8 px-2">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear date filter</span>
                  </Button>
                )}
              </div>

              {dateFilter !== "all" && (
                <Badge variant="secondary" className="ml-auto">
                  {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""} found
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Temple</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="hidden sm:table-cell">Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Order Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No orders found for the selected filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium text-xs md:text-sm">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{order.customer}</p>
                          <p className="text-xs text-muted-foreground hidden md:block">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[150px] truncate">{order.temple}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">
                          {order.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">${order.total}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={getPaymentStatusColor(order.paymentStatus)} className="text-xs">
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)} className="text-xs">
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                        {formatOrderDate(order.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Temple</p>
                  <p className="font-medium">{selectedOrder.temple}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{formatOrderDate(selectedOrder.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
                    <Badge variant={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 flex justify-between items-center">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">${selectedOrder.total}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
