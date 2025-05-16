import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HERO_DATA } from '@/lib/data/hero';

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-chart-1/10 to-chart-2/10 dark:from-chart-1/5 dark:to-chart-3/5" />
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 max-w-7xl relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {HERO_DATA.title}
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            {HERO_DATA.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/categories">
                Shop Now
              </Link>
            </Button>
         
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {HERO_DATA.stats.map((stat, index) => (
              <div key={index} className="p-4 bg-background/50 backdrop-blur-sm rounded-lg border">
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}