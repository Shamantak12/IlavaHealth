import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  TextInput,
  Image,
  Switch
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Ravi Kumar',
    email: 'ravi.kumar@email.com',
    phone: '+91 98765 43210',
    type: 'farmer', // 'farmer' or 'buyer'
    location: 'Bangalore, Karnataka',
    bio: 'Experienced organic farmer specializing in vegetables and waste products.',
    rating: 4.8,
    totalSales: 156,
    joinDate: 'January 2023'
  });

  const menuItems = [
    { id: 'orders', title: 'My Orders', icon: 'receipt-outline', screen: 'MyOrders' },
    { id: 'favorites', title: 'Favorites', icon: 'heart-outline', screen: 'Favorites' },
    { id: 'cart', title: 'Shopping Cart', icon: 'bag-outline', screen: 'Cart' },
    { id: 'wallet', title: 'Wallet & Payments', icon: 'wallet-outline', screen: 'Wallet' },
    { id: 'support', title: 'Customer Support', icon: 'help-circle-outline', screen: 'Support' },
    { id: 'settings', title: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  ];

  const farmerMenuItems = [
    { id: 'analytics', title: 'Sales Analytics', icon: 'analytics-outline', screen: 'Analytics' },
    { id: 'inventory', title: 'Inventory', icon: 'cube-outline', screen: 'Inventory' },
    { id: 'earnings', title: 'Earnings Report', icon: 'trending-up-outline', screen: 'Earnings' },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#2C3E50" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Profile</Text>
      <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
        <Ionicons 
          name={isEditing ? "checkmark" : "pencil"} 
          size={24} 
          color={isEditing ? "#4CAF50" : "#2C3E50"} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderProfileCard = () => (
    <View style={styles.profileCard}>
      <LinearGradient
        colors={profile.type === 'farmer' ? ['#4CAF50', '#45A049'] : ['#3498DB', '#2980B9']}
        style={styles.profileGradient}
      >
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <MaterialCommunityIcons 
              name={profile.type === 'farmer' ? 'account-cowboy-hat' : 'account'} 
              size={40} 
              color="#FFFFFF" 
            />
          </View>
          <View style={styles.typeIndicator}>
            <MaterialCommunityIcons 
              name={profile.type === 'farmer' ? 'sprout' : 'shopping'} 
              size={16} 
              color="#FFFFFF" 
            />
          </View>
        </View>

        <View style={styles.profileInfo}>
          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              placeholder="Full Name"
              placeholderTextColor="#E8F5E8"
            />
          ) : (
            <Text style={styles.profileName}>{profile.name}</Text>
          )}
          
          <Text style={styles.profileType}>
            {profile.type === 'farmer' ? '🌱 Farmer' : '🛒 Buyer'}
          </Text>
          
          {profile.type === 'farmer' && (
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{profile.rating}★</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{profile.totalSales}</Text>
                <Text style={styles.statLabel}>Sales</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{profile.joinDate}</Text>
                <Text style={styles.statLabel}>Joined</Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  const renderContactInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      
      <View style={styles.contactItem}>
        <Ionicons name="mail-outline" size={20} color="#3498DB" />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
            placeholder="Email"
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.contactText}>{profile.email}</Text>
        )}
      </View>

      <View style={styles.contactItem}>
        <Ionicons name="call-outline" size={20} color="#4CAF50" />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.contactText}>{profile.phone}</Text>
        )}
      </View>

      <View style={styles.contactItem}>
        <Ionicons name="location-outline" size={20} color="#FF9800" />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.location}
            onChangeText={(text) => setProfile({ ...profile, location: text })}
            placeholder="Location"
          />
        ) : (
          <Text style={styles.contactText}>{profile.location}</Text>
        )}
      </View>

      {isEditing && (
        <View style={styles.contactItem}>
          <Ionicons name="document-text-outline" size={20} color="#9C27B0" />
          <TextInput
            style={[styles.contactInput, styles.bioInput]}
            value={profile.bio}
            onChangeText={(text) => setProfile({ ...profile, bio: text })}
            placeholder="Bio"
            multiline={true}
            numberOfLines={3}
          />
        </View>
      )}
    </View>
  );

  const renderMenuSection = (title: string, items: any[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name={item.icon as any} size={24} color="#3498DB" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="notifications-outline" size={24} color="#FF9800" />
          <Text style={styles.menuItemText}>Push Notifications</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#ECF0F1', true: '#4CAF50' }}
          thumbColor={notifications ? '#FFFFFF' : '#BDC3C7'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="location-outline" size={24} color="#E74C3C" />
          <Text style={styles.menuItemText}>Location Sharing</Text>
        </View>
        <Switch
          value={locationSharing}
          onValueChange={setLocationSharing}
          trackColor={{ false: '#ECF0F1', true: '#4CAF50' }}
          thumbColor={locationSharing ? '#FFFFFF' : '#BDC3C7'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.menuItemLeft}>
          <Ionicons name="moon-outline" size={24} color="#2C3E50" />
          <Text style={styles.menuItemText}>Dark Mode</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#ECF0F1', true: '#4CAF50' }}
          thumbColor={darkMode ? '#FFFFFF' : '#BDC3C7'}
        />
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <LinearGradient colors={['#4CAF50', '#45A049']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <LinearGradient colors={['#E74C3C', '#C0392B']} style={styles.buttonGradient}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Sign Out</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderProfileCard()}
        {renderContactInfo()}
        {renderMenuSection('General', menuItems)}
        {profile.type === 'farmer' && renderMenuSection('Farmer Tools', farmerMenuItems)}
        {renderSettings()}
        {renderActionButtons()}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileGradient: {
    padding: 25,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 5,
    minWidth: 200,
  },
  profileType: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  contactInput: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#2C3E50',
  },
  contactText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#2C3E50',
  },
  bioInput: {
    textAlignVertical: 'top',
    minHeight: 60,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 15,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  signOutButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
