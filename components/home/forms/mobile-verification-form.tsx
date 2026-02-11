"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react"

interface MobileVerificationFormProps {
  phone: string
  onNext: () => void
  onBack: () => void
}

export function MobileVerificationForm({ phone, onNext, onBack }: MobileVerificationFormProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")

  // --- OTP LOGIC IS TEMPORARILY DISABLED ---
  const handleVerify = async () => {
    setIsVerifying(true)
    setError("")
    
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (otp === "123456") { // Use a mock OTP for now
      onNext()
    } else {
      setError("Invalid OTP. Please use '123456' to proceed.")
    }
    setIsVerifying(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Verify Your Mobile Number</h2>
        <p className="text-muted-foreground">
          Mobile verification is temporarily disabled. Use OTP <strong>123456</strong> to continue.
        </p>
      </div>
      
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isVerifying}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleVerify} disabled={isVerifying || otp.length < 6}>
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify & Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
