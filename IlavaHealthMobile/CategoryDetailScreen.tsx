import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  rating: number;
  seller: string;
  location: string;
  image: string;
  isFavorite?: boolean;
}

interface CategoryData {
  name: string;
  description: string;
  products: Product[];
}

interface CategoryDetailScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
  route: {
    params: {
      category: string;
    };
  };
}

const categoryData: { [key: string]: CategoryData } = {
  'Compost': {
    name: 'Compost',
    description: 'Organic compost and soil enhancers',
    products: [
      {
        id: '1',
        name: 'Premium Rice Husk Compost',
        description: 'High-quality rice husk compost perfect for organic farming',
        price: 25,
        unit: 'kg',
        rating: 4.8,
        seller: 'Ram Kumar Farm',
        location: 'Punjab',
        image: 'https://example.com/rice-husk.jpg',
      },
      {
        id: '2',
        name: 'Vermicompost Premium',
        description: 'Rich vermicompost made from kitchen waste and cow dung',
        price: 35,
        unit: 'kg',
        rating: 4.9,
        seller: 'Green Earth Farms',
        location: 'Karnataka',
        image: 'https://example.com/vermi-compost.jpg',
      },
    ],
  },
  'Plant Waste': {
    name: 'Plant Waste',
    description: 'Agricultural plant residues and waste',
    products: [
      {
        id: '3',
        name: 'Banana Leaf Waste',
        description: 'Fresh banana leaves suitable for packaging and composting',
        price: 8,
        unit: 'kg',
        rating: 4.5,
        seller: 'South India Farms',
        location: 'Tamil Nadu',
        image: 'https://example.com/banana-leaf.jpg',
      },
    ],
  },
  'Crop Residues': {
    name: 'Crop Residues',
    description: 'Post-harvest crop materials',
    products: [
      {
        id: '4',
        name: 'Wheat Straw Bales',
        description: 'Clean wheat straw suitable for animal bedding and mulching',
        price: 15,
        unit: 'kg',
        rating: 4.6,
        seller: 'Green Valley Farms',
        location: 'Haryana',
        image: 'https://example.com/wheat-straw.jpg',
      },
      {
        id: '5',
        name: 'Rice Husk Raw',
        description: 'Fresh rice husk for industrial and agricultural use',
        price: 12,
        unit: 'kg',
        rating: 4.4,
        seller: 'Paddy Fields Co.',
        location: 'Andhra Pradesh',
        image: 'https://example.com/rice-husk-raw.jpg',
      },
    ],
  },
  'Fruit Waste': {
    name: 'Fruit Waste',
    description: 'Fruit peels, pulp and processing waste',
    products: [],
  },
  'Organic Waste': {
    name: 'Organic Waste',
    description: 'Various organic waste materials',
    products: [],
  },
  'Bio Fertilizers': {
    name: 'Bio Fertilizers',
    description: 'Natural and organic fertilizers',
    products: [],
  },
  'Recycled Products': {
    name: 'Recycled Products',
    description: 'Products made from recycled materials',
    products: [],
  },
};

export default function CategoryDetailScreen({ navigation, route }: CategoryDetailScreenProps) {
  const { category } = route.params;
  const categoryInfo = categoryData[category] || { name: category, description: '', products: [] };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    Alert.alert('Added to Cart', `${product.name} has been added to your cart!`);
  };

  const filteredProducts = categoryInfo.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProductCard = (product: Product) => (
    <View key={product.id} style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <Ionicons name="leaf" size={40} color="#31b43e" />
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(product.id)}
        >
          <Ionicons
            name={favorites.includes(product.id) ? "heart" : "heart-outline"}
            size={20}
            color={favorites.includes(product.id) ? "#dc3545" : "#666"}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productSeller}>{product.seller}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.locationText}>{product.location}</Text>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>
        
        <View style={styles.priceRatingRow}>
          <Text style={styles.price}>₹{product.price}/{product.unit}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#ffc107" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(product)}
          >
            <Ionicons name="cart" size={16} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Ionicons name="leaf-outline" size={60} color="#ccc" />
      </View>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptyDescription}>Try adjusting your search terms</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{categoryInfo.name}</Text>
          <Text style={styles.headerSubtitle}>{categoryInfo.description}</Text>
        </View>
        <Text style={styles.productCount}>
          {categoryInfo.products.length} product{categoryInfo.products.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search in ${categoryInfo.name}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Products List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredProducts.length > 0 ? (
          <View style={styles.productsContainer}>
            {filteredProducts.map(renderProductCard)}
          </View>
        ) : (
          renderEmptyState()
        )}
        
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  productCount: {
    fontSize: 14,
    color: '#31b43e',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  productsContainer: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    height: 160,
    backgroundColor: '#f8f9fa',
  },
  productImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productSeller: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#31b43e',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  viewDetailsButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 6,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 6,
  },
  addToCartText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});
