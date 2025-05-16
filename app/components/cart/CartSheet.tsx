'use client';

import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetFooter,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { CartItem } from '@/components/cart/CartItem';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface CartSheetProps {
  children?: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, removeItem, updateItemQuantity, clearCart } = useCart();
  const itemCount = items.length;
  
  const cartTotal = items.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Open cart</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <div className="flex-1 overflow-auto">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => removeItem(item.id)}
                    onUpdateQuantity={(quantity) =>
                      updateItemQuantity(item.id, quantity)
                    }
                  />
                ))}
              </div>
              <div className="space-y-4">
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm font-medium">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fees</span>
                    <span className="text-sm font-medium">
                      {formatPrice(0)}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    *Taxes calculated at checkout
                  </div>
                </div>
                <SheetFooter className="flex flex-col gap-2">
                  <Button size="sm" onClick={clearCart} variant="outline">
                    Clear Cart
                  </Button>
                  <Button size="sm" className="w-full">
                    Checkout
                  </Button>
                </SheetFooter>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </SheetContent>
    </Sheet>
  );
}