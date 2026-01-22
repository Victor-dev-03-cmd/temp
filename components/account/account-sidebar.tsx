"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Package, Ticket, User, Settings, LogOut } from "lucide-react"

const menuItems = [
  { href: "/account/orders", icon: Package, label: "My Orders" },
  { href: "/account/bookings", icon: Ticket, label: "My Bookings" },
  { href: "/account/profile", icon: User, label: "Profile" },
  { href: "/account/settings", icon: Settings, label: "Settings" },
]

export function AccountSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href && "bg-secondary")}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" asChild>
          <Link href="/api/auth/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </nav>
    </aside>
  )
}
