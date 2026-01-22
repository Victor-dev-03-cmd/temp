"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Star, Search, CheckCircle, XCircle, AlertTriangle, MoreVertical, Building2, Flag, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

const mockAllReviews = [
  {
    id: "r1",
    templeName: "Sri Ranganathaswamy Temple",
    templeSlug: "sri-ranganathaswamy-temple",
    userName: "Priya Sharma",
    userImage: "/indian-woman-avatar.png",
    rating: 5,
    date: "2024-12-15",
    comment: "A truly divine experience! The morning pooja was incredibly peaceful.",
    status: "approved",
    flagged: false,
  },
  {
    id: "r2",
    templeName: "Meenakshi Amman Temple",
    templeSlug: "meenakshi-amman-temple",
    userName: "Rajesh Kumar",
    userImage: "/indian-man-avatar.png",
    rating: 4,
    date: "2024-12-10",
    comment: "Beautiful temple with rich history. VIP darshan was worth it.",
    status: "pending",
    flagged: false,
  },
  {
    id: "r3",
    templeName: "Nallur Kandaswamy Temple",
    templeSlug: "nallur-kandaswamy-temple",
    userName: "Spam Account",
    userImage: null,
    rating: 1,
    date: "2024-12-08",
    comment: "This review contains inappropriate content and should be moderated.",
    status: "pending",
    flagged: true,
  },
  {
    id: "r4",
    templeName: "Tirumala Venkateswara Temple",
    templeSlug: "tirumala-venkateswara-temple",
    userName: "Lakshmi Devi",
    userImage: "/elderly-indian-woman-avatar.jpg",
    rating: 5,
    date: "2024-12-05",
    comment: "Have been visiting this temple for years. The online booking system makes it so convenient.",
    status: "approved",
    flagged: false,
  },
]

export default function AdminReviewsClient() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState(mockAllReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterTemple, setFilterTemple] = useState("all")

  const temples = [...new Set(reviews.map((r) => r.templeName))]

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || review.status === filterStatus
    const matchesTemple = filterTemple === "all" || review.templeName === filterTemple
    return matchesSearch && matchesStatus && matchesTemple
  })

  const handleApprove = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "approved", flagged: false } : r)))
    toast({ title: "Review approved" })
  }

  const handleReject = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)))
    toast({ title: "Review rejected" })
  }

  const handleFlag = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, flagged: !r.flagged } : r)))
    toast({ title: "Review flagged for moderation" })
  }

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`h-4 w-4 ${star <= rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
      ))}
    </div>
  )

  const getStatusBadge = (status: string, flagged: boolean) => {
    if (flagged) {
      return (
        <Badge variant="destructive">
          <Flag className="h-3 w-3 mr-1" />
          Flagged
        </Badge>
      )
    }
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reviews Moderation</h1>
        <p className="text-muted-foreground">Moderate reviews across all temples</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold">{reviews.length}</p>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-amber-600">{reviews.filter((r) => r.status === "pending").length}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-red-600">{reviews.filter((r) => r.flagged).length}</p>
            <p className="text-sm text-muted-foreground">Flagged</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-600">{reviews.filter((r) => r.status === "approved").length}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterTemple} onValueChange={setFilterTemple}>
              <SelectTrigger className="w-full sm:w-[220px]">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Temple" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Temples</SelectItem>
                {temples.map((temple) => (
                  <SelectItem key={temple} value={temple}>
                    {temple}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className={review.flagged ? "border-red-300 bg-red-50/50" : ""}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {review.userImage ? (
                    <Image
                      src={review.userImage || "/placeholder.svg"}
                      alt={review.userName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      {review.userName[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{review.userName}</span>
                        {getStatusBadge(review.status, review.flagged)}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        {review.templeName}
                        <span>·</span>
                        {renderStars(review.rating)}
                        <span>·</span>
                        {format(new Date(review.date), "MMM dd, yyyy")}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(review.id)}>
                          <XCircle className="mr-2 h-4 w-4 text-red-600" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFlag(review.id)}>
                          <Flag className="mr-2 h-4 w-4" />
                          {review.flagged ? "Unflag" : "Flag"}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/temples/${review.templeSlug}`} target="_blank" rel="noreferrer">
                            <Eye className="mr-2 h-4 w-4" />
                            View Temple
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-muted-foreground mt-2">{review.comment}</p>
                  {review.status === "pending" && (
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" onClick={() => handleApprove(review.id)}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(review.id)}>
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
