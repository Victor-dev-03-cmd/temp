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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

const ticketTypes = [
  { value: "POOJA", label: "Pooja Ticket" },
  { value: "ARCHANAI", label: "Archanai Ticket" },
  { value: "DARSHAN", label: "Darshan Ticket" },
  { value: "PARKING", label: "Parking Ticket" },
  { value: "SPECIAL", label: "Special Event" },
]

const tickets = [
  {
    id: "1",
    name: "Morning Pooja",
    type: "POOJA",
    price: 50,
    maxPerDay: 100,
    requiresRasi: true,
    requiresNakshatram: true,
    isActive: true,
  },
  {
    id: "2",
    name: "Special Archanai",
    type: "ARCHANAI",
    price: 100,
    maxPerDay: 50,
    requiresRasi: true,
    requiresNakshatram: true,
    isActive: true,
  },
  {
    id: "3",
    name: "VIP Darshan",
    type: "DARSHAN",
    price: 200,
    maxPerDay: 30,
    requiresRasi: false,
    requiresNakshatram: false,
    isActive: true,
  },
  {
    id: "4",
    name: "Car Parking",
    type: "PARKING",
    price: 20,
    maxPerDay: null,
    requiresRasi: false,
    requiresNakshatram: false,
    isActive: true,
  },
  {
    id: "5",
    name: "Festival Special",
    type: "SPECIAL",
    price: 150,
    maxPerDay: 200,
    requiresRasi: true,
    requiresNakshatram: true,
    isActive: false,
  },
]

export default function VendorTicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredTickets = tickets.filter((ticket) => ticket.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Ticket Management</h1>
          <p className="text-muted-foreground">Create and manage your temple tickets</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>Add a new ticket type for your temple</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ticketName">Ticket Name</Label>
                  <Input id="ticketName" placeholder="e.g., Morning Pooja" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticketType">Ticket Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the ticket..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPerDay">Max Bookings Per Day</Label>
                  <Input id="maxPerDay" type="number" placeholder="Leave empty for unlimited" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxExtra">Max Extra People</Label>
                  <Input id="maxExtra" type="number" defaultValue={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extraCharge">Extra Person Charge ($)</Label>
                  <Input id="extraCharge" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Rasi (Star Sign)</Label>
                    <p className="text-xs text-muted-foreground">Ask for visitor&apos;s rasi during booking</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Nakshatram</Label>
                    <p className="text-xs text-muted-foreground">Ask for visitor&apos;s nakshatram during booking</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Tickets</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
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
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Max/Day</TableHead>
                <TableHead>Fields</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticketTypes.find((t) => t.value === ticket.type)?.label}</Badge>
                  </TableCell>
                  <TableCell>${ticket.price}</TableCell>
                  <TableCell>{ticket.maxPerDay || "Unlimited"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {ticket.requiresRasi && (
                        <Badge variant="secondary" className="text-xs">
                          Rasi
                        </Badge>
                      )}
                      {ticket.requiresNakshatram && (
                        <Badge variant="secondary" className="text-xs">
                          Nakshatram
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={ticket.isActive ? "default" : "secondary"}>
                      {ticket.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
