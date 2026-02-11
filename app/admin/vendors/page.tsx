import { MainLayout } from "@/components/layout/main-layout";
import { VendorRequestsTable } from "@/components/admin/vendor-requests-table";
import { ApprovedVendorsTable } from "@/components/admin/approved-vendors-table";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Vendor Management - Temple Platform",
};

// --- THIS IS THE FIX: A single, robust function to get ALL requests ---
async function getAllVendorRequests() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vendor_requests")
    .select(`id, temple_name, owner_name, vendor_email, status, created_at, approved_at`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all vendor requests:", error);
    return [];
  }
  return data;
}

export default async function VendorManagementPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") {
    return redirect("/");
  }

  // 1. Fetch ALL requests once.
  const allRequests = await getAllVendorRequests();

  // 2. Filter the array in JavaScript. This is more reliable.
  const pendingRequests = allRequests.filter(req => req.status === 'PENDING');
  const approvedVendors = allRequests.filter(req => req.status === 'APPROVED');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Vendor Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedVendors.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Users className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{pendingRequests.length}</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedVendors.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-12">
          <VendorRequestsTable requests={pendingRequests} />
          <ApprovedVendorsTable vendors={approvedVendors} />
        </div>
      </div>
    </MainLayout>
  );
}
