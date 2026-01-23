import { cookies } from "next/headers"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "temple-platform-secret-key-change-in-production")

export interface SessionUser {
  id: string
  email: string
  name: string
  role: "SUPER_ADMIN" | "TEMPLE_VENDOR" | "CUSTOMER"
  vendorId?: string
  templeId?: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionUser
  } catch {
    return null
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  if (!token) return null
  return verifyToken(token)
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}

export async function requireRole(roles: SessionUser["role"][]): Promise<SessionUser> {
  const session = await requireAuth()
  if (!roles.includes(session.role)) {
    throw new Error("Forbidden")
  }
  return session
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      vendor: {
        include: { temple: true },
      },
    },
  })

  if (!user || !user.isActive) {
    throw new Error("Invalid credentials")
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    throw new Error("Invalid credentials")
  }

  const sessionUser: SessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as SessionUser["role"],
    vendorId: user.vendor?.id,
    templeId: user.vendor?.temple?.id,
  }

  const token = await createToken(sessionUser)
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return sessionUser
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export async function register(data: {
  email: string
  password: string
  name: string
  phone?: string
  role?: "CUSTOMER" | "TEMPLE_VENDOR"
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      phone: data.phone,
      role: data.role || "CUSTOMER",
    },
  })

  return user
}
