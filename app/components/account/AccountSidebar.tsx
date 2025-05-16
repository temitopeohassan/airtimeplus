import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Package, 
  CreditCard, 
  Heart, 
  Download, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountSidebarProps {
  userData: {
    name: string;
    email: string;
    joinDate: string;
    avatarUrl: string;
  };
  currentPage: string;
  onLogout: () => void;
}

export function AccountSidebar({ userData, currentPage, onLogout }: AccountSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Account',
      href: '/account',
      icon: User,
      id: 'account',
    },
    {
      name: 'Orders',
      href: '/account/orders',
      icon: Package,
      id: 'orders',
    },
    {
      name: 'Payments',
      href: '/account/payments',
      icon: CreditCard,
      id: 'payments',
    },
    {
      name: 'Wishlist',
      href: '/account/wishlist',
      icon: Heart,
      id: 'wishlist',
    },
    {
      name: 'Downloads',
      href: '/account/downloads',
      icon: Download,
      id: 'downloads',
    },
    {
      name: 'Settings',
      href: '/account/settings',
      icon: Settings,
      id: 'settings',
    },
  ];

  return (
    <div className="w-full md:w-64 mb-8 md:mb-0">
      <div className="space-y-4">
        <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Member since {userData.joinDate}
          </p>
        </div>
        
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              href={item.href} 
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                item.id === currentPage || pathname === item.href
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            className="flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  );
}