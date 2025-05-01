import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, i) => {
        const ratingValue = i + 1;
        const filled = ratingValue <= rating;
        const halfFilled = ratingValue - 0.5 <= rating && rating < ratingValue;
        
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled 
                ? 'fill-yellow-400 text-yellow-400' 
                : halfFilled 
                ? 'fill-yellow-400/50 text-yellow-400' 
                : 'text-muted-foreground'
            }`}
          />
        );
      })}
    </div>
  );
}