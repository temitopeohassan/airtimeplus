import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS } from '@/lib/data/products';

export function FeaturedProducts() {
  // Filter to only show featured products (max 4)
  const featuredProducts = PRODUCTS.filter(product => product.featured).slice(0, 4);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Hand-picked premium digital goods for your next project
            </p>
          </div>
          <Button variant="link" size="sm" className="group hidden md:flex" asChild>
            <Link href="/products" className="flex items-center">
              View all products
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button asChild>
            <Link href="/products">View all products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}