'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  LogIn, 
  Package, 
  Heart, 
  GanttChart 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/data/categories';
import { CartSheet } from '@/components/cart/CartSheet';
import { useCart } from '@/hooks/use-cart';

// Fake auth state for demo purposes - in a real app use an auth library
const isAuthenticated = false;

export function Navbar() {
  const pathname = usePathname();
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-200',
      isScrolled ? 'bg-background/95 backdrop-blur-md border-b' : 'bg-transparent'
    )}>
      <nav className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
                  <Package className="h-6 w-6" />
                  DigitalMarket
                </Link>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Menu</p>
                  <nav className="flex flex-col space-y-1">
                    <Link href="/" className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent", pathname === '/' && "bg-accent")}>
                      Home
                    </Link>
                    <Link href="/categories" className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent", pathname === '/categories' && "bg-accent")}>
                      Categories
                    </Link>
                    <Link href="/products" className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent", pathname === '/products' && "bg-accent")}>
                      All Products
                    </Link>
                  </nav>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Categories</p>
                  <nav className="flex flex-col space-y-1">
                    {CATEGORIES.slice(0, 6).map((category) => (
                      <Link 
                        key={category.id}
                        href={`/products?category=${category.id}`} 
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Account</p>
                  <nav className="flex flex-col space-y-1">
                    {isAuthenticated ? (
                      <>
                        <Link href="/account" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
                          <User className="h-4 w-4" />
                          My Account
                        </Link>
                        <Link href="/account/orders" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
                          <Package className="h-4 w-4" />
                          My Orders
                        </Link>
                        <Link href="/account/wishlist" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
                          <Heart className="h-4 w-4" />
                          Wishlist
                        </Link>
                      </>
                    ) : (
                      <Link href="/account/login" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
                        <LogIn className="h-4 w-4" />
                        Login / Sign Up
                      </Link>
                    )}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="text-xl font-semibold hidden md:inline-block">DigitalMarket</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] grid-cols-2 gap-3 p-4">
                    {CATEGORIES.map((category) => (
                      <Link 
                        key={category.id}
                        href={`/products?category=${category.id}`} 
                        className="flex flex-col gap-1 rounded-md p-3 hover:bg-accent"
                      >
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {category.description}
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 mt-3 border-t pt-3 text-center">
                      <Link 
                        href="/categories" 
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View all categories
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Search, Cart, Account */}
        <div className="flex items-center gap-2">
          {showSearchOnMobile ? (
            <div className="absolute inset-x-0 top-0 bg-background border-b h-16 px-4 flex items-center justify-between md:hidden">
              <Input 
                className="flex-1 h-9 mr-2" 
                placeholder="Search for products..." 
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSearchOnMobile(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setShowSearchOnMobile(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              className="w-[200px] lg:w-[300px] pl-8"
            />
          </div>
          
          <ThemeToggle />
          
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Open cart</span>
              {items.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {items.length}
                </Badge>
              )}
            </Button>
          </CartSheet>
          
          {isAuthenticated ? (
            <Link href="/account">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Button asChild variant="ghost" size="sm" className="hidden md:flex">
              <Link href="/account/login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}