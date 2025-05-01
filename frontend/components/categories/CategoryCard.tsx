import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CategoryType } from '@/lib/types';

interface CategoryCardProps {
  category: CategoryType;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/products?category=${category.id}`}
      className="group block rounded-lg border bg-card overflow-hidden hover:shadow-md transition-all"
    >
      <div className="relative aspect-[4/3] bg-muted">
        <Image 
          src={category.image} 
          alt={category.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {category.isNew && (
          <Badge className="absolute top-2 left-2">New</Badge>
        )}
      </div>
      
      <div className="p-4 relative">
        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {category.itemCount} items
          </span>
        </div>
      </div>
    </Link>
  );
}