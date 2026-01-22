import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Chennai, India",
    avatar: "/indian-woman-portrait.png",
    rating: 5,
    text: "Booking temple tickets has never been easier! I booked Archanai for my parents from abroad, and the QR code system worked perfectly.",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Kuala Lumpur, Malaysia",
    avatar: "/indian-man-portrait.png",
    rating: 5,
    text: "The platform made it so convenient to order authentic temple products. Got blessed items delivered right to my doorstep!",
  },
  {
    id: 3,
    name: "Lakshmi Devi",
    location: "London, UK",
    avatar: "/indian-elderly-woman-portrait.jpg",
    rating: 5,
    text: "Living abroad, I can now participate in temple poojas virtually. The booking system is simple and reliable.",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-muted-foreground">Trusted by thousands of devotees worldwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
