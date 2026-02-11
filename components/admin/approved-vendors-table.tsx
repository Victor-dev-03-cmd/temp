"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function ApprovedVendorsTable({ vendors }: { vendors: any[] }) {
  if (vendors.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Approved Vendors</h2>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          No vendors have been approved yet.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Approved Vendors</h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Temple Name</TableHead>
              <TableHead>Owner Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approved At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.temple_name}</TableCell>
                <TableCell>{vendor.owner_name}</TableCell>
                <TableCell>{vendor.vendor_email}</TableCell>
                <TableCell>
                  <Badge variant="success">{vendor.status}</Badge>
                </TableCell>
                <TableCell>
                  {vendor.approved_at
                    ? format(new Date(vendor.approved_at), "PPp")
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
