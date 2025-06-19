import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen({ navigation }: any) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'Quarter' },
    { id: 'year', name: 'Year' }
  ];

  const salesData = {
    week: { revenue: 8250, orders: 12, avgOrder: 687, growth: 15 },
    month: { revenue: 25750, orders: 38, avgOrder: 677, growth: 22 },
    quarter: { revenue: 72500, orders: 105, avgOrder: 690, growth: 18 },
    year: { revenue: 285000, orders: 420, avgOrder: 678, growth: 35 }
  };

  const topProducts = [
    { name: 'Fresh Tomatoes', sales: 145, revenue: 6525, growth: 25 },
    { name: 'Rice Husk Compost', sales: 89, revenue: 2225, growth: 18 },
    { name: 'Organic Spinach', sales: 67, revenue: 2680, growth: 12 },
    { name: 'Sugarcane Bagasse', sales: 52, revenue: 1300, growth: 8 },
  ];

  const insights = [
    {
      type: 'opportunity',
      title: 'High Demand for Organic Products',
      description: 'Organic vegetables are selling 40% faster than conventional ones',
      icon: 'trending-up',
      color: '#4CAF50'
    },
    {
      type: 'warning',
      title: 'Low Stock Alert',
      description: 'Tomatoes inventory running low. Consider restocking',
      icon: 'alert-circle',
      color: '#FF9800'
    },
    {
      type: 'tip',
      title: 'Best Selling Time',
      description: 'Your products sell best between 6-9 AM',
      icon: 'lightbulb',
      color: '#2196F3'
    }
  ];

  const currentData = salesData[selectedPeriod as keyof typeof salesData];

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#2C3E50" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Analytics</Text>
      <TouchableOpacity>
        <Ionicons name="download-outline" size={24} color="#2C3E50" />
      </TouchableOpacity>
    </View>
  );

  const renderPeriodSelector = () => (
    <View style={styles.periodContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodButton,
              selectedPeriod === period.id && styles.activePeriodButton
            ]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Text style={[
              styles.periodText,
              selectedPeriod === period.id && styles.activePeriodText
            ]}>
              {period.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSalesOverview = () => (
    <View style={styles.overviewContainer}>
      <Text style={styles.sectionTitle}>Sales Overview</Text>
      
      <View style={styles.statsGrid}>
        <LinearGradient colors={['#4CAF50', '#45A049']} style={styles.statCard}>
          <MaterialCommunityIcons name="currency-inr" size={24} color="#FFFFFF" />
          <Text style={styles.statValue}>₹{currentData.revenue.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
          <Text style={styles.statGrowth}>+{currentData.growth}%</Text>
        </LinearGradient>

        <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.statCard}>
          <MaterialCommunityIcons name="shopping" size={24} color="#FFFFFF" />
          <Text style={styles.statValue}>{currentData.orders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statGrowth}>+12%</Text>
        </LinearGradient>

        <LinearGradient colors={['#FF9800', '#F57C00']} style={styles.statCard}>
          <MaterialCommunityIcons name="calculator" size={24} color="#FFFFFF" />
          <Text style={styles.statValue}>₹{currentData.avgOrder}</Text>
          <Text style={styles.statLabel}>Avg Order Value</Text>
          <Text style={styles.statGrowth}>+5%</Text>
        </LinearGradient>

        <LinearGradient colors={['#9C27B0', '#7B1FA2']} style={styles.statCard}>
          <MaterialCommunityIcons name="star" size={24} color="#FFFFFF" />
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
          <Text style={styles.statGrowth}>+0.2</Text>
        </LinearGradient>
      </View>
    </View>
  );

  const renderTopProducts = () => (
    <View style={styles.productsContainer}>
      <Text style={styles.sectionTitle}>Top Performing Products</Text>
      
      {topProducts.map((product, index) => (
        <View key={index} style={styles.productCard}>
          <View style={styles.productRank}>
            <Text style={styles.rankText}>{index + 1}</Text>
          </View>
          
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productStats}>
              {product.sales} units sold • ₹{product.revenue.toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.productGrowth}>
            <Text style={styles.growthText}>+{product.growth}%</Text>
            <Ionicons name="trending-up" size={16} color="#4CAF50" />
          </View>
        </View>
      ))}
    </View>
  );

  const renderInsights = () => (
    <View style={styles.insightsContainer}>
      <Text style={styles.sectionTitle}>Business Insights</Text>
      
      {insights.map((insight, index) => (
        <View key={index} style={styles.insightCard}>
          <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
            <MaterialCommunityIcons 
              name={insight.icon as any} 
              size={24} 
              color={insight.color} 
            />
          </View>
          
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>{insight.title}</Text>
            <Text style={styles.insightDescription}>{insight.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderPeriodSelector()}
        {renderSalesOverview()}
        {renderTopProducts()}
        {renderInsights()}
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
  periodContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  activePeriodButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  periodText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  overviewContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
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
  statGrowth: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 3,
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  productRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  productStats: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  productGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginRight: 5,
  },
  insightsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  insightIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 18,
  },
});
