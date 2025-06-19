import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function FarmerDashboardScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState('home');

  const stats = [
    { label: 'Total Earnings', value: '₹25,750', icon: 'wallet', color: '#4CAF50', change: '+12%' },
    { label: 'Products Listed', value: '32', icon: 'leaf', color: '#2196F3', change: '+3' },
    { label: 'Orders This Month', value: '18', icon: 'receipt', color: '#FF9800', change: '+6' },
    { label: 'Rating', value: '4.8★', icon: 'star', color: '#FFD700', change: '+0.2' },
  ];

  const recentSales = [
    { id: 1, product: 'Rice Husk Compost', quantity: '50 kg', amount: 1250, status: 'Delivered', date: 'Today' },
    { id: 2, product: 'Fresh Tomatoes', quantity: '25 kg', amount: 1125, status: 'In Transit', date: 'Yesterday' },
    { id: 3, product: 'Sugarcane Bagasse', quantity: '100 kg', amount: 2500, status: 'Pending', date: '2 days ago' },
    { id: 4, product: 'Organic Fertilizer', quantity: '30 kg', amount: 900, status: 'Delivered', date: '3 days ago' },
  ];

  const quickActions = [
    { 
      id: 'fresh', 
      name: 'Sell Fresh', 
      icon: 'nutrition', 
      color: '#4CAF50', 
      description: 'List fresh produce',
      onPress: () => navigation.navigate('SellFresh')
    },
    { 
      id: 'waste', 
      name: 'Sell Waste', 
      icon: 'recycle', 
      color: '#FF9800', 
      description: 'Convert waste to income',
      onPress: () => navigation.navigate('SellWaste')
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: 'analytics', 
      color: '#9C27B0', 
      description: 'View performance',
      onPress: () => navigation.navigate('Analytics')
    },
    { 
      id: 'inventory', 
      name: 'Inventory', 
      icon: 'cube', 
      color: '#2196F3', 
      description: 'Manage stock',
      onPress: () => navigation.navigate('Inventory')
    }
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.farmerName}>Ravi Kumar</Text>
      </View>
      
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => Alert.alert('Weather', 'Today: 28°C, Sunny\nTomorrow: 26°C, Light Rain')}
        >
          <Ionicons name="sunny" size={20} color="#F39C12" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => Alert.alert('Notifications', 'You have 2 new orders!')}
        >
          <Ionicons name="notifications-outline" size={20} color="#2C3E50" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Today's Overview</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        {stats.map((stat, index) => (
          <LinearGradient
            key={index}
            colors={[stat.color, stat.color + '80']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={stat.icon as any} size={24} color="#FFFFFF" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statChange}>{stat.change}</Text>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionCard}
            onPress={action.onPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
              <MaterialCommunityIcons
                name={action.icon as any}
                size={28}
                color={action.color}
              />
            </View>
            <Text style={styles.actionName}>{action.name}</Text>
            <Text style={styles.actionDescription}>{action.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRecentSales = () => (
    <View style={styles.recentSalesContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Sales</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {recentSales.slice(0, 3).map((sale) => (
        <View key={sale.id} style={styles.saleCard}>
          <View style={styles.saleInfo}>
            <Text style={styles.saleProduct}>{sale.product}</Text>
            <Text style={styles.saleQuantity}>{sale.quantity}</Text>
            <Text style={styles.saleDate}>{sale.date}</Text>
          </View>
          
          <View style={styles.saleRight}>
            <Text style={styles.saleAmount}>₹{sale.amount}</Text>
            <View style={[styles.statusBadge, { 
              backgroundColor: sale.status === 'Delivered' ? '#4CAF50' : 
                              sale.status === 'In Transit' ? '#FF9800' : '#9E9E9E' 
            }]}>
              <Text style={styles.statusText}>{sale.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={[styles.navItem, selectedTab === 'home' && styles.activeNavItem]}
        onPress={() => setSelectedTab('home')}
      >
        <Ionicons 
          name={selectedTab === 'home' ? 'home' : 'home-outline'} 
          size={24} 
          color={selectedTab === 'home' ? '#4CAF50' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'home' && styles.activeNavText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, selectedTab === 'fresh' && styles.activeNavItem]}
        onPress={() => {
          setSelectedTab('fresh');
          navigation.navigate('SellFresh');
        }}
      >
        <MaterialCommunityIcons 
          name="nutrition" 
          size={24} 
          color={selectedTab === 'fresh' ? '#4CAF50' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'fresh' && styles.activeNavText]}>Fresh</Text>
      </TouchableOpacity>
      
      {/* AI Scan Button - Center */}
      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => {
          Alert.alert(
            'AI Scan Options',
            'What would you like to scan?',
            [
              { text: 'Scan Waste', onPress: () => navigation.navigate('SellWaste') },
              { text: 'Scan Fresh Product', onPress: () => navigation.navigate('SellFresh') },
              { text: 'Cancel', style: 'cancel' }
            ]
          );
        }}
      >
        <LinearGradient
          colors={['#4CAF50', '#45A049']}
          style={styles.scanGradient}
        >
          <MaterialCommunityIcons name="camera-iris" size={32} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, selectedTab === 'waste' && styles.activeNavItem]}
        onPress={() => {
          setSelectedTab('waste');
          navigation.navigate('SellWaste');
        }}
      >
        <MaterialCommunityIcons 
          name="recycle" 
          size={24} 
          color={selectedTab === 'waste' ? '#4CAF50' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'waste' && styles.activeNavText]}>Waste</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, selectedTab === 'profile' && styles.activeNavItem]}
        onPress={() => {
          setSelectedTab('profile');
          navigation.navigate('Profile');
        }}
      >
        <Ionicons 
          name={selectedTab === 'profile' ? 'person' : 'person-outline'} 
          size={24} 
          color={selectedTab === 'profile' ? '#4CAF50' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'profile' && styles.activeNavText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStats()}
        {renderQuickActions()}
        {renderRecentSales()}
        <View style={{ height: 100 }} />
      </ScrollView>
      {renderBottomNav()}
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
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  welcomeText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  farmerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 10,
    marginLeft: 10,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  statsScroll: {
    marginHorizontal: -5,
  },
  statCard: {
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    minWidth: 140,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
  },
  statChange: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 3,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 2,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  recentSalesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  saleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  saleInfo: {
    flex: 1,
  },
  saleProduct: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  saleQuantity: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  saleDate: {
    fontSize: 12,
    color: '#95A5A6',
  },
  saleRight: {
    alignItems: 'flex-end',
  },
  saleAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: '#E8F5E8',
    borderRadius: 20,
  },
  navText: {
    fontSize: 11,
    color: '#95A5A6',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#4CAF50',
    fontWeight: '700',
  },
  scanButton: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  scanGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
