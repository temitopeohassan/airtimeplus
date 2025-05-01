import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/products/StarRating';
import { PRODUCTS } from '@/lib/data/products';

export function PopularProducts() {
  // Filter to show top-rated products (max 3)
  const topRatedProducts = [...PRODUCTS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Top Rated
          </h2>
          <p className="text-muted-foreground">
            The highest rated products loved by our customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {topRatedProducts.map((product, index) => (
            <div 
              key={product.id}
              className="relative overflow-hidden rounded-lg border bg-card hover:shadow-md transition-all"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[16/9] bg-muted">
                  <Image 
                    src={product.image} 
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary">
                      #1 Top Rated
                    </Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <h3 className="font-semibold line-clamp-1 mb-1">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.sales} sales
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/products">Explore all products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}