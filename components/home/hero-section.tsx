"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin } from "lucide-react"
import locationData from "@/config/countries-states-cities.json"

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [states, setStates] = useState<any[]>([])

  useEffect(() => {
    const country = locationData.find(c => c.iso2 === selectedCountry)
    setStates(country?.states || [])
    setSelectedState("")
  }, [selectedCountry])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedCountry) params.set("country", selectedCountry)
    if (selectedState) params.set("state", selectedState)
    router.push(`/temples?${params.toString()}`)
  }

  return (
    <section className="relative bg-gradient-to-b from-primary/10 via-background to-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('/temple-architecture-pattern-subtle.jpg')] opacity-5 bg-cover bg-center" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            Book Temple Tickets & <span className="text-primary">Shop Sacred Products</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Discover temples worldwide, book pooja tickets online, and purchase authentic religious products delivered
            to your doorstep.
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 border">
            <div className="flex flex-col gap-4">
              {/* First Row: Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search temples by name or location..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              
              {/* Second Row: Location and Search Button */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Country Select */}
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-full h-12">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationData.map((country) => (
                      <SelectItem key={country.iso2} value={country.iso2}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* State/Province Select */}
                <Select value={selectedState} onValueChange={setSelectedState} disabled={!selectedCountry || states.length === 0}>
                  <SelectTrigger className="w-full h-12">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="State/Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.name} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button size="lg" className="h-10 px-8" onClick={handleSearch}>
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Temples Listed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-sm text-muted-foreground">Tickets Booked</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10K+</p>
              <p className="text-sm text-muted-foreground">Products Sold</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">25+</p>
              <p className="text-sm text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
