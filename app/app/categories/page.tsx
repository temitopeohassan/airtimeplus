'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { CATEGORIES } from '@/lib/data/categories';
import { SearchIcon } from 'lucide-react';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCategories = CATEGORIES.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
      </div>    
      
      {searchQuery && (
        <div className="mb-6">
          <Badge variant="outline" className="text-sm py-1.5">
            {filteredCategories.length} results for &quot;{searchQuery}&quot;
          </Badge>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No categories found</h3>
          <p className="text-muted-foreground mt-1">
            Try a different search term
          </p>
        </div>
      )}
    </div>
  );
}