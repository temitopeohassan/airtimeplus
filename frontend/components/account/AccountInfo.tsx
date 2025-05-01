import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Calendar 
} from 'lucide-react';

interface AccountInfoProps {
  userData: {
    name: string;
    email: string;
    joinDate: string;
    avatarUrl: string;
  };
}

export function AccountInfo({ userData }: AccountInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage src={userData.avatarUrl} alt={userData.name} />
          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-4 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-semibold">{userData.name}</h3>
            <p className="text-sm text-muted-foreground">Premium Member</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {userData.joinDate}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold mb-1">12</p>
          <p className="text-sm text-muted-foreground">Purchases</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold mb-1">3</p>
          <p className="text-sm text-muted-foreground">Wishlisted</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold mb-1">8</p>
          <p className="text-sm text-muted-foreground">Reviews</p>
        </div>
      </div>
    </div>
  );
}