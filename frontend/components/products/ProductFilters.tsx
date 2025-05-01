'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/products/StarRating';
import { CATEGORIES } from '@/lib/data/categories';
import { Separator } from '@/components/ui/separator';

interface ProductFiltersProps {
  activeFilters: {
    category: string;
    priceRange: number[];
    rating: number;
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    category: string;
    priceRange: number[];
    rating: number;
  }>>;
}

export function ProductFilters({ activeFilters, setActiveFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState(activeFilters.priceRange);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveFilters(prev => ({ ...prev, category: categoryId }));
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setActiveFilters(prev => ({ ...prev, priceRange: values }));
  };
  
  const handleRatingChange = (rating: number) => {
    setActiveFilters(prev => ({ ...prev, rating }));
  };
  
  const resetFilters = () => {
    setActiveFilters({
      category: 'all',
      priceRange: [0, 500],
      rating: 0,
    });
    setPriceRange([0, 500]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <RadioGroup 
          value={activeFilters.category} 
          onValueChange={handleCategoryChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="category-all" />
            <Label htmlFor="category-all">All Categories</Label>
          </div>
          
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem value={category.id} id={`category-${category.id}`} />
              <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <Separator />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Price Range</h3>
          <span className="text-sm">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        
        <Slider
          defaultValue={priceRange}
          min={0}
          max={500}
          step={10}
          onValueChange={handlePriceChange}
        />
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox 
                id={`rating-${rating}`} 
                checked={activeFilters.rating === rating + 1} 
                onCheckedChange={() => handleRatingChange(rating + 1)}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                <StarRating rating={rating + 1} />
                <span className="ml-1">& up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-semibold mb-4">Product Type</h3>
        <div className="space-y-2">
          {['Templates', 'Graphics', 'Fonts', 'Add-ons', 'Scripts'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type.toLowerCase()}`} />
              <Label htmlFor={`type-${type.toLowerCase()}`}>{type}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}