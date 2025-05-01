'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/products/StarRating';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { ProductType } from '@/lib/types';

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product);
    
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to wishlist",
      description: `${product.title} has been added to your wishlist.`,
    });
  };

  return (
    <div 
      className="group relative rounded-lg border bg-card overflow-hidden hover:shadow-md transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-muted">
          <Image 
            src={product.image} 
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {product.isNew && (
            <Badge className="absolute top-2 left-2">New</Badge>
          )}
          {product.discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {product.discount}% OFF
            </Badge>
          )}
          
          <div 
            className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <Button 
              size="sm" 
              variant="secondary" 
              className="rounded-full h-10 w-10 p-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
            
            <Button 
              size="sm" 
              variant="secondary" 
              className="rounded-full h-10 w-10 p-0"
              onClick={handleWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            
            <Button
              size="sm" 
              variant="secondary" 
              className="rounded-full h-10 w-10 p-0"
              asChild
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Quick view</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold line-clamp-1 mb-1">
            {product.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
          
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold">
                ${product.price.toFixed(2)}
              </span>
              
              {product.originalPrice > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <span className="text-xs text-muted-foreground">
              {product.sales} sales
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}