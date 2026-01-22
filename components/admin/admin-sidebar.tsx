"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Building2,
  Users,
  ShoppingCart,
  Wallet,
  Settings,
  Globe,
  DollarSign,
  Mail,
  FileText,
  BarChart3,
  LogOut,
  ChevronDown,
  Star,
  CalendarDays,
  Languages,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

const menuItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/temples", icon: Building2, label: "Temples" },
  { href: "/admin/vendors", icon: Users, label: "Vendors" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/events", icon: CalendarDays, label: "Events" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/finance", icon: Wallet, label: "Finance" },
  { href: "/admin/reports", icon: BarChart3, label: "Reports" },
]

const settingsItems = [
  { href: "/admin/settings/general", icon: Settings, label: "General" },
  { href: "/admin/settings/localization", icon: Languages, label: "Localization" },
  { href: "/admin/settings/languages", icon: Globe, label: "Languages" },
  { href: "/admin/settings/currencies", icon: DollarSign, label: "Currencies" },
  { href: "/admin/settings/email", icon: Mail, label: "Email Templates" },
  { href: "/admin/settings/pages", icon: FileText, label: "Pages" },
  { href: "/admin/settings/taxes", icon: DollarSign, label: "Tax Settings" },
]

interface AdminSidebarProps {
  onNavigate?: () => void
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname()
  const [settingsOpen, setSettingsOpen] = useState(pathname.startsWith("/admin/settings"))

  const handleNavClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <div className="w-64 bg-card border-r flex flex-col h-full">
      <div className="p-4 border-b hidden md:block">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <span className="font-bold">Admin Panel</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={handleNavClick}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", pathname === item.href && "bg-secondary")}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}

          <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 mt-1">
              {settingsItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={handleNavClick}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", pathname === item.href && "bg-secondary")}
                    size="sm"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" asChild>
          <Link href="/api/auth/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
