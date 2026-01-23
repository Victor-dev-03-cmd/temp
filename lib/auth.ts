import { cookies } from "next/headers"
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

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

// Removed login and register functions as they directly interacted with Prisma.
// You will need to implement your own user management and authentication logic here.
// For example, using a different ORM, a direct database connection, or an external authentication service.
