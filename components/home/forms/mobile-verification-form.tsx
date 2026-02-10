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
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOtp = async () => {
    setIsSending(true)
    setError("")
    try {
      const res = await fetch("/api/vendor/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to send OTP.")
      }
      setOtpSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
    } finally {
      setIsSending(false)
    }
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    setError("")
    try {
      const res = await fetch("/api/vendor/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, token: otp }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Invalid OTP.")
      }
      onNext()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Verify Your Mobile Number</h2>
        <p className="text-muted-foreground">
          An OTP will be sent to <strong>{phone}</strong>.
        </p>
      </div>

      {!otpSent ? (
        <Button onClick={handleSendOtp} className="w-full" disabled={isSending}>
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending OTP...
            </>
          ) : (
            "Send OTP"
          )}
        </Button>
      ) : (
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
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isSending || isVerifying}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleVerify} disabled={!otpSent || isVerifying || otp.length < 6}>
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
