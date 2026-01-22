"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Ticket, Eye, Download, QrCode, Calendar, Clock, User } from "lucide-react"

const bookings = [
  {
    id: "TKT-2024-001",
    temple: "Sri Ranganathaswamy Temple",
    templeImage: "/hindu-temple-gopuram-colorful.jpg",
    ticketType: "VIP Darshan",
    date: "December 30, 2024",
    time: "9:00 AM",
    status: "CONFIRMED",
    devotee: "John Doe",
    rasi: "Mesha",
    nakshatram: "Ashwini",
    extraPersons: 1,
    total: 350,
    qrCode: "/qr-code-sample.png",
  },
  {
    id: "TKT-2024-002",
    temple: "Meenakshi Amman Temple",
    templeImage: "/meenakshi-temple-towers.jpg",
    ticketType: "Special Archanai",
    date: "January 5, 2025",
    time: "7:00 AM",
    status: "CONFIRMED",
    devotee: "John Doe",
    rasi: "Mesha",
    nakshatram: "Ashwini",
    extraPersons: 0,
    total: 100,
    qrCode: "/qr-code-sample.png",
  },
  {
    id: "TKT-2024-003",
    temple: "Tirupati Balaji Temple",
    templeImage: "/tirupati-temple-gold.jpg",
    ticketType: "Morning Pooja",
    date: "December 15, 2024",
    time: "6:00 AM",
    status: "COMPLETED",
    devotee: "John Doe",
    rasi: "Mesha",
    nakshatram: "Ashwini",
    extraPersons: 3,
    total: 80,
  },
]

export function BookingsClient() {
  const [selectedBooking, setSelectedBooking] = useState<(typeof bookings)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "default"
      case "COMPLETED":
        return "secondary"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-4">Book tickets to see your bookings here</p>
            <Button asChild>
              <a href="/temples">Browse Temples</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-32 aspect-video sm:aspect-square rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={booking.templeImage || "/placeholder.svg"}
                      alt={booking.temple}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{booking.temple}</h3>
                        <p className="text-sm text-primary font-medium">{booking.ticketType}</p>
                      </div>
                      <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {booking.devotee}
                      </div>
                      <div className="flex items-center gap-1">
                        <Ticket className="h-4 w-4" />
                        {booking.id}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t">
                      <p className="font-semibold">Total: ${booking.total}</p>
                      <div className="flex gap-2">
                        {booking.status === "CONFIRMED" && booking.qrCode && (
                          <Button variant="outline" size="sm">
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Code
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>{selectedBooking?.id}</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={selectedBooking.templeImage || "/placeholder.svg"}
                  alt={selectedBooking.temple}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold text-lg">{selectedBooking.temple}</h3>
                <p className="text-primary font-medium">{selectedBooking.ticketType}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Devotee Name</p>
                  <p className="font-medium">{selectedBooking.devotee}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge variant={getStatusColor(selectedBooking.status)}>{selectedBooking.status}</Badge>
                </div>
                {selectedBooking.rasi && (
                  <div>
                    <p className="text-muted-foreground">Rasi</p>
                    <p className="font-medium">{selectedBooking.rasi}</p>
                  </div>
                )}
                {selectedBooking.nakshatram && (
                  <div>
                    <p className="text-muted-foreground">Nakshatram</p>
                    <p className="font-medium">{selectedBooking.nakshatram}</p>
                  </div>
                )}
                {selectedBooking.extraPersons > 0 && (
                  <div>
                    <p className="text-muted-foreground">Extra Persons</p>
                    <p className="font-medium">{selectedBooking.extraPersons}</p>
                  </div>
                )}
              </div>

              {selectedBooking.qrCode && selectedBooking.status === "CONFIRMED" && (
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <div className="w-32 h-32 bg-muted rounded flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-semibold">Total Paid</span>
                <span className="font-semibold text-lg">${selectedBooking.total}</span>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Ticket
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
