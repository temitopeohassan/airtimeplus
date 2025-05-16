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
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { 
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/data/categories';
import { useCart } from '@/hooks/use-cart';
import { 
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename, 
  WalletDropdownFundLink, 
  WalletDropdownLink, 
  WalletDropdownDisconnect,
 } from '@coinbase/onchainkit/wallet';
 import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance, 
} from '@coinbase/onchainkit/identity';
import Image from 'next/image';
 

// Fake auth state for demo purposes - in a real app use an auth library

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
                <Image 
                  src="/logo.png" 
                  alt="AirtimePlus"
                  width={70}
                  height={70}
                />               
                  AirtimePlus
                </Link>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Menu</p>
                  <nav className="flex flex-col space-y-1">
                    <Link href="/" className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent", pathname === '/' && "bg-accent")}>
                      Home
                    </Link>
                  
                  </nav>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Categories</p>
                  <nav className="flex flex-col space-y-1">
                    {CATEGORIES.slice(0, 6).map((category) => (
                      <Link 
                        key={category.id}
                        href={`/${category.id}`} 
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                <div className="space-y-2">
                <Wallet>
                <ConnectWallet className='bg-blue-800' disconnectedLabel='Connect Wallet'>
    <Avatar className="h-6 w-6" />
    <Name />
  </ConnectWallet>
  <WalletDropdown>
    <Identity
      className="px-4 pt-3 pb-2"
      hasCopyAddressOnClick
    >
      <Avatar />
      <Name />
      <Address />
      <EthBalance />
    </Identity>
    <WalletDropdownBasename />
    <WalletDropdownLink
      icon="wallet"
      href="https://keys.coinbase.com"
    >
      Wallet
    </WalletDropdownLink>
    <WalletDropdownFundLink />
    <WalletDropdownDisconnect />
  </WalletDropdown>
</Wallet>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2">
          <Image 
                  src="/logo.png" 
                  alt="AirtimePlus"
                  width={70}
                  height={70}
                />
            <span className="text-xl font-semibold hidden md:inline-block">AirtimePlus</span>
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
                        href={`/${category.id}`} 
                        className="flex flex-col gap-1 rounded-md p-3 hover:bg-accent"
                      >
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {category.description}
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 mt-3 border-t pt-3 text-center">
                     
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
    
        <div className="flex items-center gap-2">
         
          
          <ThemeToggle />
          
                   
                   <Wallet>
  <ConnectWallet className='bg-blue-800' disconnectedLabel='Connect Wallet'>
    <Avatar className="h-6 w-6" />
    <Name />
  </ConnectWallet>
  <WalletDropdown>
    <Identity
      className="px-4 pt-3 pb-2"
      hasCopyAddressOnClick
    >
      <Avatar />
      <Name />
      <Address />
      <EthBalance />
    </Identity>
    <WalletDropdownBasename />
    <WalletDropdownLink
      icon="wallet"
      href="https://keys.coinbase.com"
    >
      Wallet
    </WalletDropdownLink>
    <WalletDropdownFundLink />
    <WalletDropdownDisconnect />
  </WalletDropdown>
</Wallet>
        </div>
      </nav>
    </header>
  );
}