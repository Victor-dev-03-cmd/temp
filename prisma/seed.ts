import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminEmail = "admin@v1gmail.com"
  const adminPassword = "password" // Please change this in a secure way

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log("Admin user already exists.")
    return
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  // Create the admin user
  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
      role: "SUPER_ADMIN",
      isActive: true,
    },
  })

  console.log("Admin user created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
