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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Building2,
  Filter,
  CalendarIcon,
  X,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import { format, isAfter, isBefore, subDays, startOfDay, endOfDay } from "date-fns"
import type { DateRange } from "react-day-picker"

const temples = [
  {
    id: "1",
    name: "Sri Venkateswara Temple",
    location: "Tirupati, Andhra Pradesh",
    state: "Andhra Pradesh",
    country: "India",
    vendor: "Temple Trust Board",
    status: "APPROVED",
    ticketCount: 12,
    productCount: 45,
    revenue: 125000,
    image: "/hindu-temple.png",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    state: "Tamil Nadu",
    country: "India",
    vendor: "HR&CE Department",
    status: "APPROVED",
    ticketCount: 8,
    productCount: 32,
    revenue: 89000,
    image: "/meenakshi-temple.jpg",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    state: "Punjab",
    country: "India",
    vendor: "SGPC",
    status: "PENDING",
    ticketCount: 0,
    productCount: 0,
    revenue: 0,
    image: "/golden-temple.jpg",
    createdAt: "2024-12-01",
  },
  {
    id: "4",
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    state: "Odisha",
    country: "India",
    vendor: "Shree Jagannath Temple Administration",
    status: "APPROVED",
    ticketCount: 6,
    productCount: 28,
    revenue: 67000,
    image: "/jagannath-temple.jpg",
    createdAt: "2024-03-10",
  },
  {
    id: "5",
    name: "Shirdi Sai Baba Temple",
    location: "Shirdi, Maharashtra",
    state: "Maharashtra",
    country: "India",
    vendor: "Shri Saibaba Sansthan Trust",
    status: "REJECTED",
    ticketCount: 0,
    productCount: 0,
    revenue: 0,
    image: "/sai-baba-temple.jpg",
    createdAt: "2024-11-25",
  },
  {
    id: "6",
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    state: "Uttar Pradesh",
    country: "India",
    vendor: "Kashi Vishwanath Trust",
    status: "APPROVED",
    ticketCount: 15,
    productCount: 52,
    revenue: 156000,
    image: "/kashi-temple.jpg",
    createdAt: "2024-04-05",
  },
  {
    id: "7",
    name: "Siddhivinayak Temple",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    country: "India",
    vendor: "Siddhivinayak Temple Trust",
    status: "PENDING",
    ticketCount: 0,
    productCount: 0,
    revenue: 0,
    image: "/siddhivinayak-temple.jpg",
    createdAt: "2024-12-10",
  },
  {
    id: "8",
    name: "Ramanathaswamy Temple",
    location: "Rameswaram, Tamil Nadu",
    state: "Tamil Nadu",
    country: "India",
    vendor: "HR&CE Department",
    status: "APPROVED",
    ticketCount: 10,
    productCount: 38,
    revenue: 94000,
    image: "/rameswaram-temple.jpg",
    createdAt: "2024-05-18",
  },
]

const uniqueStates = [...new Set(temples.map((t) => t.state))].sort()

