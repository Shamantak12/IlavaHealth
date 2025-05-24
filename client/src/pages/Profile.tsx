import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  FaArrowLeft, 
  FaUser, 
  FaCamera,
  FaMapMarkerAlt,
  FaLeaf,
  FaTractor,
  FaEdit,
  FaSave,
  FaTimes,
  FaLock,
  FaBell,
  FaTrash,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  farmerType: string;
  location: string;
  farmingTypes: string[];
  bio: string;
  profileImage: string;
}

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Dialog states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  
  // Password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Settings states
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    contactVisible: true,
    locationVisible: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    newMessages: true,
    marketingEmails: false,
    priceAlerts: true
  });
  
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phoneNumber: '+91 98765 43210',
    farmerType: 'horticulture',
    location: 'Village Khanna, District Ludhiana, Punjab - 141401',
    farmingTypes: ['vegetables', 'fruits', 'flowers'],
    bio: 'Experienced farmer with 15 years in organic farming. Passionate about sustainable agriculture and converting agricultural waste into valuable products.',
    profileImage: '/api/placeholder/150/150'
  });

  const farmerTypes = [
    { value: 'horticulture', label: 'Horticulture' },
    { value: 'sericulture', label: 'Sericulture' },
    { value: 'aquaculture', label: 'Aquaculture' },
    { value: 'poultry', label: 'Poultry Farming' },
    { value: 'dairy', label: 'Dairy Farming' },
    { value: 'crop', label: 'Crop Farming' },
    { value: 'organic', label: 'Organic Farming' },
    { value: 'mixed', label: 'Mixed Farming' },
    { value: 'livestock', label: 'Livestock Farming' }
  ];

  const farmingTypeOptions = [
    { value: 'vegetables', label: 'Vegetables', icon: '🥕' },
    { value: 'fruits', label: 'Fruits', icon: '🍎' },
    { value: 'flowers', label: 'Flowers', icon: '🌸' },
    { value: 'grains', label: 'Grains', icon: '🌾' },
    { value: 'fishing', label: 'Fishing', icon: '🐟' },
    { value: 'animal-husbandry', label: 'Animal Husbandry', icon: '🐄' },
    { value: 'dairy', label: 'Dairy', icon: '🥛' },
    { value: 'poultry', label: 'Poultry', icon: '🐔' },
    { value: 'herbs', label: 'Herbs & Spices', icon: '🌿' },
    { value: 'cotton', label: 'Cotton', icon: '🌱' }
  ];

  const handleSave = () => {
    // Here you would save to backend
    setIsEditing(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes if needed
  };

  const toggleFarmingType = (type: string) => {
    setProfileData(prev => ({
      ...prev,
      farmingTypes: prev.farmingTypes.includes(type) 
        ? prev.farmingTypes.filter(t => t !== type)
        : [...prev.farmingTypes, type]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation('/farmer')}
            >
              <FaArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
          </div>
          
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={isEditing ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {isEditing ? (
              <>
                <FaSave className="mr-2 h-4 w-4" />
                Save
              </>
            ) : (
              <>
                <FaEdit className="mr-2 h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Profile Picture & Basic Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.profileImage} alt="Profile" />
                  <AvatarFallback>
                    <FaUser className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                  >
                    <FaCamera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
                    <p className="text-gray-600">{profileData.email}</p>
                    <p className="text-gray-600">{profileData.phoneNumber}</p>
                    <Badge variant="secondary" className="mt-2">
                      {farmerTypes.find(t => t.value === profileData.farmerType)?.label}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Farmer Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FaTractor className="h-5 w-5 text-green-600" />
              <span>Type of Farmer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Select 
                value={profileData.farmerType} 
                onValueChange={(value) => setProfileData(prev => ({ ...prev, farmerType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select farmer type" />
                </SelectTrigger>
                <SelectContent>
                  {farmerTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-lg">{farmerTypes.find(t => t.value === profileData.farmerType)?.label}</p>
            )}
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FaMapMarkerAlt className="h-5 w-5 text-blue-600" />
              <span>Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter your complete address"
                rows={3}
              />
            ) : (
              <p>{profileData.location}</p>
            )}
          </CardContent>
        </Card>

        {/* Types of Farming */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FaLeaf className="h-5 w-5 text-green-600" />
              <span>Types of Farming</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="grid grid-cols-2 gap-3">
                {farmingTypeOptions.map(option => (
                  <div
                    key={option.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      profileData.farmingTypes.includes(option.value)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleFarmingType(option.value)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.farmingTypes.map(type => {
                  const option = farmingTypeOptions.find(opt => opt.value === type);
                  return (
                    <Badge key={type} variant="secondary" className="text-sm">
                      {option?.icon} {option?.label}
                    </Badge>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader>
            <CardTitle>Bio & Interests</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself, your farming experience, and interests..."
                rows={5}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons for Edit Mode */}
        {isEditing && (
          <div className="flex space-x-4">
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              <FaTimes className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
              <FaSave className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}

        {/* Account Actions */}
        {!isEditing && (
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setShowPrivacySettings(true)}
              >
                Privacy Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setShowNotificationSettings(true)}
              >
                Notification Preferences
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={() => setShowDeleteAccount(true)}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sign Out Button */}
        <Card className="border-red-200">
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                localStorage.removeItem('userType');
                setLocation('/');
                toast({
                  title: "Signed out successfully",
                  description: "You have been logged out of your account.",
                });
              }}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Change Password Dialog */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FaLock className="h-5 w-5" />
              <span>Change Password</span>
            </DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePassword(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Password changed successfully",
                description: "Your password has been updated.",
              });
              setShowChangePassword(false);
            }}>
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Privacy Settings Dialog */}
      <Dialog open={showPrivacySettings} onOpenChange={setShowPrivacySettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FaEye className="h-5 w-5" />
              <span>Privacy Settings</span>
            </DialogTitle>
            <DialogDescription>
              Control what information others can see
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profileVisible">Profile Visible to Others</Label>
              <Switch
                id="profileVisible"
                checked={privacySettings.profileVisible}
                onCheckedChange={(checked) => 
                  setPrivacySettings(prev => ({ ...prev, profileVisible: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="contactVisible">Contact Information Visible</Label>
              <Switch
                id="contactVisible"
                checked={privacySettings.contactVisible}
                onCheckedChange={(checked) => 
                  setPrivacySettings(prev => ({ ...prev, contactVisible: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="locationVisible">Location Visible</Label>
              <Switch
                id="locationVisible"
                checked={privacySettings.locationVisible}
                onCheckedChange={(checked) => 
                  setPrivacySettings(prev => ({ ...prev, locationVisible: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              toast({
                title: "Privacy settings updated",
                description: "Your privacy preferences have been saved.",
              });
              setShowPrivacySettings(false);
            }}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Settings Dialog */}
      <Dialog open={showNotificationSettings} onOpenChange={setShowNotificationSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FaBell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </DialogTitle>
            <DialogDescription>
              Choose which notifications you want to receive
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="orderUpdates">Order Updates</Label>
              <Switch
                id="orderUpdates"
                checked={notificationSettings.orderUpdates}
                onCheckedChange={(checked) => 
                  setNotificationSettings(prev => ({ ...prev, orderUpdates: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="newMessages">New Messages</Label>
              <Switch
                id="newMessages"
                checked={notificationSettings.newMessages}
                onCheckedChange={(checked) => 
                  setNotificationSettings(prev => ({ ...prev, newMessages: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketingEmails">Marketing Emails</Label>
              <Switch
                id="marketingEmails"
                checked={notificationSettings.marketingEmails}
                onCheckedChange={(checked) => 
                  setNotificationSettings(prev => ({ ...prev, marketingEmails: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="priceAlerts">Price Alerts</Label>
              <Switch
                id="priceAlerts"
                checked={notificationSettings.priceAlerts}
                onCheckedChange={(checked) => 
                  setNotificationSettings(prev => ({ ...prev, priceAlerts: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              toast({
                title: "Notification preferences updated",
                description: "Your notification settings have been saved.",
              });
              setShowNotificationSettings(false);
            }}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteAccount} onOpenChange={setShowDeleteAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <FaTrash className="h-5 w-5" />
              <span>Delete Account</span>
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-700">
              Are you sure you want to delete your account? This will remove all your listings, orders, and profile information.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteAccount(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              localStorage.removeItem('userType');
              setLocation('/login');
              toast({
                title: "Account deleted",
                description: "Your account has been permanently deleted.",
                variant: "destructive",
              });
            }}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}