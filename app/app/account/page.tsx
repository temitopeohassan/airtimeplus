'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { AccountInfo } from '@/components/account/AccountInfo';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PurchasedItems } from '@/components/account/PurchasedItems';

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinDate: 'January 15, 2023',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving profile
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingProfile(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      router.push('/');
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        <AccountSidebar userData={userData} currentPage="account" onLogout={handleLogout} />
        
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-1">My Account</h1>
            <p className="text-muted-foreground">
              Manage your account settings and view your purchases
            </p>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {isEditingProfile ? (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditingProfile(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditingProfile(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
                
                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" defaultValue="Alex" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio"
                        className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell us a bit about yourself"
                      />
                    </div>
                  </form>
                ) : (
                  <AccountInfo userData={userData} />
                )}
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Email Preferences</h2>
                <div className="space-y-4">
                  {['New products', 'Product updates', 'Special offers', 'Newsletter'].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <input type="checkbox" id={pref.toLowerCase().replace(' ', '-')} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <Label htmlFor={pref.toLowerCase().replace(' ', '-')}>{pref}</Label>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex justify-end">
                  <Button>Save preferences</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="purchases" className="space-y-6 mt-6">
              <PurchasedItems />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button>Update password</Button>
                </form>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
                <p className="text-muted-foreground mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              
              <div className="bg-card rounded-lg border border-destructive/20 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-destructive mb-4">Danger Zone</h2>
                <p className="text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}