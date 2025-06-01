import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FarmerDashboardScreen({ navigation }: any) {
  const quickActions = [
    { name: 'Sell Your Waste', icon: 'camera-outline', screen: 'SellWaste', color: '#4CAF50' },
    { name: 'My Products', icon: 'leaf-outline', screen: 'MyOrders', color: '#2196F3' },
    { name: 'Analytics', icon: 'analytics-outline', screen: 'Profile', color: '#FF9800' },
    { name: 'Profile', icon: 'person-outline', screen: 'Profile', color: '#9C27B0' },
  ];

  const recentSales = [
    { id: 1, product: 'Rice Husk Compost', quantity: '50 kg', amount: 1250, status: 'Sold', date: 'Today' },
    { id: 2, product: 'Sugarcane Bagasse', quantity: '100 kg', amount: 2500, status: 'Pending', date: 'Yesterday' },
    { id: 3, product: 'Coconut Coir', quantity: '75 kg', amount: 1875, status: 'Sold', date: '2 days ago' },
  ];

  const stats = [
    { label: 'Total Earnings', value: '₹15,750', icon: 'wallet-outline', color: '#4CAF50' },
    { label: 'Products Listed', value: '24', icon: 'leaf-outline', color: '#2196F3' },
    { label: 'Orders This Month', value: '12', icon: 'receipt-outline', color: '#FF9800' },
    { label: 'Rating', value: '4.8★', icon: 'star-outline', color: '#FFD700' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Farmer!</Text>
          <Text style={styles.subtitle}>Manage your agricultural waste business</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={32} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Performance</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon as any} size={28} color={action.color} />
                </View>
                <Text style={styles.actionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {recentSales.map((sale) => (
            <View key={sale.id} style={styles.saleCard}>
              <View style={styles.saleIcon}>
                <Ionicons name="leaf" size={20} color="#4CAF50" />
              </View>
              <View style={styles.saleInfo}>
                <Text style={styles.saleName}>{sale.product}</Text>
                <Text style={styles.saleQuantity}>{sale.quantity}</Text>
                <Text style={styles.saleDate}>{sale.date}</Text>
              </View>
              <View style={styles.saleStatus}>
                <Text style={styles.saleAmount}>₹{sale.amount}</Text>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: sale.status === 'Sold' ? '#4CAF5020' : '#FFA50020' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: sale.status === 'Sold' ? '#4CAF50' : '#FFA500' }
                  ]}>
                    {sale.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Ionicons name="camera" size={32} color="#2196F3" />
            <Text style={styles.ctaTitle}>Start Selling Today!</Text>
            <Text style={styles.ctaDescription}>
              Use our AI-powered camera to scan and list your agricultural waste for sale
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => navigation.navigate('SellWaste')}
            >
              <Text style={styles.ctaButtonText}>Scan & Sell Waste</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  saleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  saleIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#4CAF5020',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  saleInfo: {
    flex: 1,
  },
  saleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  saleQuantity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  saleDate: {
    fontSize: 11,
    color: '#999',
  },
  saleStatus: {
    alignItems: 'flex-end',
  },
  saleAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  ctaSection: {
    margin: 16,
  },
  ctaCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
