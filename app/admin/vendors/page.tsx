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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Eye, Ban, CheckCircle, Users, DollarSign } from "lucide-react"

const vendors = [
  {
    id: "1",
    name: "Temple Trust Board",
    email: "admin@tirupati.org",
    phone: "+91 9876543210",
    temples: 3,
    status: "ACTIVE",
    balance: 45000,
    totalEarnings: 125000,
    joinedAt: "2024-01-15",
    avatar: "/temple-board-logo.jpg",
  },
  {
    id: "2",
    name: "HR&CE Department",
    email: "contact@hrce.tn.gov.in",
    phone: "+91 9876543211",
    temples: 12,
    status: "ACTIVE",
    balance: 89000,
    totalEarnings: 320000,
    joinedAt: "2024-02-20",
    avatar: "/generic-government-logo.png",
  },
  {
    id: "3",
    name: "SGPC",
    email: "info@sgpc.org",
    phone: "+91 9876543212",
    temples: 1,
    status: "PENDING",
    balance: 0,
    totalEarnings: 0,
    joinedAt: "2024-12-01",
    avatar: "/sikh-organization.jpg",
  },
  {
    id: "4",
    name: "Shree Jagannath Temple Administration",
    email: "admin@jagannath.org",
    phone: "+91 9876543213",
    temples: 1,
    status: "ACTIVE",
    balance: 23000,
    totalEarnings: 67000,
    joinedAt: "2024-03-10",
    avatar: "/jagannath-temple.jpg",
  },
  {
    id: "5",
    name: "Shri Saibaba Sansthan Trust",
    email: "contact@sai.org.in",
    phone: "+91 9876543214",
    temples: 1,
    status: "SUSPENDED",
    balance: 5000,
    totalEarnings: 15000,
    joinedAt: "2024-04-05",
    avatar: "/sai-baba.jpg",
  },
]

export default function AdminVendorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<(typeof vendors)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default"
      case "PENDING":
        return "secondary"
      case "SUSPENDED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Vendor Management</h1>
          <p className="text-muted-foreground">Manage temple vendors and their accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {vendors.filter((v) => v.status === "ACTIVE").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {vendors.filter((v) => v.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${vendors.reduce((acc, v) => acc + v.totalEarnings, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Vendors</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
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
                <TableHead>Vendor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Temples</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Total Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={vendor.avatar || "/placeholder.svg"} alt={vendor.name} />
                        <AvatarFallback>{vendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{vendor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{vendor.email}</p>
                      <p className="text-xs text-muted-foreground">{vendor.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.temples}</TableCell>
                  <TableCell>${vendor.balance.toLocaleString()}</TableCell>
                  <TableCell>${vendor.totalEarnings.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(vendor.status)}>{vendor.status}</Badge>
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
                            setSelectedVendor(vendor)
                            setIsDetailOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {vendor.status === "PENDING" && (
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {vendor.status === "ACTIVE" && (
                          <DropdownMenuItem className="text-destructive">
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        )}
                        {vendor.status === "SUSPENDED" && (
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Reactivate
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Vendor Details</DialogTitle>
            <DialogDescription>View vendor information and statistics</DialogDescription>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedVendor.avatar || "/placeholder.svg"} alt={selectedVendor.name} />
                  <AvatarFallback className="text-lg">{selectedVendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedVendor.name}</h3>
                  <p className="text-muted-foreground">{selectedVendor.email}</p>
                  <Badge variant={getStatusColor(selectedVendor.status)} className="mt-1">
                    {selectedVendor.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedVendor.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Joined On</p>
                  <p className="font-medium">{selectedVendor.joinedAt}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Temples</p>
                  <p className="font-medium">{selectedVendor.temples}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="font-medium">${selectedVendor.balance.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="font-medium">${selectedVendor.totalEarnings.toLocaleString()}</p>
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
