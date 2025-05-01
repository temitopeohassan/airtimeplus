import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { ProductType } from '@/lib/types';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: ProductType & { quantity?: number };
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const quantity = item.quantity || 1;
  const price = item.price * quantity;

  return (
    <div className="flex items-start gap-4 py-4">
      <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded-lg border bg-muted">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <Link
            href={`/products/${item.id}`}
            className="line-clamp-1 text-sm font-medium hover:underline"
          >
            {item.title}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{item.license} License</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => quantity > 1 && onUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <span className="sr-only">Decrease quantity</span>
              <span>-</span>
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value > 0) {
                  onUpdateQuantity(value);
                }
              }}
              className="h-7 w-12 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(quantity + 1)}
            >
              <span className="sr-only">Increase quantity</span>
              <span>+</span>
            </Button>
          </div>
          <div className="flex items-baseline gap-1 text-sm">
            <span className="font-medium">{formatPrice(price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}