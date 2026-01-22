"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Ticket,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Wallet,
  Star,
  Eye,
  Download,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "Jan", tickets: 4000, products: 2400 },
  { month: "Feb", tickets: 3000, products: 1398 },
  { month: "Mar", tickets: 2000, products: 9800 },
  { month: "Apr", tickets: 2780, products: 3908 },
  { month: "May", tickets: 1890, products: 4800 },
  { month: "Jun", tickets: 2390, products: 3800 },
]

const topItems = [
  { name: "Morning Pooja", value: 2400 },
  { name: "VIP Darshan", value: 1800 },
  { name: "Prasadam Box", value: 1600 },
  { name: "Prayer Beads", value: 1200 },
]

const salesBreakdown = [
  { name: "Tickets", value: 65, color: "hsl(var(--chart-1))" },
  { name: "Products", value: 35, color: "hsl(var(--chart-2))" },
]

export function VendorDashboardClient() {
  const stats = [
    { title: "Total Tickets Sold", value: "1,234", icon: Ticket, change: "+12%", positive: true },
    { title: "Products Sold", value: "567", icon: Package, change: "+8%", positive: true },
    { title: "Total Revenue", value: "$12,345", icon: DollarSign, change: "+15%", positive: true },
    { title: "Wallet Balance", value: "$2,345", icon: Wallet, change: "+5%", positive: true },
    { title: "Pending Orders", value: "23", icon: ShoppingCart, change: "-3%", positive: false },
    { title: "Average Rating", value: "4.8", icon: Star, change: "+0.2", positive: true },
    { title: "Temple Views", value: "5,678", icon: Eye, change: "+25%", positive: true },
    { title: "Growth Rate", value: "18%", icon: TrendingUp, change: "+3%", positive: true },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">Vendor Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
            Track your temple performance and sales metrics
          </p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid - 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 md:pb-3 p-3 md:p-6">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground truncate pr-2">
                  {stat.title}
                </CardTitle>
                <div className="p-1.5 md:p-2 bg-muted rounded-lg flex-shrink-0">
                  <IconComponent className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <div className="text-lg md:text-2xl font-bold text-foreground">{stat.value}</div>
                <p
                  className={`text-xs mt-1 font-medium ${stat.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {stat.change} <span className="hidden sm:inline">from last month</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-base md:text-lg">Revenue Overview</span>
              <Button variant="outline" size="sm" className="gap-1 w-full sm:w-auto bg-transparent">
                <Calendar className="h-4 w-4" />
                Last 6 Months
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="products"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Breakdown */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Sales Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-2 md:p-6 pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={salesBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={70}
                  fill="hsl(var(--chart-1))"
                  dataKey="value"
                >
                  {salesBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Items */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">Top Selling Items</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6 pt-0">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topItems} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="space-y-3 md:space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 md:py-3 px-2 hover:bg-muted rounded-lg transition-colors border-b last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm md:text-base truncate">Booking #TKT-{3000 + i}</p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">Pooja Ticket - {i} person(s)</p>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className="font-medium text-sm md:text-base">${(Math.random() * 100 + 20).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">1h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-0">
            <div className="space-y-3 md:space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 md:py-3 px-2 hover:bg-muted rounded-lg transition-colors border-b last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm md:text-base truncate">Order #ORD-{4000 + i}</p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{i + 1} item(s)</p>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className="font-medium text-sm md:text-base">${(Math.random() * 150 + 30).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">2h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
