"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { VendorRegistrationModal } from "./vendor-registration-modal"
import { Building2, ArrowRight } from "lucide-react"

export function CTASection() {
  const [modalOpen, setModalOpen] = useState(false)
  const { session } = useAuth()
  const router = useRouter()

  const handleRegisterClick = () => {
    if (!session) {
      // If user is not logged in, redirect to login page
      router.push("/auth/login?redirect=/")
    } else {
      // If user is logged in, open the modal
      setModalOpen(true)
    }
  }

  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 lg:p-16 text-center text-primary-foreground">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Building2 className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Are You a Temple Administrator?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto text-pretty">
              Join our platform to digitize your temple&apos;s ticketing system, sell products online, and reach devotees
              worldwide. Easy setup, secure payments, and complete control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={handleRegisterClick}>
                Register Your Temple
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <VendorRegistrationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
