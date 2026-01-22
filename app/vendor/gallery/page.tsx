"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  Trash2,
  Eye,
  Download,
  Grid3X3,
  List,
  Search,
  Filter,
  ImagePlus,
  Star,
  MoreVertical,
  Edit,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockGalleryImages = [
  {
    id: "1",
    url: "/sri-ranganathaswamy-temple-gopuram.jpg",
    title: "Main Gopuram",
    category: "architecture",
    isFeatured: true,
    uploadedAt: "2024-12-01",
  },
  {
    id: "2",
    url: "/temple-corridor-pillars.jpg",
    title: "Temple Corridor",
    category: "architecture",
    isFeatured: false,
    uploadedAt: "2024-12-02",
  },
  {
    id: "3",
    url: "/temple-deity-sanctum.jpg",
    title: "Main Deity",
    category: "deity",
    isFeatured: true,
    uploadedAt: "2024-12-03",
  },
  {
    id: "4",
    url: "/temple-gopuram-tower.jpg",
    title: "Gopuram Tower",
    category: "architecture",
    isFeatured: false,
    uploadedAt: "2024-12-04",
  },
  {
    id: "5",
    url: "/temple-tank-water.jpg",
    title: "Temple Tank",
    category: "premises",
    isFeatured: false,
    uploadedAt: "2024-12-05",
  },
  {
    id: "6",
    url: "/temple-evening-lamps.jpg",
    title: "Evening Lamps",
    category: "rituals",
    isFeatured: true,
    uploadedAt: "2024-12-06",
  },
  {
    id: "7",
    url: "/temple-entrance-gate.jpg",
    title: "Entrance Gate",
    category: "architecture",
    isFeatured: false,
    uploadedAt: "2024-12-07",
  },
  {
    id: "8",
    url: "/temple-ceiling-art.jpg",
    title: "Ceiling Art",
    category: "art",
    isFeatured: false,
    uploadedAt: "2024-12-08",
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "architecture", label: "Architecture" },
  { value: "deity", label: "Deity" },
  { value: "premises", label: "Premises" },
  { value: "festival", label: "Festival" },
  { value: "rituals", label: "Rituals" },
  { value: "art", label: "Art" },
]

export default function VendorGalleryPage() {
  const { toast } = useToast()
  const [images, setImages] = useState(mockGalleryImages)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<(typeof mockGalleryImages)[0] | null>(null)

  const [uploadData, setUploadData] = useState({
    title: "",
    category: "architecture",
    isFeatured: false,
  })

  const filteredImages = images.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || img.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const toggleSelectImage = (id: string) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((img) => img.id))
    }
  }

  const handleDeleteSelected = () => {
    setImages(images.filter((img) => !selectedImages.includes(img.id)))
    setSelectedImages([])
    toast({ title: "Images deleted", description: `${selectedImages.length} image(s) have been removed.` })
  }

  const handleUpload = () => {
    const newImage = {
      id: String(Date.now()),
      url: "/temple-photo.jpg",
      title: uploadData.title,
      category: uploadData.category,
      isFeatured: uploadData.isFeatured,
      uploadedAt: new Date().toISOString().split("T")[0],
    }
    setImages([newImage, ...images])
    setIsUploadDialogOpen(false)
    setUploadData({ title: "", category: "architecture", isFeatured: false })
    toast({ title: "Image uploaded", description: "The new image has been added to the gallery." })
  }

  const handleEdit = (image: (typeof mockGalleryImages)[0]) => {
    setEditingImage(image)
    setIsEditDialogOpen(true)
  }

  const handleUpdateImage = () => {
    if (editingImage) {
      setImages(images.map((img) => (img.id === editingImage.id ? editingImage : img)))
      setIsEditDialogOpen(false)
      setEditingImage(null)
      toast({ title: "Image updated", description: "The image details have been updated." })
    }
  }

  const toggleFeatured = (id: string) => {
    setImages(images.map((img) => (img.id === id ? { ...img, isFeatured: !img.isFeatured } : img)))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">Upload and manage temple photos</p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <ImagePlus className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{images.length}</p>
              <p className="text-sm text-muted-foreground">Total Images</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{images.filter((i) => i.isFeatured).length}</p>
              <p className="text-sm text-muted-foreground">Featured</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{new Set(images.map((i) => i.category)).size}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">2.4 GB</p>
              <p className="text-sm text-muted-foreground">Storage Used</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              {selectedImages.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete ({selectedImages.length})
                </Button>
              )}
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {filteredImages.length > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <Checkbox checked={selectedImages.length === filteredImages.length} onCheckedChange={toggleSelectAll} />
              <span className="text-sm text-muted-foreground">Select all ({filteredImages.length} images)</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className={`group overflow-hidden ${selectedImages.includes(image.id) ? "ring-2 ring-primary" : ""}`}
            >
              <div className="relative aspect-[4/3]">
                <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedImages.includes(image.id)}
                    onCheckedChange={() => toggleSelectImage(image.id)}
                    className="bg-white"
                  />
                </div>
                {image.isFeatured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-500">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(image)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleFeatured(image.id)}>
                        <Star className="mr-2 h-4 w-4" />
                        {image.isFeatured ? "Remove Featured" : "Set Featured"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setImages(images.filter((i) => i.id !== image.id))
                          toast({ title: "Image deleted" })
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium truncate">{image.title}</p>
                <p className="text-sm text-muted-foreground capitalize">{image.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredImages.map((image) => (
                <div key={image.id} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                  <Checkbox
                    checked={selectedImages.includes(image.id)}
                    onCheckedChange={() => toggleSelectImage(image.id)}
                  />
                  <div className="relative w-20 h-14 rounded overflow-hidden">
                    <Image src={image.url || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{image.title}</p>
                      {image.isFeatured && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">{image.category}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{image.uploadedAt}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(image)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setImages(images.filter((i) => i.id !== image.id))
                        toast({ title: "Image deleted" })
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Photos</DialogTitle>
            <DialogDescription>Add new photos to your temple gallery</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-2">Drag & drop images here, or click to browse</p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Image Title</Label>
              <Input
                id="title"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                placeholder="Enter image title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={uploadData.category}
                onValueChange={(value) => setUploadData({ ...uploadData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.value !== "all")
                    .map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={uploadData.isFeatured}
                onCheckedChange={(checked) => setUploadData({ ...uploadData, isFeatured: checked as boolean })}
              />
              <Label htmlFor="featured">Set as featured image</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>Update image details</DialogDescription>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4 py-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={editingImage.url || "/placeholder.svg"}
                  alt={editingImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editTitle">Image Title</Label>
                <Input
                  id="editTitle"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCategory">Category</Label>
                <Select
                  value={editingImage.category}
                  onValueChange={(value) => setEditingImage({ ...editingImage, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c.value !== "all")
                      .map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="editFeatured"
                  checked={editingImage.isFeatured}
                  onCheckedChange={(checked) => setEditingImage({ ...editingImage, isFeatured: checked as boolean })}
                />
                <Label htmlFor="editFeatured">Set as featured image</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateImage}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
