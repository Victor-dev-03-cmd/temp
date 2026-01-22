"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Ticket,
  Package,
  ChevronDown,
  Search,
  MapPin,
  Globe,
  Coins,
  Check,
} from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const { getItemCount } = useCart()
  const { currency, currencies, setCurrency } = useCurrency()
  const { currentLanguage, languages, setLocale } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cartCount = getItemCount()

  const getDashboardLink = () => {
    if (!user) return "/auth/login"
    switch (user.role) {
      case "SUPER_ADMIN":
        return "/admin"
      case "TEMPLE_VENDOR":
        return "/vendor"
      default:
        return "/account"
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">Temple Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/temples"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <MapPin className="h-4 w-4" />
              Temples
            </Link>
            <Link
              href="/temples"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <Ticket className="h-4 w-4" />
              Book Tickets
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <Package className="h-4 w-4" />
              Shop
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 px-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-base">{currentLanguage.flag}</span>
                  <span className="text-xs font-medium">{currentLanguage.code.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-sm">{lang.name}</span>
                        <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
                      </div>
                    </div>
                    {currentLanguage.code === lang.code && <Check className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 px-2">
                  <Coins className="h-4 w-4" />
                  <span className="text-base">{currency.flag}</span>
                  <span className="text-xs font-medium">{currency.code}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Select Currency</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currencies.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {c.code} - {c.symbol}
                        </span>
                        <span className="text-xs text-muted-foreground">{c.name}</span>
                      </div>
                    </div>
                    {currency.code === c.code && <Check className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/bookings">
                      <Ticket className="mr-2 h-4 w-4" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/temples"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MapPin className="h-5 w-5" />
                    Temples
                  </Link>
                  <Link
                    href="/temples"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Ticket className="h-5 w-5" />
                    Book Tickets
                  </Link>
                  <Link
                    href="/shop"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="h-5 w-5" />
                    Shop
                  </Link>

                  <div className="border-t pt-4 mt-2">
                    <p className="text-sm font-medium text-muted-foreground mb-3">Preferences</p>

                    {/* Language */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between mb-2 bg-transparent">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>
                              {currentLanguage.flag} {currentLanguage.name}
                            </span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64">
                        {languages.map((lang) => (
                          <DropdownMenuItem
                            key={lang.code}
                            onClick={() => setLocale(lang.code)}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                              <span className="text-muted-foreground text-xs">({lang.nativeName})</span>
                            </div>
                            {currentLanguage.code === lang.code && <Check className="h-4 w-4 text-primary" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Currency */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between bg-transparent">
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4" />
                            <span>
                              {currency.flag} {currency.code} ({currency.symbol})
                            </span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64">
                        {currencies.map((c) => (
                          <DropdownMenuItem
                            key={c.code}
                            onClick={() => setCurrency(c.code)}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span>
                                {c.code} - {c.symbol}
                              </span>
                              <span className="text-muted-foreground text-xs">{c.name}</span>
                            </div>
                            {currency.code === c.code && <Check className="h-4 w-4 text-primary" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {!user && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button asChild>
                        <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                          Register
                        </Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
