"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 18000, bookings: 12000, products: 6000 },
  { month: "Feb", revenue: 22000, bookings: 14000, products: 8000 },
  { month: "Mar", revenue: 25000, bookings: 16000, products: 9000 },
  { month: "Apr", revenue: 28000, bookings: 18000, products: 10000 },
  { month: "May", revenue: 32000, bookings: 20000, products: 12000 },
  { month: "Jun", revenue: 38000, bookings: 24000, products: 14000 },
]

const templePerformance = [
  { name: "Sri Ranganathaswamy", value: 4500, bookings: 1200 },
  { name: "Meenakshi Amman", value: 3800, bookings: 980 },
  { name: "Tirupati Balaji", value: 3200, bookings: 850 },
  { name: "Nallur Kandaswamy", value: 2800, bookings: 720 },
  { name: "Batu Caves", value: 2400, bookings: 650 },
]

const recentTransactions = [
  { id: "TXN-001", type: "Ticket Booking", amount: "$150.00", status: "completed", time: "2 hours ago" },
  { id: "TXN-002", type: "Product Order", amount: "$89.50", status: "pending", time: "4 hours ago" },
  { id: "TXN-003", type: "Ticket Booking", amount: "$200.00", status: "completed", time: "6 hours ago" },
  { id: "TXN-004", type: "Vendor Withdrawal", amount: "$1,200.00", status: "processing", time: "8 hours ago" },
  { id: "TXN-005", type: "Product Order", amount: "$65.00", status: "completed", time: "10 hours ago" },
]

const categoryBreakdown = [
  { name: "Ticket Bookings", value: 45, color: "#d97706" },
  { name: "Products", value: 30, color: "#f59e0b" },
  { name: "Offerings", value: 15, color: "#fbbf24" },
  { name: "Services", value: 10, color: "#fcd34d" },
]

export function AdminDashboardClient() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Revenue Chart */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Revenue Overview</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="revenue" stroke="#d97706" strokeWidth={2} name="Total Revenue" />
              <Line type="monotone" dataKey="bookings" stroke="#f59e0b" strokeWidth={2} name="Ticket Revenue" />
              <Line type="monotone" dataKey="products" stroke="#fbbf24" strokeWidth={2} name="Product Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Temple Performance */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Top Performing Temples</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6">
            <ResponsiveContainer width="100%" height={200} className="md:!h-[250px]">
              <BarChart data={templePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#d97706" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-2 md:p-6">
            <ResponsiveContainer width="100%" height={200} className="md:!h-[250px]">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${value}%`}
                  outerRadius={60}
                  fill="#d97706"
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1 w-full sm:w-auto">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <div className="space-y-3 md:space-y-4">
            {recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base">{txn.id}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{txn.type}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-left sm:text-right">
                    <p className="font-medium text-sm md:text-base">{txn.amount}</p>
                    <p className="text-xs text-muted-foreground">{txn.time}</p>
                  </div>
                  <Badge
                    variant={
                      txn.status === "completed" ? "default" : txn.status === "pending" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
