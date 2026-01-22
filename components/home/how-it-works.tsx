import { Search, Ticket, CreditCard, QrCode } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description: "Find temples by location, name, or type of service. Browse through our extensive directory.",
  },
  {
    icon: Ticket,
    title: "Choose Tickets",
    description: "Select from various ticket types - Pooja, Archanai, Darshan, Parking, and special events.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay securely via Stripe or choose manual payment options like bank transfer or COD.",
  },
  {
    icon: QrCode,
    title: "Get QR Ticket",
    description: "Receive your digital ticket with QR code via email. Simply scan at the temple entrance.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground">Book your temple tickets in 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <step.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
