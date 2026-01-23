import { PrismaClient } from "@prisma/client"
import { PrismaMySQL } from "@prisma/adapter-mysql"
import { createPool } from "mysql2"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const pool = createPool({
  uri: process.env.DATABASE_URL,
})
const adapter = new PrismaMySQL(pool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
