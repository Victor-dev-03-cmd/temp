"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Plus, Edit, Trash2, Clock, MapPin, Star, Search, Filter } from "lucide-react"
import { format } from "date-fns"

const mockEvents = [
  {
    id: "1",
    name: "Vaikunta Ekadasi",
    date: "2025-01-10",
    startTime: "04:00",
    endTime: "22:00",
    description:
      "Annual festival celebrating the opening of the gates of Vaikunta. Special darshan and prasadam distribution.",
    type: "festival",
    location: "Main Temple Hall",
    isHighlight: true,
    status: "upcoming",
    expectedAttendance: 50000,
  },
  {
    id: "2",
    name: "Thai Pongal Celebrations",
    date: "2025-01-14",
    startTime: "06:00",
    endTime: "18:00",
    description: "Traditional harvest festival celebrations with special poojas and cultural programs.",
    type: "festival",
    location: "Temple Premises",
    isHighlight: true,
    status: "upcoming",
    expectedAttendance: 30000,
  },
  {
    id: "3",
    name: "Monthly Ekadasi",
    date: "2025-01-25",
    startTime: "05:00",
    endTime: "21:00",
    description: "Monthly Ekadasi fasting day with special abhishekam and archana.",
    type: "regular",
    location: "Main Sanctum",
    isHighlight: false,
    status: "upcoming",
    expectedAttendance: 5000,
  },
  {
    id: "4",
    name: "Brahmotsavam",
    date: "2024-12-15",
    startTime: "05:00",
    endTime: "22:00",
    description: "Nine-day annual festival with processions and special rituals.",
    type: "festival",
    location: "Temple Complex",
    isHighlight: true,
    status: "completed",
    expectedAttendance: 100000,
  },
]

export default function VendorEventsPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState(mockEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<(typeof mockEvents)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    type: "regular",
    location: "",
    isHighlight: false,
    expectedAttendance: 0,
  })

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleOpenDialog = (event?: (typeof mockEvents)[0]) => {
    if (event) {
      setEditingEvent(event)
      setFormData({
        name: event.name,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        description: event.description,
        type: event.type,
        location: event.location,
        isHighlight: event.isHighlight,
        expectedAttendance: event.expectedAttendance,
      })
    } else {
      setEditingEvent(null)
      setFormData({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        type: "regular",
        location: "",
        isHighlight: false,
        expectedAttendance: 0,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id
            ? { ...e, ...formData, status: new Date(formData.date) > new Date() ? "upcoming" : "completed" }
            : e,
        ),
      )
      toast({ title: "Event updated", description: "The event has been updated successfully." })
    } else {
      const newEvent = {
        id: String(Date.now()),
        ...formData,
        status: new Date(formData.date) > new Date() ? "upcoming" : "completed",
      }
      setEvents([...events, newEvent])
      toast({ title: "Event created", description: "The new event has been created successfully." })
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
    toast({ title: "Event deleted", description: "The event has been removed." })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Manage temple events and festivals</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{events.filter((e) => e.status === "upcoming").length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold">{events.filter((e) => e.isHighlight).length}</p>
              </div>
              <Star className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expected Visitors</p>
                <p className="text-2xl font-bold">
                  {events
                    .filter((e) => e.status === "upcoming")
                    .reduce((sum, e) => sum + e.expectedAttendance, 0)
                    .toLocaleString()}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
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
                <TableHead>Event Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Expected Attendance</TableHead>
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
                    <div>
                      <p className="font-medium">{format(new Date(event.date), "MMM dd, yyyy")}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={event.type === "festival" ? "default" : "secondary"}>{event.type}</Badge>
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.expectedAttendance.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
            <DialogDescription>
              {editingEvent ? "Update the event details below." : "Fill in the details to create a new event."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Event Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="special">Special</SelectItem>
                    <SelectItem value="pooja">Pooja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedAttendance">Expected Attendance</Label>
                <Input
                  id="expectedAttendance"
                  type="number"
                  value={formData.expectedAttendance}
                  onChange={(e) =>
                    setFormData({ ...formData, expectedAttendance: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Featured Event</Label>
                <p className="text-sm text-muted-foreground">Highlight this event on the temple page</p>
              </div>
              <Switch
                checked={formData.isHighlight}
                onCheckedChange={(checked) => setFormData({ ...formData, isHighlight: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{editingEvent ? "Update Event" : "Create Event"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
