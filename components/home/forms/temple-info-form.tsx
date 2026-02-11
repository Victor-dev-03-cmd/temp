"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import locationData from "@/config/countries-states-cities.json"
import { ArrowRight, Loader2 } from "lucide-react"

const formSchema = z.object({
  templeName: z.string().min(2, "Temple name is required."),
  ownerName: z.string().min(2, "Owner name is required."),
  address: z.string().min(5, "Full address is required."),
  country: z.string({ required_error: "Please select a country." }),
  state: z.string({ required_error: "Please select a state/province." }),
  city: z.string({ required_error: "Please select a city." }),
  vendorEmail: z.string().email(),
  vendorMobile: z.string().min(9, "Enter a valid 9 or 10-digit mobile number."),
})

interface TempleInfoFormProps {
  onNext: (data: z.infer<typeof formSchema>) => void
}

export function TempleInfoForm({ onNext }: TempleInfoFormProps) {
  const { session } = useAuth()
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [states, setStates] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorEmail: session?.user.email,
      country: "IN",
    },
  })

  const watchedCountry = watch("country")
  const watchedState = watch("state")

  useEffect(() => {
    const country = locationData.find(c => c.iso2 === watchedCountry)
    setSelectedCountry(country || null)
    setStates(country?.states || [])
    setCities([])
    if (country) {
      setValue("state", "")
      setValue("city", "")
    }
  }, [watchedCountry, setValue])

  useEffect(() => {
    const state = states.find(s => s.name === watchedState)
    setCities(state?.cities || [])
    if (state) {
      setValue("city", "")
    }
  }, [watchedState, states, setValue])

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="templeName">Temple Name</Label>
          <Controller name="templeName" control={control} render={({ field }) => <Input id="templeName" {...field} />} />
          {errors.templeName && <p className="text-red-500 text-sm">{errors.templeName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Controller name="ownerName" control={control} render={({ field }) => <Input id="ownerName" {...field} />} />
          {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Full Address</Label>
        <Controller name="address" control={control} render={({ field }) => <Input id="address" {...field} placeholder="Street, Area" />} />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="country"><SelectValue placeholder="Select Country" /></SelectTrigger>
                <SelectContent>
                  {locationData.map(c => <SelectItem key={c.iso2} value={c.iso2}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State / Province</Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} disabled={!watchedCountry}>
                <SelectTrigger id="state"><SelectValue placeholder="Select State" /></SelectTrigger>
                <SelectContent>
                  {states.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} disabled={!watchedState}>
                <SelectTrigger id="city"><SelectValue placeholder="Select City" /></SelectTrigger>
                <SelectContent>
                  {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vendorEmail">Your Email (Registered)</Label>
          <Controller name="vendorEmail" control={control} render={({ field }) => <Input id="vendorEmail" {...field} type="email" disabled />} />
          {errors.vendorEmail && <p className="text-red-500 text-sm">{errors.vendorEmail.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendorMobile">Mobile Number</Label>
          <div className="relative">
            {selectedCountry && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {selectedCountry.phone_code}
              </span>
            )}
            <Controller
              name="vendorMobile"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="vendorMobile"
                  type="tel"
                  placeholder="769200572"
                  className="pl-14"
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                    field.onChange(sanitizedValue);
                  }}
                />
              )}
            />
          </div>
          {errors.vendorMobile && <p className="text-red-500 text-sm">{errors.vendorMobile.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Next Step"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
