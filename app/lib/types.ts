export interface CategoryType {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  featured: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface ProductType {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  sales: number;
  featured: boolean;
  isNew: boolean;
  license: string;
  createdAt: string;
  updatedAt: string;
  quantity?: number;
}

export interface OrderType {
  id: string;
  date: string;
  status: 'processing' | 'completed' | 'refunded';
  items: {
    title: string;
    price: number;
    image: string;
    license: string;
  }[];
  subtotal: number;
  total: number;
  paymentMethod: string;
}