"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Ticket,
  ShoppingBag,
  DollarSign,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react"

const revenueData = {
  thisMonth: 127450,
  lastMonth: 112300,
  growth: 13.5,
  tickets: 89200,
  products: 38250,
}

const topTemples = [
  { name: "Sri Ranganathaswamy Temple", revenue: 42500, bookings: 1250, growth: 15 },
  { name: "Meenakshi Amman Temple", revenue: 38200, bookings: 980, growth: 12 },
  { name: "Batu Caves Temple", revenue: 28400, bookings: 2100, growth: 8 },
  { name: "Nallur Kandaswamy Temple", revenue: 18350, bookings: 560, growth: -3 },
]

const topProducts = [
  { name: "Brass Diya Set (Large)", sales: 245, revenue: 12250 },
  { name: "Pooja Thali Complete Kit", sales: 189, revenue: 9450 },
  { name: "Sandalwood Agarbatti (100g)", sales: 520, revenue: 5200 },
  { name: "Kumkum & Turmeric Set", sales: 312, revenue: 3120 },
]

const vendorPerformance = [
  { name: "Temple Trust Board", revenue: 52400, orders: 1850, rating: 4.9, status: "ACTIVE" },
  { name: "HR&CE Department", revenue: 38200, orders: 1240, rating: 4.7, status: "ACTIVE" },
  { name: "Jagannath Temple Admin", revenue: 24800, orders: 890, rating: 4.8, status: "ACTIVE" },
  { name: "Malaysia Hindu Sangam", revenue: 12050, orders: 420, rating: 4.5, status: "ACTIVE" },
]

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState("thisMonth")
  const [reportType, setReportType] = useState("overview")

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Platform performance and business insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.thisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {revenueData.growth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={revenueData.growth > 0 ? "text-green-600" : "text-red-600"}>
                {revenueData.growth > 0 ? "+" : ""}
                {revenueData.growth}%
              </span>{" "}
              vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Revenue</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.tickets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">70% of total revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Revenue</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenueData.products.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">30% of total revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,429</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+5.2%</span> new users
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="temples">
            <PieChart className="h-4 w-4 mr-2" />
            Temples
          </TabsTrigger>
          <TabsTrigger value="products">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="vendors">
            <Users className="h-4 w-4 mr-2" />
            Vendors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Revenue chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Category distribution chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="temples">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Temples</CardTitle>
              <CardDescription>Ranked by revenue this month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Temple</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTemples.map((temple, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{temple.name}</TableCell>
                      <TableCell>${temple.revenue.toLocaleString()}</TableCell>
                      <TableCell>{temple.bookings.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`flex items-center gap-1 ${temple.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {temple.growth >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {temple.growth >= 0 ? "+" : ""}
                          {temple.growth}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Units Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>${product.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance</CardTitle>
              <CardDescription>Active vendor metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorPerformance.map((vendor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>${vendor.revenue.toLocaleString()}</TableCell>
                      <TableCell>{vendor.orders.toLocaleString()}</TableCell>
                      <TableCell>{vendor.rating}/5.0</TableCell>
                      <TableCell>
                        <Badge variant="default">{vendor.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
