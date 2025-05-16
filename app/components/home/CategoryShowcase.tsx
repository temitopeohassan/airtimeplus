import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data/categories';

export function CategoryShowcase() {
  // Show only the featured categories (max 6)
  const featuredCategories = CATEGORIES.filter(cat => cat.featured).slice(0, 6);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Categories
            </h2>
          </div>
          <Button variant="link" size="sm" className="group hidden md:flex" asChild>
            <Link href="/categories" className="flex items-center">
              View all categories
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <Link 
              key={category.id}
              href={`/${category.id}`} 
              className="group rounded-lg overflow-hidden border bg-card hover:shadow-md transition-all"
            >
              <div className="relative aspect-[16/9] bg-muted">
                <Image 
                  src={category.image} 
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link href="/categories">View all categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}