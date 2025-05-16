'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductSortProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

export function ProductSort({ sortOption, setSortOption }: ProductSortProps) {
  return (
    <Select value={sortOption} onValueChange={setSortOption}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
      </SelectContent>
    </Select>
  );
}