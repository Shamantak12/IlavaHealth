import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoriesScreen({ navigation }: any) {
  const categories = [
    { 
      id: 1, 
      name: 'Compost', 
      icon: 'leaf-outline', 
      description: 'Organic compost and soil enhancers',
      products: 24,
      color: '#4CAF50'
    },
    { 
      id: 2, 
      name: 'Plant Waste', 
      icon: 'leaf', 
      description: 'Agricultural plant residues and waste',
      products: 18,
      color: '#2E7D32'
    },
    { 
      id: 3, 
      name: 'Crop Residues', 
      icon: 'car-outline', 
      description: 'Post-harvest crop materials',
      products: 32,
      color: '#FF9800'
    },
    { 
      id: 4, 
      name: 'Fruit Waste', 
      icon: 'nutrition-outline', 
      description: 'Fruit peels, pulp and processing waste',
      products: 15,
      color: '#F44336'
    },
    { 
      id: 5, 
      name: 'Organic Waste', 
      icon: 'leaf-outline', 
      description: 'General organic agricultural waste',
      products: 28,
      color: '#4CAF50'
    },
    { 
      id: 6, 
      name: 'Bio Fertilizers', 
      icon: 'flask-outline', 
      description: 'Natural and organic fertilizers',
      products: 21,
      color: '#9C27B0'
    },
    { 
      id: 7, 
      name: 'Recycled Products', 
      icon: 'refresh-outline', 
      description: 'Products made from recycled materials',
      products: 16,
      color: '#2196F3'
    },
  ];

  const quickActions = [
    { name: 'Sell Your Waste', icon: 'leaf-outline', screen: 'SellWaste' },
    { name: 'View Cart', icon: 'cart-outline', screen: 'Cart' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Categories</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <Ionicons name={category.icon as any} size={32} color={category.color} />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <Text style={styles.productCount}>{category.products} products</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.screen)}
              >
                <Ionicons name={action.icon as any} size={24} color="#2196F3" />
                <Text style={styles.quickActionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  productCount: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  quickActionsSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});
