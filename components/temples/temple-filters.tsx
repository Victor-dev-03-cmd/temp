"use client"

import { useState, useEffect } from "react"
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
import locationData from "@/config/countries-states-cities.json"

function TempleFiltersContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for filters
  const [q, setQ] = useState(searchParams.get("q") || "")
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get("country") || "")
  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "")
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "") // <-- New state for City
  
  // State for cascading dropdowns
  const [statesList, setStatesList] = useState<any[]>([])
  const [citiesList, setCitiesList] = useState<string[]>([]) // <-- New state for cities list

  // Other filters
  const [priceRange, setPriceRange] = useState([0, 500])
  const [rating, setRating] = useState<number | null>(null)
  const [amenities, setAmenities] = useState<string[]>([])

  // Effect to populate states when country changes
  useEffect(() => {
    const country = locationData.find(c => c.iso2 === selectedCountry)
    setStatesList(country?.states || [])
    setCitiesList([]) // Clear cities when country changes
    if (!searchParams.has('state')) setSelectedState("")
    if (!searchParams.has('city')) setSelectedCity("")
  }, [selectedCountry, searchParams])

  // Effect to populate cities when state changes
  useEffect(() => {
    const state = statesList.find(s => s.name === selectedState)
    setCitiesList(state?.cities || [])
    if (!searchParams.has('city')) setSelectedCity("")
  }, [selectedState, statesList, searchParams])


  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (q) params.set("q", q); else params.delete("q")
    if (selectedCountry) params.set("country", selectedCountry); else params.delete("country")
    if (selectedState) params.set("state", selectedState); else params.delete("state")
    if (selectedCity) params.set("city", selectedCity); else params.delete("city") // <-- Add city to params
    
    router.push(`/temples?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/temples")
  }

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const amenityOptions = [
    "Parking", "Wheelchair Access", "Prasadam Counter", "Shoe Storage", 
    "Rest Rooms", "Drinking Water", "Guide Services", "Photography Allowed",
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
        <div className="space-y-2 pb-4">
          <Label htmlFor="search" className="text-sm font-medium">Search Temples</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Temple name..."
              className="pl-9 bg-muted/50"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["location", "price", "rating"]} className="w-full">
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
                  value={selectedCountry} 
                  onValueChange={(value) => setSelectedCountry(value === "all" ? "" : value)}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {locationData.map(country => (
                      <SelectItem key={country.iso2} value={country.iso2}>{country.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">State / Province</Label>
                <Select 
                  value={selectedState} 
                  onValueChange={(value) => setSelectedState(value === "all" ? "" : value)} 
                  disabled={!selectedCountry || statesList.length === 0}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {statesList.map(state => (
                      <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* --- THIS IS THE NEW CITY FILTER --- */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">City</Label>
                <Select 
                  value={selectedCity} 
                  onValueChange={(value) => setSelectedCity(value === "all" ? "" : value)}
                  disabled={!selectedState || citiesList.length === 0}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {citiesList.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Other filters remain unchanged */}
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
