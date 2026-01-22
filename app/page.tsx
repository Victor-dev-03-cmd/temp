import { MainLayout } from "@/components/layout/main-layout"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedTemples } from "@/components/home/featured-temples"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Testimonials } from "@/components/home/testimonials"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedTemples />
      <HowItWorks />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
    </MainLayout>
  )
}
