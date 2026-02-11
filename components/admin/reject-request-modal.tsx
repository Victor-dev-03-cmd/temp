"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface RejectRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requestId: string | null
  onRejectSuccess: () => void
}

export function RejectRequestModal({
  open,
  onOpenChange,
  requestId,
  onRejectSuccess,
}: RejectRequestModalProps) {
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleReject = async () => {
    if (!reason) {
      setError("Please provide a reason for rejection.")
      return
    }
    if (!requestId) return

    setLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/admin/vendor-requests/${requestId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to reject request.")
      }

      onRejectSuccess()
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset state when modal is closed
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setReason("")
      setError("")
      setLoading(false)
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Vendor Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this request. This will be visible to the user.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <Label htmlFor="reason">Rejection Reason</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Incomplete temple address, invalid contact details, etc."
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleReject} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Rejection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
