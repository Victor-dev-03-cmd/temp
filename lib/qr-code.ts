import QRCode from "qrcode"

export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
    return qrCodeDataUrl
  } catch (error) {
    console.error("QR Code generation error:", error)
    throw new Error("Failed to generate QR code")
  }
}

export async function generateTicketQRCode(bookingNumber: string): Promise<string> {
  const qrData = JSON.stringify({
    type: "TICKET",
    bookingNumber,
    timestamp: Date.now(),
  })
  return generateQRCode(qrData)
}
