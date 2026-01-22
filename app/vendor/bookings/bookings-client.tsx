"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Filter, Eye, CheckCircle, XCircle, Clock, Users } from "lucide-react"

const bookings = [
  {
    id: "BK-001",
    ticketNumber: "TKT-ABC123",
    customerName: "Ramesh Kumar",
    customerEmail: "ramesh@email.com",
    temple: "Sri Venkateswara Temple",
    ticketType: "VIP Darshan",
    visitDate: "2024-12-30",
    visitTime: "09:00 AM - 10:00 AM",
    persons: 2,
    totalAmount: 400,
    status: "CONFIRMED",
    bookedAt: "2024-12-28 10:30 AM",
  },
  {
    id: "BK-002",
    ticketNumber: "TKT-DEF456",
    customerName: "Priya Sharma",
    customerEmail: "priya@email.com",
    temple: "Sri Venkateswara Temple",
    ticketType: "Special Darshan",
    visitDate: "2024-12-29",
    visitTime: "11:00 AM - 12:00 PM",
    persons: 4,
    totalAmount: 600,
    status: "CONFIRMED",
    bookedAt: "2024-12-28 09:15 AM",
  },
  {
    id: "BK-003",
    ticketNumber: "TKT-GHI789",
    customerName: "Suresh Reddy",
    customerEmail: "suresh@email.com",
    temple: "Sri Venkateswara Temple",
    ticketType: "Free Darshan",
    visitDate: "2024-12-28",
    visitTime: "06:00 AM - 07:00 AM",
    persons: 1,
    totalAmount: 0,
    status: "USED",
    bookedAt: "2024-12-27 08:00 PM",
  },
  {
    id: "BK-004",
    ticketNumber: "TKT-JKL012",
    customerName: "Lakshmi Devi",
    customerEmail: "lakshmi@email.com",
    temple: "Sri Venkateswara Temple",
    ticketType: "VIP Darshan",
    visitDate: "2024-12-31",
    visitTime: "08:00 AM - 09:00 AM",
    persons: 3,
    totalAmount: 500,
    status: "PENDING",
    bookedAt: "2024-12-28 11:45 AM",
  },
  {
    id: "BK-005",
    ticketNumber: "TKT-MNO345",
    customerName: "Venkat Rao",
    customerEmail: "venkat@email.com",
    temple: "Sri Venkateswara Temple",
    ticketType: "Special Pooja",
    visitDate: "2024-12-25",
    visitTime: "07:00 AM - 08:00 AM",
    persons: 2,
    totalAmount: 1000,
    status: "CANCELLED",
    bookedAt: "2024-12-24 03:30 PM",
  },
]

export function BookingsClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "default"
      case "PENDING":
        return "secondary"
      case "USED":
        return "outline"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="h-3 w-3" />
      case "PENDING":
        return <Clock className="h-3 w-3" />
      case "USED":
        return <CheckCircle className="h-3 w-3" />
      case "CANCELLED":
        return <XCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesDate = !dateFilter || booking.visitDate === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    todayVisitors: bookings
      .filter((b) => b.visitDate === "2024-12-28" && b.status !== "CANCELLED")
      .reduce((acc, b) => acc + b.persons, 0),
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage ticket bookings and reservations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <p className="text-xs text-muted-foreground">Ready for visit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayVisitors}</div>
            <p className="text-xs text-muted-foreground">Expected today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>View and manage customer bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ticket number..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="USED">Used</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              className="w-40"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by date"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Visit Date</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Persons</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-mono text-sm">{booking.id}</p>
                      <p className="text-xs text-muted-foreground">{booking.ticketNumber}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.ticketType}</TableCell>
                  <TableCell>{booking.visitDate}</TableCell>
                  <TableCell className="text-sm">{booking.visitTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {booking.persons}
                    </div>
                  </TableCell>
                  <TableCell>${booking.totalAmount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(booking.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
