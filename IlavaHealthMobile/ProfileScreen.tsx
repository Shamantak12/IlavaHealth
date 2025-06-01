import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [profile, setProfile] = useState({
    fullName: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    farmerType: 'Horticulture',
    location: 'Village Khanna, District Ludhiana, Punjab - 141401',
    bio: 'Experienced farmer with 15 years in organic farming. Passionate about sustainable agriculture and converting agricultural waste into valuable products.',
  });

  const [selectedFarmingTypes, setSelectedFarmingTypes] = useState([
    'Vegetables',
    'Fruits',
    'Flowers',
  ]);

  const [showFarmerTypeDropdown, setShowFarmerTypeDropdown] = useState(false);

  const farmerTypes = [
    'Agriculture',
    'Horticulture', 
    'Dairy Farming',
    'Poultry Farming',
    'Aquaculture',
    'Organic Farming',
    'Mixed Farming',
  ];

  const farmingTypes = [
    { id: 'vegetables', name: 'Vegetables', icon: '🥕', color: '#E8F5E8' },
    { id: 'fruits', name: 'Fruits', icon: '🍎', color: '#FFE8E8' },
    { id: 'flowers', name: 'Flowers', icon: '🌸', color: '#F5E8FF' },
    { id: 'grains', name: 'Grains', icon: '🌾', color: '#FFF8E8' },
    { id: 'fishing', name: 'Fishing', icon: '🐠', color: '#E8F8FF' },
    { id: 'dairy', name: 'Dairy', icon: '🥛', color: '#F8F8F8' },
    { id: 'herbs', name: 'Herbs & Spices', icon: '🌿', color: '#E8F5E8' },
    { id: 'animal', name: 'Animal Husbandry', icon: '🐄', color: '#F0F0F0' },
    { id: 'poultry', name: 'Poultry', icon: '🐓', color: '#FFF0E8' },
    { id: 'cotton', name: 'Cotton', icon: '🌱', color: '#E8F5E8' },
  ];

  const accountActions = [
    'Change Password',
    'Privacy Settings',
    'Notification Preferences',
    'Delete Account',
  ];

  const toggleFarmingType = (type: string) => {
    setSelectedFarmingTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleActionPress = (action: string) => {
    switch (action) {
      case 'Change Password':
        Alert.alert('Change Password', 'Password change functionality would be implemented here.');
        break;
      case 'Privacy Settings':
        Alert.alert('Privacy Settings', 'Privacy settings would be implemented here.');
        break;
      case 'Notification Preferences':
        Alert.alert('Notification Preferences', 'Notification preferences would be implemented here.');
        break;
      case 'Delete Account':
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account? This action cannot be undone.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
          ]
        );
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!profile.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name.');
      return;
    }
    if (!profile.email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    if (!profile.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Changes',
      'Are you sure you want to cancel? Any unsaved changes will be lost.',
      [
        { text: 'Continue Editing', style: 'cancel' },
        { text: 'Cancel Changes', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => navigation.navigate('Login') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save" size={16} color="#fff" style={{ marginRight: 4 }} />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={styles.profilePicture}>
            <Ionicons name="person" size={40} color="#333" />
            <TouchableOpacity style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info Form */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={profile.fullName}
              onChangeText={(text) => setProfile(prev => ({ ...prev, fullName: text }))}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={profile.email}
              onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Type of Farmer */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="leaf" size={20} color="#31b43e" />
            <Text style={styles.sectionTitle}>Type of Farmer</Text>
          </View>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowFarmerTypeDropdown(!showFarmerTypeDropdown)}
          >
            <Text style={styles.dropdownText}>{profile.farmerType}</Text>
            <Ionicons 
              name={showFarmerTypeDropdown ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {showFarmerTypeDropdown && (
            <View style={styles.dropdownMenu}>
              {farmerTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    profile.farmerType === type && styles.selectedDropdownItem
                  ]}
                  onPress={() => {
                    setProfile(prev => ({ ...prev, farmerType: type }));
                    setShowFarmerTypeDropdown(false);
                  }}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    profile.farmerType === type && styles.selectedDropdownItemText
                  ]}>
                    {type}
                  </Text>
                  {profile.farmerType === type && (
                    <Ionicons name="checkmark" size={16} color="#31b43e" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Location */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location" size={20} color="#007bff" />
            <Text style={styles.sectionTitle}>Location</Text>
          </View>
          <TextInput
            style={styles.locationInput}
            value={profile.location}
            onChangeText={(text) => setProfile(prev => ({ ...prev, location: text }))}
            placeholder="Enter your location"
            multiline
          />
        </View>

        {/* Types of Farming */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="leaf" size={20} color="#31b43e" />
            <Text style={styles.sectionTitle}>Types of Farming</Text>
          </View>
          <View style={styles.farmingTypesGrid}>
            {farmingTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.farmingTypeCard,
                  {
                    backgroundColor: selectedFarmingTypes.includes(type.name)
                      ? type.color
                      : '#f8f9fa',
                    borderColor: selectedFarmingTypes.includes(type.name)
                      ? '#31b43e'
                      : '#e9ecef',
                    borderWidth: selectedFarmingTypes.includes(type.name) ? 2 : 1,
                  },
                ]}
                onPress={() => toggleFarmingType(type.name)}
              >
                <Text style={styles.farmingTypeIcon}>{type.icon}</Text>
                <Text style={styles.farmingTypeName}>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bio & Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio & Interests</Text>
          <TextInput
            style={styles.bioInput}
            value={profile.bio}
            onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
            placeholder="Tell us about yourself and your farming interests..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          {accountActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionItem,
                action === 'Delete Account' && styles.deleteAction,
              ]}
              onPress={() => handleActionPress(action)}
            >
              <Text
                style={[
                  styles.actionText,
                  action === 'Delete Account' && styles.deleteActionText,
                ]}
              >
                {action}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Ionicons name="close" size={16} color="#666" style={{ marginRight: 4 }} />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.saveChangesButton} onPress={handleSave}>
            <Ionicons name="save" size={16} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.saveChangesButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31b43e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#f8f9fa',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  formSection: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  locationInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  farmingTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  farmingTypeCard: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  farmingTypeIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  farmingTypeName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  deleteAction: {
    borderBottomWidth: 0,
  },
  deleteActionText: {
    color: '#dc3545',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  saveChangesButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#31b43e',
    borderRadius: 8,
  },
  saveChangesButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  signOutButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signOutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});