import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Users,
  Ticket,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { AdminDashboardClient } from "@/components/admin/admin-dashboard-client"

export const metadata = {
  title: "Admin Dashboard - Temple Platform",
}

export default function AdminDashboard() {
  const stats = [
    { title: "Total Temples", value: "156", icon: Building2, change: "+12%", trend: "up" },
    { title: "Active Users", value: "8,432", icon: Users, change: "+23%", trend: "up" },
    { title: "Tickets Booked", value: "45,231", icon: Ticket, change: "+18%", trend: "up" },
    { title: "Products Sold", value: "12,847", icon: Package, change: "+15%", trend: "up" },
    { title: "Total Revenue", value: "$234,567", icon: DollarSign, change: "+28%", trend: "up" },
    { title: "Pending Orders", value: "89", icon: ShoppingCart, change: "-5%", trend: "down" },
    { title: "System Health", value: "99.8%", icon: Activity, change: "+0.2%", trend: "up" },
    { title: "Growth Rate", value: "24%", icon: TrendingUp, change: "+8%", trend: "up" },
  ]

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header - Responsive text sizes */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your platform performance.
        </p>
      </div>

      {/* Stats Grid - 2 cols on mobile, 4 on large screens */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-3 w-3 md:h-4 md:w-4 text-amber-600" />
            </CardHeader>
            <CardContent className="space-y-1 md:space-y-2 p-3 pt-0 md:p-6 md:pt-0">
              <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
              <div
                className={`flex items-center gap-1 text-[10px] md:text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-2.5 w-2.5 md:h-3 md:w-3" />
                ) : (
                  <ArrowDownRight className="h-2.5 w-2.5 md:h-3 md:w-3" />
                )}
                <span className="hidden sm:inline">{stat.change} from last month</span>
                <span className="sm:hidden">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables */}
      <AdminDashboardClient />
    </div>
  )
}