export default function AdminTemplesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemple, setSelectedTemple] = useState<(typeof temples)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [datePreset, setDatePreset] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [revenueFilter, setRevenueFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const getDateRange = (preset: string): { from: Date; to: Date } | null => {
    const today = new Date()
    switch (preset) {
      case "today":
        return { from: startOfDay(today), to: endOfDay(today) }
      case "yesterday":
        const yesterday = subDays(today, 1)
        return { from: startOfDay(yesterday), to: endOfDay(yesterday) }
      case "last7":
        return { from: startOfDay(subDays(today, 7)), to: endOfDay(today) }
      case "last30":
        return { from: startOfDay(subDays(today, 30)), to: endOfDay(today) }
      case "last90":
        return { from: startOfDay(subDays(today, 90)), to: endOfDay(today) }
      case "custom":
        if (dateRange?.from && dateRange?.to) {
          return { from: startOfDay(dateRange.from), to: endOfDay(dateRange.to) }
        }
        return null
      default:
        return null
    }
  }

  const filteredTemples = temples.filter((temple) => {
    // Search filter
    const matchesSearch =
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.vendor.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || temple.status === statusFilter

    // Location filter
    const matchesLocation = locationFilter === "all" || temple.state === locationFilter

    // Date filter
    let matchesDate = true
    const dateFilterRange = getDateRange(datePreset)
    if (dateFilterRange) {
      const templeDate = new Date(temple.createdAt)
      matchesDate = !isBefore(templeDate, dateFilterRange.from) && !isAfter(templeDate, dateFilterRange.to)
    }

    // Revenue filter
    let matchesRevenue = true
    if (revenueFilter !== "all") {
      switch (revenueFilter) {
        case "0":
          matchesRevenue = temple.revenue === 0
          break
        case "1-50000":
          matchesRevenue = temple.revenue > 0 && temple.revenue <= 50000
          break
        case "50001-100000":
          matchesRevenue = temple.revenue > 50000 && temple.revenue <= 100000
          break
        case "100001+":
          matchesRevenue = temple.revenue > 100000
          break
      }
    }

    return matchesSearch && matchesStatus && matchesLocation && matchesDate && matchesRevenue
  })

  const activeFilterCount = [
    statusFilter !== "all",
    locationFilter !== "all",
    datePreset !== "all",
    revenueFilter !== "all",
  ].filter(Boolean).length

  const clearAllFilters = () => {
    setStatusFilter("all")
    setLocationFilter("all")
    setDatePreset("all")
    setDateRange(undefined)
    setRevenueFilter("all")
    setSearchQuery("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "default"
      case "PENDING":
        return "secondary"
      case "REJECTED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Temple Management</h1>
          <p className="text-muted-foreground text-sm md:text-base">Review and manage temple listings</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Temples</CardTitle>
            <Building2 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">{temples.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold text-green-600">
              {temples.filter((t) => t.status === "APPROVED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold text-amber-600">
              {temples.filter((t) => t.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6 md:pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">
              ${temples.reduce((acc, t) => acc + t.revenue, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="text-lg md:text-xl">All Temples</CardTitle>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search temples..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="flex flex-col gap-3 pt-3 border-t">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Status Filter */}
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Location Filter */}
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Location" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Date Filter */}
                  <Select value={datePreset} onValueChange={setDatePreset}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Date Added" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7">Last 7 Days</SelectItem>
                      <SelectItem value="last30">Last 30 Days</SelectItem>
                      <SelectItem value="last90">Last 90 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Revenue Filter */}
                  <Select value={revenueFilter} onValueChange={setRevenueFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Revenue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Revenue</SelectItem>
                      <SelectItem value="0">No Revenue</SelectItem>
                      <SelectItem value="1-50000">$1 - $50,000</SelectItem>
                      <SelectItem value="50001-100000">$50,001 - $100,000</SelectItem>
                      <SelectItem value="100001+">$100,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Date Range Picker */}
                {datePreset === "custom" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto justify-start text-left font-normal bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          "Select date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}

                {/* Active filters and clear button */}
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">
                      {filteredTemples.length} temple{filteredTemples.length !== 1 ? "s" : ""} found
                    </span>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 text-xs">
                      <X className="h-3 w-3 mr-1" />
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temple</TableHead>
                  <TableHead className="hidden md:table-cell">Vendor</TableHead>
                  <TableHead className="hidden sm:table-cell">Tickets</TableHead>
                  <TableHead className="hidden sm:table-cell">Products</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemples.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No temples found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTemples.map((temple) => (
                    <TableRow key={temple.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={temple.image || "/placeholder.svg"}
                            alt={temple.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover hidden sm:block"
                          />
                          <div>
                            <p className="font-medium text-sm md:text-base">{temple.name}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">{temple.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{temple.vendor}</TableCell>
                      <TableCell className="hidden sm:table-cell">{temple.ticketCount}</TableCell>
                      <TableCell className="hidden sm:table-cell">{temple.productCount}</TableCell>
                      <TableCell>${temple.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(temple.status)} className="text-xs">
                          {temple.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        {format(new Date(temple.createdAt), "MMM dd, yyyy")}
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
                                setSelectedTemple(temple)
                                setIsDetailOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {temple.status === "PENDING" && (
                              <>
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
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
            <DialogTitle>Temple Details</DialogTitle>
            <DialogDescription>Review temple information</DialogDescription>
          </DialogHeader>
          {selectedTemple && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Image
                  src={selectedTemple.image || "/placeholder.svg"}
                  alt={selectedTemple.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{selectedTemple.name}</h3>
                  <p className="text-muted-foreground">{selectedTemple.location}</p>
                  <Badge variant={getStatusColor(selectedTemple.status)} className="mt-1">
                    {selectedTemple.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p className="font-medium text-sm md:text-base">{selectedTemple.vendor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Registered On</p>
                  <p className="font-medium text-sm md:text-base">
                    {format(new Date(selectedTemple.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Tickets</p>
                  <p className="font-medium text-sm md:text-base">{selectedTemple.ticketCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="font-medium text-sm md:text-base">{selectedTemple.productCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="font-medium text-sm md:text-base">${selectedTemple.revenue.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium text-sm md:text-base">{selectedTemple.state}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Close
            </Button>
            {selectedTemple?.status === "PENDING" && (
              <>
                <Button variant="destructive">Reject</Button>
                <Button>Approve</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
