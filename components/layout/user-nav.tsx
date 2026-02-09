"use client"

import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function UserNav() {
  const { session, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (loading) {
    // This provides a placeholder while the session is being loaded.
    return <div className="h-9 w-9 rounded-full animate-pulse bg-muted" />
  }

  if (!session) {
    return (
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
    )
  }

  const { user, profile } = session

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback>{profile.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {profile.role === "ADMIN" && (
          <Link href="/admin">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        )}

        {profile.role === "VENDOR" && (
          <Link href="/vendor">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        )}

        {profile.role === "CUSTOMER" && (
          <Link href="/account">
            <DropdownMenuItem>My Account</DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
