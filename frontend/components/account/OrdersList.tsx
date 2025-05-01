import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ORDERS } from '@/lib/data/orders';

interface OrdersListProps {
  searchQuery: string;
  filterStatus: string;
}

export function OrdersList({ searchQuery, filterStatus }: OrdersListProps) {
  // Filter orders based on search query and status filter
  const filteredOrders = ORDERS.filter(order => {
    return (
      (searchQuery === '' || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      ) &&
      (filterStatus === 'all' || order.status === filterStatus)
    );
  });

  return (
    <div className="space-y-6">
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order.id} className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 bg-muted/30 flex flex-col sm:flex-row justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <Badge
                    variant={
                      order.status === 'completed' ? 'default' :
                      order.status === 'processing' ? 'secondary' :
                      order.status === 'refunded' ? 'destructive' : 'outline'
                    }
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Placed on {order.date} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/account/orders/${order.id}`}>
                    View Details
                  </Link>
                </Button>
                {order.status === 'completed' && (
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download All
                  </Button>
                )}
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                      sizes="64px"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.license} License
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    {order.status === 'completed' && (
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t bg-muted/30 flex flex-col sm:flex-row justify-between">
              <div className="text-sm text-muted-foreground">
                Payment Method: {order.paymentMethod}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Subtotal: ${order.subtotal.toFixed(2)}
                </span>
                <span className="font-medium">
                  Total: ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? `No orders match your search for "${searchQuery}"`
              : 'You have no orders yet'}
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}