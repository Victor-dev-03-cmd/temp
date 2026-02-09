"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from "lucide-react"
import countries from "@/config/countries.json"

export function RegisterForm() {
  const router = useRouter()
  const { register, login } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER" as "CUSTOMER" | "TEMPLE_VENDOR",
    country: countries[0].iso,
  })
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCountryChange = (value: string) => {
    const country = countries.find(c => c.iso === value)
    if (country) {
      setSelectedCountry(country)
      setFormData((prev) => ({
        ...prev,
        country: country.iso,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      setLoading(false)
      return
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: `${selectedCountry.code}${formData.phone}`,
        password: formData.password,
        role: formData.role,
      })
      // Automatically log in the user after successful registration
      await login(formData.email, formData.password)
      setSuccess(true)
      setTimeout(() => {
        router.push("/") // Redirect to home page
        router.refresh() // Refresh the page to update navbar
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert className="border-green-500 bg-green-50 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Registration successful! Redirecting to home...</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-center text-2xl font-bold text-blue-500 mb-4">DEBUG: FORM TEST</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value as "CUSTOMER" | "TEMPLE_VENDOR" }))
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CUSTOMER" id="customer" />
                <Label htmlFor="customer" className="cursor-pointer">
                  Customer
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="TEMPLE_VENDOR" id="vendor" />
                <Label htmlFor="vendor" className="cursor-pointer">
                  Temple Vendor
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                className="pl-10"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2 col-span-1">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={handleCountryChange} value={formData.country}>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.iso} value={country.iso}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {selectedCountry.code}
                </span>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="123 456 7890"
                  className="pl-12"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 8 characters"
                className="pl-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="pl-10"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By registering, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
