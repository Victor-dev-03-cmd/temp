"use client"

import * as React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context" // <-- useAuth-ஐ import செய்கிறோம்
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface OtpFormProps {
  email: string
  onSuccess: () => void
}

export function OtpForm({ email, onSuccess }: OtpFormProps) {
  const { verifyOtp } = useAuth() // <-- verifyOtp function-ஐப் பெறுகிறோம்
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await verifyOtp(email, otp) // <-- context-ல் உள்ள function-ஐ அழைக்கிறோம்
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Enter the 8-digit code sent to <strong>{email}</strong>
        </p>
        <InputOTP maxLength={8} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading || otp.length < 8}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Account"
        )}
      </Button>
    </form>
  )
}
