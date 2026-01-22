"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Search, CheckCircle, XCircle, AlertTriangle, Building2, Star, Clock } from "lucide-react"
import { format } from "date-fns"

const mockAllEvents = [
  {
    id: "1",
    name: "Vaikunta Ekadasi",
    templeName: "Sri Ranganathaswamy Temple",
    templeSlug: "sri-ranganathaswamy-temple",
    date: "2025-01-10",
    time: "4:00 AM - 10:00 PM",
    type: "festival",
    status: "approved",
    isHighlight: true,
  },
  {
    id: "2",
    name: "Thai Pongal Celebrations",
    templeName: "Meenakshi Amman Temple",
    templeSlug: "meenakshi-amman-temple",
    date: "2025-01-14",
    time: "6:00 AM - 6:00 PM",
    type: "festival",
    status: "pending",
    isHighlight: true,
  },
  {
    id: "3",
    name: "Annual Festival",
    templeName: "Nallur Kandaswamy Temple",
    templeSlug: "nallur-kandaswamy-temple",
    date: "2025-08-01",
    time: "5:00 AM - 10:00 PM",
    type: "festival",
    status: "pending",
    isHighlight: true,
  },
  {
    id: "4",
    name: "Monthly Ekadasi",
    templeName: "Sri Ranganathaswamy Temple",
    templeSlug: "sri-ranganathaswamy-temple",
    date: "2025-01-25",
    time: "5:00 AM - 9:00 PM",
    type: "regular",
    status: "approved",
    isHighlight: false,
  },
]

export default function AdminEventsClient() {
  const { toast } = useToast()
  const [events, setEvents] = useState(mockAllEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterTemple, setFilterTemple] = useState("all")

  const temples = [...new Set(events.map((e) => e.templeName))]

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    const matchesTemple = filterTemple === "all" || event.templeName === filterTemple
    return matchesSearch && matchesStatus && matchesTemple
  })

  const handleApprove = (id: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status: "approved" } : e)))
    toast({ title: "Event approved", description: "The event is now visible to visitors." })
  }

  const handleReject = (id: string) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, status: "rejected" } : e)))
    toast({ title: "Event rejected" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <p className="text-muted-foreground">Approve and manage events across all temples</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{events.length}</p>
            <p className="text-sm text-muted-foreground">Total Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-amber-600">{events.filter((e) => e.status === "pending").length}</p>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-600">{events.filter((e) => e.status === "approved").length}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-primary">{events.filter((e) => e.isHighlight).length}</p>
            <p className="text-sm text-muted-foreground">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterTemple} onValueChange={setFilterTemple}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Temple" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Temples</SelectItem>
                {temples.map((temple) => (
                  <SelectItem key={temple} value={temple}>
                    {temple}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Temple</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.name}</span>
                      {event.isHighlight && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`/temples/${event.templeSlug}`}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Building2 className="h-3 w-3" />
                      {event.templeName}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{format(new Date(event.date), "MMM dd, yyyy")}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={event.type === "festival" ? "default" : "secondary"}>{event.type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {event.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => handleApprove(event.id)}>
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleReject(event.id)}>
                            Reject
                          </Button>
                        </>
                      )}
                      {event.status === "approved" && (
                        <Button size="sm" variant="outline" onClick={() => handleReject(event.id)}>
                          Hide
                        </Button>
                      )}
                      {event.status === "rejected" && (
                        <Button size="sm" variant="outline" onClick={() => handleApprove(event.id)}>
                          Restore
                        </Button>
                      )}
                    </div>
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
