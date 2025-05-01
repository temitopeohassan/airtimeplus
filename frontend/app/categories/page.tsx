'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
        <h1 className="text-3xl font-bold tracking-tight">Browse Categories</h1>
        <p className="text-muted-foreground max-w-3xl">
          Explore our wide range of digital products across various categories.
          From design templates to software tools, find everything you need.
        </p>
      </div>
      
      <div className="flex items-center space-x-2 mb-8">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" onClick={() => setSearchQuery('')} className="h-10">
          Clear
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
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
        </TabsContent>
        
        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CATEGORIES.filter(cat => cat.isPopular).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {CATEGORIES.filter(cat => cat.isNew).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}