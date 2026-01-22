"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Star, Search, ThumbsUp, Reply, MoreVertical, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

const mockReviews = [
  {
    id: "r1",
    userName: "Priya Sharma",
    userImage: "/indian-woman-avatar.png",
    userEmail: "priya@example.com",
    rating: 5,
    date: "2024-12-15",
    title: "Divine Experience",
    comment:
      "A truly divine experience! The morning pooja was incredibly peaceful. The temple staff were very helpful and the entire atmosphere was spiritually uplifting. The prasadam was delicious and the darshan was smooth thanks to the online booking.",
    helpful: 24,
    status: "approved",
    ticketType: "VIP Darshan",
    visitDate: "2024-12-14",
    reply: null,
  },
  {
    id: "r2",
    userName: "Rajesh Kumar",
    userImage: "/indian-man-avatar.png",
    userEmail: "rajesh@example.com",
    rating: 4,
    title: "Good but crowded",
    date: "2024-12-10",
    comment:
      "Beautiful temple with rich history. VIP darshan was worth it, saved a lot of time. The prasadam was delicious! Only issue was the crowd management could be better during peak hours.",
    helpful: 18,
    status: "approved",
    ticketType: "Morning Pooja",
    visitDate: "2024-12-09",
    reply: "Thank you for your feedback! We are working on improving crowd management during peak hours.",
  },
  {
    id: "r3",
    userName: "Anonymous User",
    userImage: null,
    userEmail: "anon@example.com",
    rating: 2,
    title: "Disappointing service",
    date: "2024-12-08",
    comment:
      "The temple is beautiful but the service was disappointing. Long waiting times even with premium tickets. Staff was not helpful at all.",
    helpful: 5,
    status: "pending",
    ticketType: "General Entry",
    visitDate: "2024-12-07",
    reply: null,
  },
  {
    id: "r4",
    userName: "Lakshmi Devi",
    userImage: "/elderly-indian-woman-avatar.jpg",
    userEmail: "lakshmi@example.com",
    rating: 5,
    title: "Best experience ever",
    date: "2024-12-05",
    comment:
      "Have been visiting this temple for years. The online booking system makes it so convenient now. Highly recommend the special archanai service. The priests are very knowledgeable and perform the rituals with utmost devotion.",
    helpful: 31,
    status: "approved",
    ticketType: "Special Archanai",
    visitDate: "2024-12-04",
    reply: null,
  },
  {
    id: "r5",
    userName: "Spam Account",
    userImage: null,
    userEmail: "spam@test.com",
    rating: 1,
    title: "fake review test",
    date: "2024-12-03",
    comment: "This is a spam review with inappropriate content that should be rejected.",
    helpful: 0,
    status: "rejected",
    ticketType: null,
    visitDate: null,
    reply: null,
  },
]

export default function VendorReviewsPage() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState(mockReviews)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterRating, setFilterRating] = useState("all")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [replyingTo, setReplyingTo] = useState<(typeof mockReviews)[0] | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || review.status === filterStatus
    const matchesRating = filterRating === "all" || review.rating === Number.parseInt(filterRating)
    return matchesSearch && matchesStatus && matchesRating
  })

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.status === "approved").length,
    pending: reviews.filter((r) => r.status === "pending").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
    averageRating: (
      reviews.filter((r) => r.status === "approved").reduce((sum, r) => sum + r.rating, 0) /
      reviews.filter((r) => r.status === "approved").length
    ).toFixed(1),
  }

  const handleApprove = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "approved" } : r)))
    toast({ title: "Review approved", description: "The review is now visible to visitors." })
  }

  const handleReject = (id: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)))
    toast({ title: "Review rejected", description: "The review has been hidden from visitors." })
  }

  const handleReply = () => {
    if (replyingTo && replyText.trim()) {
      setReviews(reviews.map((r) => (r.id === replyingTo.id ? { ...r, reply: replyText } : r)))
      setIsReplyDialogOpen(false)
      setReplyingTo(null)
      setReplyText("")
      toast({ title: "Reply sent", description: "Your reply has been posted." })
    }
  }

  const openReplyDialog = (review: (typeof mockReviews)[0]) => {
    setReplyingTo(review)
    setReplyText(review.reply || "")
    setIsReplyDialogOpen(true)
  }

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`h-4 w-4 ${star <= rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
      ))}
    </div>
  )

  const getStatusBadge = (status: string) => {
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Reviews Management</h1>
          <p className="text-muted-foreground">Manage and respond to visitor reviews</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-3xl font-bold">
                <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
                {stats.averageRating}
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  {review.userImage ? (
                    <Image
                      src={review.userImage || "/placeholder.svg"}
                      alt={review.userName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      {review.userName[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{review.userName}</h4>
                        {getStatusBadge(review.status)}
                        {review.ticketType && <Badge variant="outline">{review.ticketType}</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(review.date), "MMM dd, yyyy")}
                        </span>
                        {review.visitDate && (
                          <span className="text-sm text-muted-foreground">
                            · Visited {format(new Date(review.visitDate), "MMM dd")}
                          </span>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(review.id)}>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {review.status === "approved" && (
                          <DropdownMenuItem onClick={() => handleReject(review.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Hide Review
                          </DropdownMenuItem>
                        )}
                        {review.status === "rejected" && (
                          <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Restore Review
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => openReplyDialog(review)}>
                          <Reply className="mr-2 h-4 w-4" />
                          {review.reply ? "Edit Reply" : "Reply"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {review.title && <h5 className="font-medium mt-2">{review.title}</h5>}
                  <p className="text-muted-foreground mt-1">{review.comment}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {review.helpful} found helpful
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => openReplyDialog(review)}>
                      <Reply className="h-4 w-4 mr-1" />
                      {review.reply ? "Edit Reply" : "Reply"}
                    </Button>
                  </div>
                  {review.reply && (
                    <div className="mt-4 pl-4 border-l-2 border-primary/20 bg-muted/30 rounded-r-lg p-3">
                      <p className="text-sm font-medium text-primary">Temple Response:</p>
                      <p className="text-sm text-muted-foreground mt-1">{review.reply}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
            <DialogDescription>Your response will be visible to all visitors</DialogDescription>
          </DialogHeader>
          {replyingTo && (
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{replyingTo.userName}</span>
                  {renderStars(replyingTo.rating)}
                </div>
                <p className="text-sm text-muted-foreground">{replyingTo.comment}</p>
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Write your response..."
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReply}>Post Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
