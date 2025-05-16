import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { PopularProducts } from '@/components/home/PopularProducts';
import { Newsletter } from '@/components/home/Newsletter';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryShowcase />
      <Newsletter />
    </div>
  );
}