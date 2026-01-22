"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, X, SlidersHorizontal, MapPin, Star, Ticket } from "lucide-react"
import { Suspense } from "react"

function TempleFiltersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    country: searchParams.get("country") || "",
    province: searchParams.get("province") || "",
    district: searchParams.get("district") || "",
  })

  const [priceRange, setPriceRange] = useState([0, 500])
  const [rating, setRating] = useState<number | null>(null)
  const [amenities, setAmenities] = useState<string[]>([])

  const applyFilters = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/temples?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({ q: "", country: "", province: "", district: "" })
    setPriceRange([0, 500])
    setRating(null)
    setAmenities([])
    router.push("/temples")
  }

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const amenityOptions = [
    "Parking",
    "Wheelchair Access",
    "Prasadam Counter",
    "Shoe Storage",
    "Rest Rooms",
    "Drinking Water",
    "Guide Services",
    "Photography Allowed",
  ]

  return (
    <Card className="sticky top-20 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={clearFilters}>
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* Search */}
        <div className="space-y-2 pb-4">
          <Label htmlFor="search" className="text-sm font-medium">
            Search Temples
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Temple name..."
              className="pl-9 bg-muted/50"
              value={filters.q}
              onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
            />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["location", "price", "rating"]} className="w-full">
          {/* Location Filters */}
          <AccordionItem value="location" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                Location
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Country</Label>
                <Select
                  value={filters.country}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, country: value }))}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="LK">Sri Lanka</SelectItem>
                    <SelectItem value="MY">Malaysia</SelectItem>
                    <SelectItem value="SG">Singapore</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">State / Province</Label>
                <Select
                  value={filters.province}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, province: value }))}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="TN">Tamil Nadu</SelectItem>
                    <SelectItem value="KL">Kerala</SelectItem>
                    <SelectItem value="KA">Karnataka</SelectItem>
                    <SelectItem value="AP">Andhra Pradesh</SelectItem>
                    <SelectItem value="MH">Maharashtra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">District</Label>
                <Select
                  value={filters.district}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, district: value }))}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="All Districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="madurai">Madurai</SelectItem>
                    <SelectItem value="trichy">Tiruchirappalli</SelectItem>
                    <SelectItem value="thanjavur">Thanjavur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Ticket className="h-4 w-4 text-primary" />
                Price Range
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4">
              <div className="px-1">
                <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 bg-muted rounded text-muted-foreground">${priceRange[0]}</span>
                <span className="text-muted-foreground">to</span>
                <span className="px-2 py-1 bg-muted rounded text-muted-foreground">${priceRange[1]}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating Filter */}
          <AccordionItem value="rating" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Star className="h-4 w-4 text-primary" />
                Rating
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pb-4">
              {[4.5, 4, 3.5, 3].map((r) => (
                <button
                  key={r}
                  onClick={() => setRating(rating === r ? null : r)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    rating === r ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= r ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{r}+ & above</span>
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Amenities */}
          <AccordionItem value="amenities" className="border-b-0">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="text-sm font-medium">Amenities</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pb-4">
              {amenityOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                    {amenity}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Apply Button */}
        <div className="pt-4">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function TempleFilters() {
  return (
    <Suspense fallback={<div className="h-[500px] animate-pulse bg-muted rounded-xl" />}>
      <TempleFiltersContent />
    </Suspense>
  )
}
