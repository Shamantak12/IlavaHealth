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
  FlatList
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function InventoryScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  const [inventory] = useState([
    {
      id: 1,
      name: 'Fresh Tomatoes',
      category: 'vegetables',
      stock: 150,
      unit: 'kg',
      price: 45,
      status: 'active',
      views: 234,
      inquiries: 12,
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Rice Husk Compost',
      category: 'waste',
      stock: 0,
      unit: 'kg',
      price: 25,
      status: 'out_of_stock',
      views: 89,
      inquiries: 5,
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Organic Spinach',
      category: 'vegetables',
      stock: 75,
      unit: 'kg',
      price: 40,
      status: 'active',
      views: 156,
      inquiries: 8,
      lastUpdated: '3 hours ago'
    },
    {
      id: 4,
      name: 'Sugarcane Bagasse',
      category: 'waste',
      stock: 25,
      unit: 'kg',
      price: 15,
      status: 'low_stock',
      views: 67,
      inquiries: 3,
      lastUpdated: '5 hours ago'
    },
    {
      id: 5,
      name: 'Fresh Carrots',
      category: 'vegetables',
      stock: 200,
      unit: 'kg',
      price: 35,
      status: 'active',
      views: 198,
      inquiries: 15,
      lastUpdated: '1 hour ago'
    }
  ]);

  const tabs = [
    { id: 'active', name: 'Active', count: inventory.filter(item => item.status === 'active').length },
    { id: 'low_stock', name: 'Low Stock', count: inventory.filter(item => item.status === 'low_stock').length },
    { id: 'out_of_stock', name: 'Out of Stock', count: inventory.filter(item => item.status === 'out_of_stock').length },
    { id: 'all', name: 'All', count: inventory.length }
  ];

  const filteredInventory = inventory.filter(item => {
    const matchesTab = selectedTab === 'all' || item.status === selectedTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'low_stock': return '#FF9800';
      case 'out_of_stock': return '#F44336';
      default: return '#95A5A6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  const handleUpdateStock = (item: any) => {
    Alert.prompt(
      'Update Stock',
      `Enter new stock quantity for ${item.name}:`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update', onPress: (value) => {
          if (value && !isNaN(Number(value))) {
            Alert.alert('Success', `Stock updated to ${value} ${item.unit}`);
          }
        }}
      ],
      'plain-text',
      item.stock.toString()
    );
  };

  const handleEditProduct = (item: any) => {
    Alert.alert(
      'Edit Product',
      `Edit ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Edit Price', onPress: () => {
          Alert.prompt(
            'Update Price',
            `Enter new price per ${item.unit}:`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Update', onPress: (value) => {
                if (value && !isNaN(Number(value))) {
                  Alert.alert('Success', `Price updated to ₹${value}/${item.unit}`);
                }
              }}
            ],
            'plain-text',
            item.price.toString()
          );
        }},
        { text: 'Update Stock', onPress: () => handleUpdateStock(item) }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#2C3E50" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Inventory Management</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SellFresh')}>
        <Ionicons name="add" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );

  const renderSearchAndTabs = () => (
    <View style={styles.searchTabContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#95A5A6" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedTab === tab.id && styles.activeTabButton
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab.id && styles.activeTabText
            ]}>
              {tab.name} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductCard = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productTitleContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={() => handleEditProduct(item)}>
          <Ionicons name="ellipsis-vertical" size={20} color="#95A5A6" />
        </TouchableOpacity>
      </View>

      <View style={styles.productDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Stock</Text>
            <Text style={[styles.detailValue, { 
              color: item.stock > 50 ? '#4CAF50' : item.stock > 0 ? '#FF9800' : '#F44336' 
            }]}>
              {item.stock} {item.unit}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Price</Text>
            <Text style={styles.detailValue}>₹{item.price}/{item.unit}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Views</Text>
            <Text style={styles.detailValue}>{item.views}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Inquiries</Text>
            <Text style={styles.detailValue}>{item.inquiries}</Text>
          </View>
        </View>

        <Text style={styles.lastUpdated}>Last updated: {item.lastUpdated}</Text>
      </View>

      <View style={styles.productActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.updateButton]}
          onPress={() => handleUpdateStock(item)}
        >
          <MaterialCommunityIcons name="update" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Update Stock</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditProduct(item)}
        >
          <MaterialCommunityIcons name="pencil" size={16} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="package-variant" size={64} color="#95A5A6" />
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptyDescription}>
        {selectedTab === 'all' 
          ? 'Start by adding your first product to inventory'
          : `No products in ${tabs.find(t => t.id === selectedTab)?.name} category`
        }
      </Text>
      <TouchableOpacity 
        style={styles.addProductButton}
        onPress={() => navigation.navigate('SellFresh')}
      >
        <Text style={styles.addProductText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearchAndTabs()}
      
      {filteredInventory.length > 0 ? (
        <FlatList
          data={filteredInventory}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        renderEmptyState()
      )}
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
  searchTabContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
  tabsContainer: {
    marginHorizontal: -5,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  activeTabButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  productTitleContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  productDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#95A5A6',
    marginBottom: 4,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '700',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 10,
    fontStyle: 'italic',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  addProductButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  addProductText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
