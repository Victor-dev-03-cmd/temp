"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Trash2, Clock, Users, Calendar } from "lucide-react"
import Link from "next/link"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  capacity: number
  enabled: boolean
}

export default function NewTicketPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    templeId: "",
    category: "",
    basePrice: "",
    extraPersonPrice: "",
    maxPersons: "5",
    minPersons: "1",
    advanceBookingDays: "30",
    cancellationPolicy: "24",
    requiresRasiNakshatram: false,
    requiresGotra: false,
    isActive: true,
  })

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", startTime: "06:00", endTime: "07:00", capacity: 100, enabled: true },
    { id: "2", startTime: "07:00", endTime: "08:00", capacity: 100, enabled: true },
    { id: "3", startTime: "08:00", endTime: "09:00", capacity: 150, enabled: true },
  ])

  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [newBlockedDate, setNewBlockedDate] = useState("")

  const addTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      { id: Date.now().toString(), startTime: "09:00", endTime: "10:00", capacity: 100, enabled: true },
    ])
  }

  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
  }

  const updateTimeSlot = (id: string, field: keyof TimeSlot, value: string | number | boolean) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)))
  }

  const addBlockedDate = () => {
    if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
      setBlockedDates([...blockedDates, newBlockedDate])
      setNewBlockedDate("")
    }
  }

  const removeBlockedDate = (date: string) => {
    setBlockedDates(blockedDates.filter((d) => d !== date))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/vendor/tickets")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/vendor/tickets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create Ticket Type</h1>
          <p className="text-muted-foreground">Configure a new darshan or seva ticket</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General ticket details and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ticket Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., VIP Darshan, Special Seva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="darshan">Darshan</SelectItem>
                      <SelectItem value="seva">Seva/Pooja</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                      <SelectItem value="prasadam">Prasadam</SelectItem>
                      <SelectItem value="special">Special Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this ticket includes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (INR) *</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    placeholder="300"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extraPersonPrice">Extra Person Price</Label>
                  <Input
                    id="extraPersonPrice"
                    type="number"
                    placeholder="100"
                    value={formData.extraPersonPrice}
                    onChange={(e) => setFormData({ ...formData, extraPersonPrice: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minPersons">Min Persons</Label>
                  <Input
                    id="minPersons"
                    type="number"
                    min="1"
                    value={formData.minPersons}
                    onChange={(e) => setFormData({ ...formData, minPersons: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPersons">Max Persons</Label>
                  <Input
                    id="maxPersons"
                    type="number"
                    min="1"
                    value={formData.maxPersons}
                    onChange={(e) => setFormData({ ...formData, maxPersons: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Slots
              </CardTitle>
              <CardDescription>Configure available booking slots and capacity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {timeSlots.map((slot) => (
                <div key={slot.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Switch
                    checked={slot.enabled}
                    onCheckedChange={(checked) => updateTimeSlot(slot.id, "enabled", checked)}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(slot.id, "startTime", e.target.value)}
                      className="w-32"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(slot.id, "endTime", e.target.value)}
                      className="w-32"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={slot.capacity}
                      onChange={(e) => updateTimeSlot(slot.id, "capacity", Number.parseInt(e.target.value))}
                      className="w-24"
                      placeholder="Capacity"
                    />
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTimeSlot(slot.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addTimeSlot}>
                <Plus className="h-4 w-4 mr-2" />
                Add Time Slot
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Blocked Dates
              </CardTitle>
              <CardDescription>Dates when this ticket type is unavailable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="w-48"
                />
                <Button type="button" variant="outline" onClick={addBlockedDate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Block Date
                </Button>
              </div>
              {blockedDates.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blockedDates.map((date) => (
                    <div key={date} className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm">
                      {new Date(date).toLocaleDateString()}
                      <button
                        type="button"
                        onClick={() => removeBlockedDate(date)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
              <CardDescription>Configure booking requirements and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advanceBookingDays">Advance Booking (days)</Label>
                  <Input
                    id="advanceBookingDays"
                    type="number"
                    value={formData.advanceBookingDays}
                    onChange={(e) => setFormData({ ...formData, advanceBookingDays: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">How many days in advance can users book</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancellationPolicy">Cancellation Window (hours)</Label>
                  <Input
                    id="cancellationPolicy"
                    type="number"
                    value={formData.cancellationPolicy}
                    onChange={(e) => setFormData({ ...formData, cancellationPolicy: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Hours before visit when cancellation is allowed</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Rasi/Nakshatram</Label>
                    <p className="text-sm text-muted-foreground">Ask for birth star details during booking</p>
                  </div>
                  <Switch
                    checked={formData.requiresRasiNakshatram}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresRasiNakshatram: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Gotra</Label>
                    <p className="text-sm text-muted-foreground">Ask for gotra/family lineage during booking</p>
                  </div>
                  <Switch
                    checked={formData.requiresGotra}
                    onCheckedChange={(checked) => setFormData({ ...formData, requiresGotra: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Active Status</Label>
                    <p className="text-sm text-muted-foreground">Make this ticket available for booking</p>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Ticket Type"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
