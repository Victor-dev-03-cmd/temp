"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, CreditCard } from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    type: "SALE",
    description: "Order #ORD-001 - VIP Darshan",
    amount: 400,
    fee: 10,
    net: 390,
    vendor: "Temple Trust Board",
    status: "COMPLETED",
    date: "2024-12-28 10:30 AM",
  },
  {
    id: "TXN-002",
    type: "SALE",
    description: "Order #ORD-002 - Products",
    amount: 75,
    fee: 1.88,
    net: 73.12,
    vendor: "HR&CE Department",
    status: "COMPLETED",
    date: "2024-12-28 09:15 AM",
  },
  {
    id: "TXN-003",
    type: "WITHDRAWAL",
    description: "Vendor Payout Request",
    amount: -5000,
    fee: 0,
    net: -5000,
    vendor: "Temple Trust Board",
    status: "PENDING",
    date: "2024-12-27 04:00 PM",
  },
  {
    id: "TXN-004",
    type: "REFUND",
    description: "Order #ORD-005 Refund",
    amount: -85,
    fee: 0,
    net: -85,
    vendor: "HR&CE Department",
    status: "COMPLETED",
    date: "2024-12-27 02:30 PM",
  },
  {
    id: "TXN-005",
    type: "SALE",
    description: "Order #ORD-004 - Mixed Order",
    amount: 150,
    fee: 3.75,
    net: 146.25,
    vendor: "Temple Trust Board",
    status: "COMPLETED",
    date: "2024-12-27 04:20 PM",
  },
]

const withdrawalRequests = [
  {
    id: "WD-001",
    vendor: "Temple Trust Board",
    amount: 5000,
    method: "Bank Transfer",
    status: "PENDING",
    requestedAt: "2024-12-27",
    bankName: "State Bank of India",
    accountNumber: "****1234",
  },
  {
    id: "WD-002",
    vendor: "HR&CE Department",
    amount: 10000,
    method: "Bank Transfer",
    status: "APPROVED",
    requestedAt: "2024-12-26",
    bankName: "HDFC Bank",
    accountNumber: "****5678",
  },
  {
    id: "WD-003",
    vendor: "Jagannath Temple Administration",
    amount: 3000,
    method: "Bank Transfer",
    status: "COMPLETED",
    requestedAt: "2024-12-25",
    bankName: "ICICI Bank",
    accountNumber: "****9012",
  },
]

export default function AdminFinancePage() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "SALE":
        return "default"
      case "REFUND":
        return "destructive"
      case "WITHDRAWAL":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "PENDING":
        return "secondary"
      case "APPROVED":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Finance Dashboard</h1>
          <p className="text-muted-foreground">Monitor revenue, transactions, and payouts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$527,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$13,175</div>
            <p className="text-xs text-muted-foreground">2.5% of transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Wallet className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">$18,000</div>
            <p className="text-xs text-muted-foreground">3 requests pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$2,340</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowDownRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawal Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>All platform financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Net</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                      <TableCell>
                        <Badge variant={getTypeColor(txn.type)}>{txn.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{txn.description}</TableCell>
                      <TableCell>{txn.vendor}</TableCell>
                      <TableCell className={txn.amount < 0 ? "text-red-600" : "text-green-600"}>
                        {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount)}
                      </TableCell>
                      <TableCell>${txn.fee}</TableCell>
                      <TableCell className={txn.net < 0 ? "text-red-600" : ""}>${txn.net.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(txn.status)}>{txn.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Requests</CardTitle>
              <CardDescription>Vendor payout requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Bank Details</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawalRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-mono text-sm">{req.id}</TableCell>
                      <TableCell className="font-medium">{req.vendor}</TableCell>
                      <TableCell>${req.amount.toLocaleString()}</TableCell>
                      <TableCell>{req.method}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{req.bankName}</p>
                          <p className="text-xs text-muted-foreground">{req.accountNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>{req.requestedAt}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(req.status)}>{req.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {req.status === "PENDING" && (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Reject
                            </Button>
                            <Button size="sm">Approve</Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
