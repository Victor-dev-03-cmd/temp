"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, CheckCircle2, XCircle, Camera, Search, Users, Clock, AlertTriangle } from "lucide-react"

interface ScanResult {
  valid: boolean
  ticket?: {
    id: string
    ticketNumber: string
    ticketType: string
    templeName: string
    visitorName: string
    visitDate: string
    visitTime: string
    persons: number
    status: string
    usedAt?: string
  }
  error?: string
}

export default function VendorScanPage() {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("manual")
  const [manualCode, setManualCode] = useState("")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [recentScans, setRecentScans] = useState<ScanResult[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleManualScan = async () => {
    if (!manualCode.trim()) return

    setIsScanning(true)

    // Simulate API call to validate ticket
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation result
    const isValid = manualCode.startsWith("TKT-")

    const result: ScanResult = isValid
      ? {
          valid: true,
          ticket: {
            id: "1",
            ticketNumber: manualCode,
            ticketType: "VIP Darshan",
            templeName: "Sri Venkateswara Temple",
            visitorName: "Ramesh Kumar",
            visitDate: "2024-12-28",
            visitTime: "09:00 AM - 10:00 AM",
            persons: 2,
            status: "VALID",
          },
        }
      : {
          valid: false,
          error: "Invalid ticket code or ticket already used",
        }

    setScanResult(result)
    setRecentScans((prev) => [result, ...prev].slice(0, 10))
    setIsScanning(false)
    setManualCode("")
  }

  const handleMarkUsed = async () => {
    if (!scanResult?.ticket) return

    // Simulate marking ticket as used
    await new Promise((resolve) => setTimeout(resolve, 500))

    setScanResult({
      ...scanResult,
      ticket: {
        ...scanResult.ticket,
        status: "USED",
        usedAt: new Date().toISOString(),
      },
    })
  }

  const todayStats = {
    totalScanned: 156,
    valid: 148,
    invalid: 8,
    pending: 44,
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Ticket Scanner</h1>
          <p className="text-muted-foreground">Scan and validate visitor tickets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scanned</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.totalScanned}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid Entries</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{todayStats.valid}</div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invalid/Used</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{todayStats.invalid}</div>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Today</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{todayStats.pending}</div>
            <p className="text-xs text-muted-foreground">Expected visitors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scan Ticket</CardTitle>
            <CardDescription>Use camera or enter ticket code manually</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={scanMode} onValueChange={(v) => setScanMode(v as "camera" | "manual")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="camera">
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </TabsTrigger>
                <TabsTrigger value="manual">
                  <Search className="h-4 w-4 mr-2" />
                  Manual
                </TabsTrigger>
              </TabsList>

              <TabsContent value="camera" className="mt-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Camera scanner</p>
                    <p className="text-xs text-muted-foreground">Position QR code within frame</p>
                    <Button className="mt-4">Start Camera</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="mt-4">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter ticket code (e.g., TKT-ABC123)"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleManualScan()}
                    />
                    <Button onClick={handleManualScan} disabled={isScanning}>
                      {isScanning ? "Scanning..." : "Validate"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter the ticket code printed on the visitor&apos;s ticket or shown on their mobile device.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scan Result</CardTitle>
            <CardDescription>Ticket validation details</CardDescription>
          </CardHeader>
          <CardContent>
            {!scanResult ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Scan a ticket to see details</p>
                </div>
              </div>
            ) : scanResult.valid && scanResult.ticket ? (
              <div className="space-y-4">
                <Alert variant={scanResult.ticket.status === "VALID" ? "default" : "destructive"}>
                  {scanResult.ticket.status === "VALID" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {scanResult.ticket.status === "VALID" ? "Valid Ticket" : "Ticket Already Used"}
                  </AlertTitle>
                  <AlertDescription>
                    {scanResult.ticket.status === "VALID"
                      ? "This ticket is valid and can be used for entry."
                      : `Used at ${new Date(scanResult.ticket.usedAt!).toLocaleString()}`}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Ticket Number</p>
                    <p className="font-mono font-medium">{scanResult.ticket.ticketNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <Badge>{scanResult.ticket.ticketType}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Temple</p>
                    <p className="font-medium">{scanResult.ticket.templeName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Visitor</p>
                    <p className="font-medium">{scanResult.ticket.visitorName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Visit Date</p>
                    <p className="font-medium">{scanResult.ticket.visitDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time Slot</p>
                    <p className="font-medium">{scanResult.ticket.visitTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Number of Persons</p>
                    <p className="font-medium flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {scanResult.ticket.persons}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant={scanResult.ticket.status === "VALID" ? "default" : "secondary"}>
                      {scanResult.ticket.status}
                    </Badge>
                  </div>
                </div>

                {scanResult.ticket.status === "VALID" && (
                  <Button className="w-full" onClick={handleMarkUsed}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Used & Allow Entry
                  </Button>
                )}
              </div>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Invalid Ticket</AlertTitle>
                <AlertDescription>{scanResult.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Last 10 scanned tickets</CardDescription>
        </CardHeader>
        <CardContent>
          {recentScans.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No recent scans</p>
          ) : (
            <div className="space-y-2">
              {recentScans.map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {scan.valid ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-mono text-sm">{scan.ticket?.ticketNumber || "Invalid Code"}</p>
                      <p className="text-xs text-muted-foreground">{scan.ticket?.visitorName || scan.error}</p>
                    </div>
                  </div>
                  <Badge variant={scan.valid ? "default" : "destructive"}>
                    {scan.valid ? scan.ticket?.status : "INVALID"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
