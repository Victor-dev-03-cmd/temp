"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Wallet, ArrowUpRight, Download } from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    type: "CREDIT",
    description: "Order #ORD-001 - VIP Darshan",
    amount: 390,
    balance: 45390,
    date: "2024-12-28 10:30 AM",
  },
  {
    id: "TXN-002",
    type: "CREDIT",
    description: "Order #ORD-002 - Products",
    amount: 73.12,
    balance: 45000,
    date: "2024-12-28 09:15 AM",
  },
  {
    id: "TXN-003",
    type: "DEBIT",
    description: "Withdrawal Request #WD-001",
    amount: -5000,
    balance: 44926.88,
    status: "PENDING",
    date: "2024-12-27 04:00 PM",
  },
  {
    id: "TXN-004",
    type: "CREDIT",
    description: "Order #ORD-004 - Mixed Order",
    amount: 146.25,
    balance: 49926.88,
    date: "2024-12-27 04:20 PM",
  },
  {
    id: "TXN-005",
    type: "DEBIT",
    description: "Withdrawal Completed #WD-002",
    amount: -10000,
    balance: 49780.63,
    status: "COMPLETED",
    date: "2024-12-26 02:00 PM",
  },
]

const withdrawalHistory = [
  {
    id: "WD-001",
    amount: 5000,
    method: "Bank Transfer",
    status: "PENDING",
    requestedAt: "2024-12-27",
    processedAt: null,
  },
  {
    id: "WD-002",
    amount: 10000,
    method: "Bank Transfer",
    status: "COMPLETED",
    requestedAt: "2024-12-20",
    processedAt: "2024-12-22",
  },
  {
    id: "WD-003",
    amount: 8000,
    method: "Bank Transfer",
    status: "COMPLETED",
    requestedAt: "2024-12-10",
    processedAt: "2024-12-12",
  },
]

export default function VendorFinancePage() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const currentBalance = 45390
  const pendingWithdrawal = 5000
  const availableBalance = currentBalance - pendingWithdrawal

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "PENDING":
        return "secondary"
      case "REJECTED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Finance</h1>
          <p className="text-muted-foreground">Manage your earnings and withdrawals</p>
        </div>
        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
          <DialogTrigger asChild>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Request Withdrawal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Withdrawal</DialogTitle>
              <DialogDescription>Withdraw funds to your registered bank account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold">${availableBalance.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Withdrawal Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Minimum withdrawal: $100</p>
              </div>
              <div className="space-y-2">
                <Label>Withdrawal Method</Label>
                <Select defaultValue="bank">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer - ****1234</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsWithdrawOpen(false)}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentBalance.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Withdrawal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">${pendingWithdrawal.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${availableBalance.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8.2%</span> vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your earning and withdrawal history</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 5).map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{txn.description}</p>
                        <p className="text-xs text-muted-foreground">{txn.date}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${txn.type === "CREDIT" ? "text-green-600" : "text-red-600"}`}>
                        {txn.type === "CREDIT" ? "+" : ""}${txn.amount}
                      </span>
                      {"status" in txn && (
                        <Badge variant={getStatusColor(txn.status as string)} className="ml-2">
                          {txn.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>${txn.balance.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>Your past withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawalHistory.map((wd) => (
                  <TableRow key={wd.id}>
                    <TableCell className="font-mono text-sm">{wd.id}</TableCell>
                    <TableCell className="font-medium">${wd.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(wd.status)}>{wd.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{wd.requestedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
