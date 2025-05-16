'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data/products';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarRating } from '@/components/products/StarRating';
import { ProductCard } from '@/components/products/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { ProductType } from '@/lib/types';
import { 
  Heart, 
  ShoppingCart, 
  Check, 
  Clock, 
  Award, 
  Download, 
  ChevronLeft 
} from 'lucide-react';

interface ProductDetailsProps {
  product: ProductType;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Related products (same category)
  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };
  
  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast({
      title: isWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.title} has been ${isWishlist ? "removed from" : "added to"} your wishlist.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Button 
        variant="ghost" 
        className="mb-6 group" 
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
            <Image 
              src={product.image} 
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-muted cursor-pointer border hover:border-primary">
                <Image 
                  src={product.image} 
                  alt={`${product.title} preview ${i+1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{product.category}</Badge>
              {product.isNew && <Badge variant="secondary">New</Badge>}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">
                {product.reviews} reviews
              </span>
            </div>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="space-y-4 mb-8">
            <p className="text-muted-foreground">{product.description}</p>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Instant digital delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Last updated {product.updatedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span>{product.license} license</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row mb-8">
            <Button 
              size="lg" 
              className="sm:flex-1 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="sm:flex-1 gap-2"
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 ${isWishlist ? 'fill-current text-red-500' : ''}`} />
              {isWishlist ? 'Saved' : 'Save for Later'}
            </Button>
          </div>
          
          <Separator className="my-8" />
          
          <div>
            <h3 className="font-medium mb-4">License Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Personal Use</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Use in a single personal project</li>
                  <li>Non-commercial use only</li>
                  <li>Cannot be redistributed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Commercial License</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Use in unlimited commercial projects</li>
                  <li>Priority support</li>
                  <li>1 year of updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <p className="text-muted-foreground mb-4">
              {product.description}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>High quality resolution files</li>
              <li>Compatible with all major software</li>
              <li>Fully customizable elements</li>
              <li>Organized layers and folders</li>
              <li>Comprehensive documentation included</li>
            </ul>
            <h4 className="font-medium mb-2">Requirements</h4>
            <p className="text-sm text-muted-foreground">
              Specific software requirements depending on the file type. Please check compatibility before purchase.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            
            <div className="grid gap-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Customer Name</h4>
                      <StarRating rating={5 - i} />
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This product exceeded my expectations. The quality is excellent and it saved me so much time on my project.
                    I would definitely recommend it to anyone looking for a professional solution.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {[
                {
                  q: "How will I receive my files after purchase?",
                  a: "After completing your purchase, you will receive an email with download instructions. You can also access your purchases from your account page."
                },
                {
                  q: "Can I use this product for commercial projects?",
                  a: "Yes, with the commercial license. The personal license is restricted to non-commercial use only."
                },
                {
                  q: "Do you offer refunds?",
                  a: "Due to the digital nature of our products, we generally do not offer refunds. Please contact our support team if you have issues with your purchase."
                },
                {
                  q: "How long will I have access to the product?",
                  a: "You will have lifetime access to the product version you purchase, including any updates during your license period."
                }
              ].map((item, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{item.q}</h4>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Related Products</h2>
          <Button variant="outline" asChild>
            <Link href={`/products?category=${product.category}`}>
              View All
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
} 