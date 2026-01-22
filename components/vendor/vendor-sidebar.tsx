"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Building2,
  Ticket,
  Package,
  ShoppingCart,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Star,
  Calendar,
  QrCode,
  ImageIcon,
  CalendarDays,
} from "lucide-react"

const menuItems = [
  { href: "/vendor", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/vendor/temple", icon: Building2, label: "Temple Profile" },
  { href: "/vendor/tickets", icon: Ticket, label: "Tickets" },
  { href: "/vendor/bookings", icon: Calendar, label: "Bookings" },
  { href: "/vendor/scan", icon: QrCode, label: "Scan Tickets" },
  { href: "/vendor/products", icon: Package, label: "Products" },
  { href: "/vendor/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/vendor/events", icon: CalendarDays, label: "Events" },
  { href: "/vendor/gallery", icon: ImageIcon, label: "Gallery" },
  { href: "/vendor/reviews", icon: Star, label: "Reviews" },
  { href: "/vendor/finance", icon: Wallet, label: "Finance" },
  { href: "/vendor/reports", icon: BarChart3, label: "Reports" },
  { href: "/vendor/settings", icon: Settings, label: "Settings" },
]

interface VendorSidebarProps {
  onNavigate?: () => void
}

export function VendorSidebar({ onNavigate }: VendorSidebarProps) {
  const pathname = usePathname()

  const handleClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <div className="w-64 bg-card border-r flex flex-col h-full">
      <div className="p-4 border-b hidden md:block">
        <Link href="/vendor" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <span className="font-bold">Vendor Panel</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={handleClick}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", pathname === item.href && "bg-secondary")}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <Link href="/" className="block mb-2" onClick={handleClick}>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Building2 className="mr-2 h-4 w-4" />
            View Temple
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" asChild>
          <Link href="/api/auth/logout" onClick={handleClick}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
