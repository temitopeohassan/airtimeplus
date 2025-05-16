import { PRODUCTS } from '@/lib/data/products';
import { ProductDetails } from '@/components/products/ProductDetails';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find(p => p.id === params.id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}