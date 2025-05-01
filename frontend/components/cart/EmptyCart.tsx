import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-3 py-16">
      <div className="rounded-full border-4 border-muted p-3">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-lg font-semibold">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>
      <Button asChild>
        <Link href="/products">Browse Products</Link>
      </Button>
    </div>
  );
}