"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Globe,
  Save,
  Upload,
  Eye,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"

export default function VendorTempleProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [templeData, setTempleData] = useState({
    name: "Sri Ranganathaswamy Temple",
    slug: "sri-ranganathaswamy-temple",
    description:
      "Sri Ranganathaswamy Temple is the largest functioning Hindu temple in the world, covering an area of 156 acres with a perimeter of 4,116m (over 10,710 feet). It is one of the most illustrious Vaishnava temples in South India.",
    shortDescription: "One of the most illustrious Vaishnava temples in South India.",
    deity: "Lord Ranganatha (Vishnu)",
    established: "9th Century AD",
    address: "Srirangam, Tiruchirappalli",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    country: "India",
    pincode: "620006",
    latitude: "10.8627",
    longitude: "78.6881",
    phone: "+91 431 243 0257",
    email: "info@srirangam.org",
    website: "https://srirangam.org",
    facebook: "https://facebook.com/srirangamtemple",
    twitter: "https://twitter.com/srirangamtemple",
    instagram: "https://instagram.com/srirangamtemple",
    youtube: "https://youtube.com/srirangamtemple",
    weekdayOpen: "06:00",
    weekdayClose: "21:00",
    weekendOpen: "06:00",
    weekendClose: "21:00",
    specialDayOpen: "05:00",
    specialDayClose: "22:00",
    isActive: true,
    isFeatured: true,
  })

  const [amenities, setAmenities] = useState([
    { id: "parking", name: "Parking", enabled: true },
    { id: "wheelchair", name: "Wheelchair Access", enabled: true },
    { id: "shoe-storage", name: "Shoe Storage", enabled: true },
    { id: "prasadam", name: "Prasadam Counter", enabled: true },
    { id: "restrooms", name: "Rest Rooms", enabled: true },
    { id: "drinking-water", name: "Drinking Water", enabled: true },
    { id: "guide-services", name: "Guide Services", enabled: false },
    { id: "accommodation", name: "Accommodation", enabled: false },
    { id: "cafeteria", name: "Cafeteria", enabled: true },
    { id: "atm", name: "ATM", enabled: false },
  ])

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast({
      title: "Temple profile updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Temple Profile</h1>
          <p className="text-muted-foreground">Manage your temple information and settings</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={templeData.isActive ? "default" : "secondary"} className="gap-1">
            {templeData.isActive ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
            {templeData.isActive ? "Active" : "Inactive"}
          </Badge>
          <Button variant="outline" asChild>
            <a href={`/temples/${templeData.slug}`} target="_blank" rel="noreferrer">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </a>
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="timings">Timings</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Update your temple's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Temple Name *</Label>
                  <Input
                    id="name"
                    value={templeData.name}
                    onChange={(e) => setTempleData({ ...templeData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={templeData.slug}
                    onChange={(e) => setTempleData({ ...templeData, slug: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deity">Main Deity</Label>
                  <Input
                    id="deity"
                    value={templeData.deity}
                    onChange={(e) => setTempleData({ ...templeData, deity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="established">Established</Label>
                  <Input
                    id="established"
                    value={templeData.established}
                    onChange={(e) => setTempleData({ ...templeData, established: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  value={templeData.shortDescription}
                  onChange={(e) => setTempleData({ ...templeData, shortDescription: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={templeData.description}
                  onChange={(e) => setTempleData({ ...templeData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag & drop an image or click to browse</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Temple Status</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable temple visibility</p>
                </div>
                <Switch
                  checked={templeData.isActive}
                  onCheckedChange={(checked) => setTempleData({ ...templeData, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
              <CardDescription>Update your temple's address and coordinates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={templeData.address}
                  onChange={(e) => setTempleData({ ...templeData, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={templeData.city}
                    onChange={(e) => setTempleData({ ...templeData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    value={templeData.state}
                    onChange={(e) => setTempleData({ ...templeData, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select
                    value={templeData.country}
                    onValueChange={(value) => setTempleData({ ...templeData, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN/ZIP Code</Label>
                  <Input
                    id="pincode"
                    value={templeData.pincode}
                    onChange={(e) => setTempleData({ ...templeData, pincode: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    value={templeData.latitude}
                    onChange={(e) => setTempleData({ ...templeData, latitude: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    value={templeData.longitude}
                    onChange={(e) => setTempleData({ ...templeData, longitude: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={templeData.phone}
                    onChange={(e) => setTempleData({ ...templeData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={templeData.email}
                    onChange={(e) => setTempleData({ ...templeData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={templeData.website}
                  onChange={(e) => setTempleData({ ...templeData, website: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Temple Timings
              </CardTitle>
              <CardDescription>Set your temple's opening and closing hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Weekdays (Monday - Friday)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opening Time</Label>
                    <Input
                      type="time"
                      value={templeData.weekdayOpen}
                      onChange={(e) => setTempleData({ ...templeData, weekdayOpen: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Time</Label>
                    <Input
                      type="time"
                      value={templeData.weekdayClose}
                      onChange={(e) => setTempleData({ ...templeData, weekdayClose: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Weekends (Saturday - Sunday)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opening Time</Label>
                    <Input
                      type="time"
                      value={templeData.weekendOpen}
                      onChange={(e) => setTempleData({ ...templeData, weekendOpen: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Time</Label>
                    <Input
                      type="time"
                      value={templeData.weekendClose}
                      onChange={(e) => setTempleData({ ...templeData, weekendClose: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Special Days / Festivals</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opening Time</Label>
                    <Input
                      type="time"
                      value={templeData.specialDayOpen}
                      onChange={(e) => setTempleData({ ...templeData, specialDayOpen: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Time</Label>
                    <Input
                      type="time"
                      value={templeData.specialDayClose}
                      onChange={(e) => setTempleData({ ...templeData, specialDayClose: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Facilities</CardTitle>
              <CardDescription>Select the amenities available at your temple</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <Label htmlFor={amenity.id} className="cursor-pointer">
                      {amenity.name}
                    </Label>
                    <Switch
                      id={amenity.id}
                      checked={amenity.enabled}
                      onCheckedChange={(checked) => {
                        setAmenities(amenities.map((a) => (a.id === amenity.id ? { ...a, enabled: checked } : a)))
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media Links
              </CardTitle>
              <CardDescription>Connect your temple's social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/yourtemple"
                  value={templeData.facebook}
                  onChange={(e) => setTempleData({ ...templeData, facebook: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter / X
                </Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/yourtemple"
                  value={templeData.twitter}
                  onChange={(e) => setTempleData({ ...templeData, twitter: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/yourtemple"
                  value={templeData.instagram}
                  onChange={(e) => setTempleData({ ...templeData, instagram: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-600" />
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  placeholder="https://youtube.com/yourtemple"
                  value={templeData.youtube}
                  onChange={(e) => setTempleData({ ...templeData, youtube: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
