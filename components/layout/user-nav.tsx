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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation" // <-- useRouter-ஐ import செய்கிறோம்

export function UserNav() {
  const { session, loading, logout } = useAuth()
  const router = useRouter() // <-- router-ஐ initialize செய்கிறோம்

  const handleLogout = async () => {
    await logout()
    router.push("/") // <-- logout செய்த பிறகு, home பக்கத்திற்கு அனுப்புகிறோம்
  }

  if (loading) {
    // This provides a placeholder while the session is being loaded.
    return <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
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
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={profile.full_name} />
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
          <Link href="/admin/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        )}

        {profile.role === "VENDOR" && (
          <Link href="/vendor/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        )}

        {profile.role === "CUSTOMER" && (
          <Link href="/account/profile">
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}> {/* <-- புதிய handleLogout function-ஐ அழைக்கிறோம் */}
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
