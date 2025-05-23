
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Library, Users, BookOpen, Bell, Shield } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your library system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Library Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Library className="mr-2 h-5 w-5" />
              Library Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="libraryName">Library Name</Label>
              <Input id="libraryName" defaultValue="Central Public Library" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Main Street, City, State 12345" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1-234-567-8900" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="info@centrallibrary.com" />
            </div>
            <Button className="w-full">Update Library Info</Button>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxBooks">Maximum Books Per Member</Label>
              <Input id="maxBooks" type="number" defaultValue="5" />
            </div>
            <div>
              <Label htmlFor="loanPeriod">Default Loan Period (days)</Label>
              <Input id="loanPeriod" type="number" defaultValue="14" />
            </div>
            <div>
              <Label htmlFor="fineRate">Fine Rate (per day)</Label>
              <Input id="fineRate" type="number" step="0.01" defaultValue="0.50" />
            </div>
            <div>
              <Label htmlFor="renewalLimit">Maximum Renewals</Label>
              <Input id="renewalLimit" type="number" defaultValue="2" />
            </div>
            <Button className="w-full">Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email alerts for overdue books</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Due Date Reminders</Label>
                <p className="text-sm text-gray-600">Remind members 3 days before due date</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>New Book Notifications</Label>
                <p className="text-sm text-gray-600">Notify members about new arrivals</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>System Maintenance Alerts</Label>
                <p className="text-sm text-gray-600">Alert about scheduled maintenance</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Enable 2FA for admin accounts</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="30" />
            </div>
            <Button className="w-full">Update Security Settings</Button>
          </CardContent>
        </Card>

        {/* Backup & Data */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Backup & Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium">Database Backup</h3>
                <p className="text-sm text-gray-600 mb-3">Last backup: 2 hours ago</p>
                <Button variant="outline" size="sm">Create Backup</Button>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium">Export Members</h3>
                <p className="text-sm text-gray-600 mb-3">Download member data</p>
                <Button variant="outline" size="sm">Export CSV</Button>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Library className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium">System Logs</h3>
                <p className="text-sm text-gray-600 mb-3">View system activity</p>
                <Button variant="outline" size="sm">View Logs</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
