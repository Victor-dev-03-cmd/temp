"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

interface TermsAndConditionsFormProps {
  onSubmit: () => void
  onBack: () => void
}

export function TermsAndConditionsForm({ onSubmit, onBack }: TermsAndConditionsFormProps) {
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onSubmit()
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Terms & Conditions</h2>
        <p className="text-muted-foreground">
          Please read and agree to the terms before submitting your registration.
        </p>
      </div>
      <div className="h-64 overflow-y-auto border rounded-md p-4 space-y-2 text-sm bg-muted/50">
        <h3 className="font-bold">1. Introduction</h3>
        <p>Welcome to Temple Platform. By registering as a vendor, you agree to be bound by these Terms and Conditions.</p>
        <h3 className="font-bold">2. Vendor Responsibilities</h3>
        <p>You are responsible for the accuracy of all temple information, ticket details, and product listings. You must fulfill all orders and bookings in a timely manner.</p>
        <h3 className="font-bold">3. Payments</h3>
        <p>All payments will be processed through our secure payment gateway. Payouts will be made to your designated bank account on a weekly basis, minus our platform commission of 5%.</p>
        <h3 className="font-bold">4. Prohibited Content</h3>
        <p>You may not list any items or services that are illegal, offensive, or not related to religious or temple activities.</p>
        <h3 className="font-bold">5. Termination</h3>
        <p>We reserve the right to suspend or terminate your account at any time if you violate these terms.</p>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
        <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I have read and agree to the Terms and Conditions.
        </Label>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!agreed || isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Agree & Submit <CheckCircle className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
