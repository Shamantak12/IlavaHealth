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
import { 
  FaArrowLeft, 
  FaUser, 
  FaCamera,
  FaMapMarkerAlt,
  FaLeaf,
  FaTractor,
  FaEdit,
  FaSave,
  FaTimes
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
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notification Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}