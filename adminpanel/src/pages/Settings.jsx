import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from '../components/ui/input.tsx';
import { Separator } from '../components/ui/separator.tsx';
import { Switch } from '../components/ui/switch.tsx';
import { Label } from '../components/ui/label.tsx';
import { toast } from 'sonner';

const SettingsPage = () => {
  const handleSaveGeneral = () => {
    toast.success('General settings saved');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification settings saved');
  };

  const handleSaveAppearance = () => {
    toast.success('Appearance settings saved');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <h1 className="page-title">Settings</h1>

      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold">General Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your application preferences</p>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="schoolName">School System Name</Label>
              <Input id="schoolName" defaultValue="District Education Management" />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input id="adminEmail" defaultValue="admin@example.com" />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" defaultValue="+1 (555) 123-4567" />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="America/New_York" />
            </div>
          </div>
          
          <Button onClick={handleSaveGeneral}>Save Changes</Button>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">Configure notification preferences</p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive emails about system updates</p>
              </div>
              <Switch defaultChecked id="email-notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Timetable Changes</h3>
                <p className="text-sm text-muted-foreground">Get notified when timetables are modified</p>
              </div>
              <Switch defaultChecked id="timetable-notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">User Account Activities</h3>
                <p className="text-sm text-muted-foreground">Notifications about user registrations and status changes</p>
              </div>
              <Switch defaultChecked id="user-notifications" />
            </div>
          </div>
          
          <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
        </div>
        
        {/* Appearance Settings */}
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Appearance</h2>
            <p className="text-sm text-muted-foreground">Customize the look and feel of the admin panel</p>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="theme">Theme</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Light</Button>
                <Button variant="outline" className="flex-1">Dark</Button>
                <Button variant="outline" className="flex-1">System</Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label>Density</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Compact</Button>
                <Button variant="outline" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Standard</Button>
                <Button variant="outline" className="flex-1">Comfortable</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label>Color Scheme</Label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              <div className="h-10 rounded-md bg-primary cursor-pointer border-2 border-primary"></div>
              <div className="h-10 rounded-md bg-blue-500 cursor-pointer"></div>
              <div className="h-10 rounded-md bg-green-500 cursor-pointer"></div>
              <div className="h-10 rounded-md bg-amber-500 cursor-pointer"></div>
              <div className="h-10 rounded-md bg-rose-500 cursor-pointer"></div>
              <div className="h-10 rounded-md bg-purple-500 cursor-pointer"></div>
            </div>
          </div>
          
          <Button onClick={handleSaveAppearance}>Save Appearance Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;