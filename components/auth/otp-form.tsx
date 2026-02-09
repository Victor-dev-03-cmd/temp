"use client"

import * as React from "react"
import { useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client" // <-- Supabase client-ஐ import செய்கிறோம்
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
  const supabase = createSupabaseBrowserClient() // <-- Supabase client-ஐ உருவாக்குகிறோம்
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!supabase) {
        setError("Supabase client is not available.")
        setIsLoading(false)
        return
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      // OTP is correct. The onAuthStateChange listener in AuthContext
      // will now detect the SIGNED_IN event and handle the rest.
      onSuccess()
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
