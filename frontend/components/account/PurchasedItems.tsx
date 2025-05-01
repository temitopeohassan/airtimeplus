import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/products/StarRating';
import { Download, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';

export function PurchasedItems() {
  // For demo, let's pretend the user purchased some of the products
  const purchasedProducts = PRODUCTS.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Purchased Products</h2>
        
        {purchasedProducts.length > 0 ? (
          <div className="space-y-4">
            {purchasedProducts.map((product) => (
              <div 
                key={product.id}
                className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg"
              >
                <div className="relative w-full md:w-32 h-32 flex-shrink-0">
                  <Image 
                    src={product.image} 
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, 128px"
                  />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Purchased on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      Active
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-col xs:flex-row gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating rating={product.rating} />
                      
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Write a review
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/products/${product.id}`}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <p className="text-muted-foreground">You haven't purchased any products yet.</p>
            <Button asChild>
              <Link href="/products">Browse products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}