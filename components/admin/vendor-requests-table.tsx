"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RejectRequestModal } from "./reject-request-modal";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

export function VendorRequestsTable({ requests }: { requests: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const handleApprove = async (requestId: string) => {
    setLoading(requestId);
    try {
      const res = await fetch(`/api/admin/vendor-requests/${requestId}/approve`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to approve request.");
      router.refresh(); // <-- THIS IS THE FIX
    } catch (error) {
      console.error(error);
      alert("Approval failed.");
    } finally {
      setLoading(null);
    }
  };

  const openRejectModal = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsRejectModalOpen(true);
  };

  if (requests.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Pending Vendor Requests</h2>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          There are no pending vendor requests at the moment.
        </div>
      </div>
    );
  }

  return (
    <>
      <RejectRequestModal
        open={isRejectModalOpen}
        onOpenChange={setIsRejectModalOpen}
        requestId={selectedRequestId}
        onRejectSuccess={() => router.refresh()} // <-- THIS IS THE FIX
      />
      <div>
        <h2 className="text-xl font-semibold mb-4">Pending Vendor Requests</h2>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Temple Name</TableHead>
                <TableHead>Owner Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.temple_name}</TableCell>
                  <TableCell>{req.owner_name}</TableCell>
                  <TableCell>{req.vendor_email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{req.status}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(req.created_at), "PPp")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleApprove(req.id)}
                          disabled={loading === req.id}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {loading === req.id ? "Approving..." : "Approve"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => openRejectModal(req.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
