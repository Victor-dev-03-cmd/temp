import { MainLayout } from "@/components/layout/main-layout"
import { TempleDetailClient } from "@/components/temples/temple-detail-client"
import { notFound } from "next/navigation"

const temples = [
  {
    id: "1",
    name: "Sri Ranganathaswamy Temple",
    slug: "sri-ranganathaswamy-temple",
    description:
      "One of the most illustrious Vaishnava temples in South India, located on an island between the two arms of the river Cauvery. The temple is dedicated to Lord Ranganatha, a reclining form of Lord Vishnu.",
    longDescription: `Sri Ranganathaswamy Temple is the largest functioning Hindu temple in the world, covering an area of 156 acres with a perimeter of 4,116m (over 10,710 feet). It is one of the most illustrious Vaishnava temples in South India.

The temple has 7 enclosures (known as prakarams), 21 towers (gopurams), and is often listed as one of the largest temple complexes in India. The temple is dedicated to Lord Ranganatha, a reclining form of Lord Vishnu.

The temple has immense significance in the tradition of Vaishnavism and is considered to be the foremost among the 108 Divya Desams of Lord Vishnu.`,
    location: "Srirangam, Tamil Nadu, India",
    address: "Srirangam, Tiruchirappalli, Tamil Nadu 620006, India",
    image: "/sri-ranganathaswamy-temple-gopuram.jpg",
    gallery: [
      "/temple-corridor-pillars.jpg",
      "/temple-deity-sanctum.jpg",
      "/temple-gopuram-tower.jpg",
      "/temple-tank-water.jpg",
    ],
    rating: 4.9,
    reviews: 1250,
    ticketCount: 8,
    productCount: 24,
    featured: true,
    timings: {
      weekday: "6:00 AM - 9:00 PM",
      weekend: "6:00 AM - 9:00 PM",
      special: "5:00 AM - 10:00 PM (Festival days)",
    },
    contact: {
      phone: "+91 431 243 0257",
      email: "info@srirangam.org",
      website: "https://srirangam.org",
    },
    amenities: ["Parking", "Wheelchair Access", "Shoe Storage", "Prasadam Counter", "Rest Rooms", "Drinking Water"],
  },
  {
    id: "2",
    name: "Nallur Kandaswamy Temple",
    slug: "nallur-kandaswamy-temple",
    description:
      "One of the most significant Hindu temples in Sri Lanka, dedicated to Lord Murugan. Known for its annual festival that attracts thousands of devotees from around the world.",
    longDescription: `Nallur Kandaswamy Temple is one of the most significant Hindu temples in the Jaffna District of Sri Lanka. The temple is dedicated to Lord Murugan (Kandaswamy), the Hindu god of war.

The temple is renowned for its 25-day annual festival held in August, which attracts thousands of devotees from Sri Lanka and abroad. The festival features elaborate rituals, processions with decorated chariots, and traditional music and dance performances.

The current temple structure dates back to the 18th century, though a temple has existed at this site for much longer. The architecture showcases beautiful Dravidian style with intricate carvings and a majestic gopuram.`,
    location: "Jaffna, Sri Lanka",
    address: "Nallur, Jaffna, Northern Province, Sri Lanka",
    image: "/nallur-kandaswamy-hindu-temple-jaffna.jpg",
    gallery: [
      "/hindu-temple-gopuram-tower.jpg",
      "/temple-festival-chariot-procession.jpg",
      "/temple-deity-murugan-statue.jpg",
      "/temple-devotees-praying.jpg",
    ],
    rating: 4.8,
    reviews: 890,
    ticketCount: 6,
    productCount: 18,
    featured: true,
    timings: {
      weekday: "5:30 AM - 12:00 PM, 4:00 PM - 8:00 PM",
      weekend: "5:30 AM - 12:00 PM, 4:00 PM - 9:00 PM",
      special: "4:00 AM - 10:00 PM (Festival days)",
    },
    contact: {
      phone: "+94 21 222 2345",
      email: "info@nallurtemple.org",
      website: "https://nallurtemple.org",
    },
    amenities: ["Parking", "Shoe Storage", "Prasadam Counter", "Rest Rooms", "Drinking Water", "Meditation Hall"],
  },
  {
    id: "3",
    name: "Meenakshi Amman Temple",
    slug: "meenakshi-amman-temple",
    description:
      "A historic Hindu temple located in Madurai, Tamil Nadu. Dedicated to Goddess Meenakshi and Lord Sundareshwar, it is a significant symbol of Tamil culture.",
    longDescription: `Meenakshi Amman Temple is a historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu. It is dedicated to Meenakshi, a form of Parvati, and her consort Sundareshwar, a form of Shiva.

The temple complex houses 14 gateway towers called gopurams, ranging from 45-50m in height. The tallest is the southern tower, rising to 51.9 meters. There are an estimated 33,000 sculptures within the temple complex.

The temple attracts 15,000 visitors daily, approximately 25,000 on Fridays, and is one of the most visited tourist destinations in India.`,
    location: "Madurai, Tamil Nadu, India",
    address: "Madurai Main, Madurai, Tamil Nadu 625001, India",
    image: "/meenakshi-amman-temple-madurai-colorful-gopuram.jpg",
    gallery: [
      "/meenakshi-temple-hall-of-thousand-pillars.jpg",
      "/temple-golden-lotus-tank.jpg",
      "/temple-sculpture-carvings.jpg",
      "/temple-night-illumination.jpg",
    ],
    rating: 4.9,
    reviews: 2150,
    ticketCount: 10,
    productCount: 32,
    featured: true,
    timings: {
      weekday: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
      weekend: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
      special: "4:00 AM - 11:00 PM (Festival days)",
    },
    contact: {
      phone: "+91 452 234 4360",
      email: "info@meenakshitemple.org",
      website: "https://maduraimeenakshi.hrfrce.org",
    },
    amenities: [
      "Parking",
      "Wheelchair Access",
      "Shoe Storage",
      "Prasadam Counter",
      "Rest Rooms",
      "Drinking Water",
      "Guide Services",
    ],
  },
  {
    id: "4",
    name: "Tirumala Venkateswara Temple",
    slug: "tirumala-venkateswara-temple",
    description:
      "One of the most visited and richest temples in the world, located in Tirumala hills. Dedicated to Lord Venkateswara, a form of Lord Vishnu.",
    longDescription: `Tirumala Venkateswara Temple is a Hindu temple situated in the hill town of Tirumala at Tirupati in Chittoor district of Andhra Pradesh, India. The temple is dedicated to Lord Venkateswara, a form of Vishnu.

The temple is the richest and most visited place of worship in the world. The temple is visited by about 50,000 to 100,000 pilgrims daily, while on special occasions and festivals, the number of pilgrims shoots up to 500,000.

The temple has been mentioned in many ancient texts and is considered one of the holiest Hindu shrines. The main deity is also known as Balaji, Govinda and Srinivasa.`,
    location: "Tirupati, Andhra Pradesh, India",
    address: "Tirumala, Tirupati, Andhra Pradesh 517504, India",
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.9,
    reviews: 5420,
    ticketCount: 12,
    productCount: 45,
    featured: true,
    timings: {
      weekday: "2:30 AM - 1:30 AM (next day)",
      weekend: "2:30 AM - 1:30 AM (next day)",
      special: "Open 24 hours (Major festivals)",
    },
    contact: {
      phone: "+91 877 227 7777",
      email: "info@tirumala.org",
      website: "https://tirumala.org",
    },
    amenities: [
      "Parking",
      "Wheelchair Access",
      "Shoe Storage",
      "Prasadam Counter",
      "Rest Rooms",
      "Drinking Water",
      "Accommodation",
      "Free Meals",
    ],
  },
]

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const temple = temples.find((t) => t.slug === slug)

  if (!temple) {
    return {
      title: "Temple Not Found",
    }
  }

  return {
    title: `${temple.name} - Temple Platform`,
    description: temple.description,
  }
}

export default async function TempleDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const temple = temples.find((t) => t.slug === slug)

  if (!temple) {
    notFound()
  }

  return (
    <MainLayout>
      <TempleDetailClient temple={temple} />
    </MainLayout>
  )
}
