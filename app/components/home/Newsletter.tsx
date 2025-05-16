import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to get notified about new products, exclusive offers, and updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
}