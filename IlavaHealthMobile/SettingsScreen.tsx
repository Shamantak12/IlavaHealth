import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen({ navigation }: any) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const settingsGroups = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'push',
          title: 'Push Notifications',
          subtitle: 'Receive notifications on your device',
          type: 'switch',
          value: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          id: 'email',
          title: 'Email Notifications',
          subtitle: 'Get updates via email',
          type: 'switch',
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
        {
          id: 'sms',
          title: 'SMS Notifications',
          subtitle: 'Receive text message updates',
          type: 'switch',
          value: smsNotifications,
          onToggle: setSmsNotifications,
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'location',
          title: 'Location Services',
          subtitle: 'Allow app to access your location',
          type: 'switch',
          value: locationServices,
          onToggle: setLocationServices,
        },
        {
          id: 'biometric',
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face ID',
          type: 'switch',
          value: biometricAuth,
          onToggle: setBiometricAuth,
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          subtitle: 'View our privacy policy',
          type: 'navigation',
          onPress: () => Alert.alert('Privacy Policy', 'Privacy policy will be displayed here.'),
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          subtitle: 'View terms and conditions',
          type: 'navigation',
          onPress: () => Alert.alert('Terms of Service', 'Terms of service will be displayed here.'),
        },
      ],
    },
    {
      title: 'App Preferences',
      items: [
        {
          id: 'theme',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          type: 'navigation',
          onPress: () => Alert.alert('Language', 'Language selection coming soon!'),
        },
        {
          id: 'currency',
          title: 'Currency',
          subtitle: 'Indian Rupee (₹)',
          type: 'navigation',
          onPress: () => Alert.alert('Currency', 'Currency selection coming soon!'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          subtitle: 'Get help and support',
          type: 'navigation',
          onPress: () => navigation.navigate('Support'),
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Share your thoughts with us',
          type: 'navigation',
          onPress: () => Alert.alert('Feedback', 'Thank you for your feedback!'),
        },
        {
          id: 'rate',
          title: 'Rate the App',
          subtitle: 'Rate us on the app store',
          type: 'navigation',
          onPress: () => Alert.alert('Rate App', 'Thank you for rating our app!'),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'backup',
          title: 'Backup Data',
          subtitle: 'Backup your account data',
          type: 'navigation',
          onPress: () => Alert.alert('Backup', 'Data backup completed successfully!'),
        },
        {
          id: 'export',
          title: 'Export Data',
          subtitle: 'Download your data',
          type: 'navigation',
          onPress: () => Alert.alert('Export', 'Data export will be available soon!'),
        },
        {
          id: 'delete',
          title: 'Delete Account',
          subtitle: 'Permanently delete your account',
          type: 'navigation',
          danger: true,
          onPress: () => {
            Alert.alert(
              'Delete Account',
              'Are you sure you want to delete your account? This action cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted.') },
              ]
            );
          },
        },
      ],
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Settings</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderSettingItem = (item: any) => {
    switch (item.type) {
      case 'switch':
        return (
          <View key={item.id} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, item.danger && styles.dangerText]}>
                {item.title}
              </Text>
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        );
      
      case 'navigation':
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, item.danger && styles.dangerText]}>
                {item.title}
              </Text>
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={item.danger ? '#F44336' : '#95A5A6'} 
            />
          </TouchableOpacity>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.headerGradient}>
        {renderHeader()}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContent}>
              {group.items.map((item) => renderSettingItem(item))}
            </View>
          </View>
        ))}

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>IlavaHealth v1.0.0</Text>
          <Text style={styles.buildNumber}>Build 100</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  settingsGroup: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7F8C8D',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  dangerText: {
    color: '#F44336',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  buildNumber: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 2,
  },
  bottomSpacer: {
    height: 20,
  },
});
