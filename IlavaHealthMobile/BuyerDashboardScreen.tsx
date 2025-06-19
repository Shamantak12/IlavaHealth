import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  TextInput,
  Alert,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './ThemeContext';

const { width } = Dimensions.get('window');

export default function BuyerDashboardScreen({ navigation }: any) {
  const { colors, isDarkMode } = useTheme();
  const [selectedTab, setSelectedTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Bangalore, Karnataka');
  const [maxDistance, setMaxDistance] = useState(10);
  // Sample product data with location and categories
  const [products, setProducts] = useState([
    // Fresh Vegetables
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      category: 'vegetables',
      price: 45,
      unit: 'kg',
      farmer: 'Ravi Kumar',
      distance: 2.3,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Whitefield, Bangalore',
      description: 'Fresh, pesticide-free tomatoes'
    },
    {
      id: 3,
      name: 'Fresh Carrots',
      category: 'vegetables',
      price: 35,
      unit: 'kg',
      farmer: 'Suresh Gowda',
      distance: 1.8,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=150&h=150&fit=crop',
      inStock: true,
      location: 'HSR Layout, Bangalore',
      description: 'Sweet and crunchy farm-fresh carrots'
    },
    {
      id: 5,
      name: 'Organic Spinach',
      category: 'vegetables',
      price: 40,
      unit: 'kg',
      farmer: 'Geetha Rani',
      distance: 3.5,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Koramangala, Bangalore',
      description: 'Fresh organic spinach, rich in iron'
    },
    {
      id: 9,
      name: 'Green Bell Peppers',
      category: 'vegetables',
      price: 60,
      unit: 'kg',
      farmer: 'Manoj Singh',
      distance: 4.1,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1563565375-f3c8de7212ff?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Indiranagar, Bangalore',
      description: 'Crisp, fresh bell peppers'
    },
    
    // Fresh Fruits
    {
      id: 6,
      name: 'Fresh Mangoes',
      category: 'fruits',
      price: 120,
      unit: 'kg',
      farmer: 'Venkatesh P',
      distance: 4.2,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1605027990121-cbae9dd50c47?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Jayanagar, Bangalore',
      description: 'Sweet Alphonso mangoes, premium quality'
    },
    {
      id: 8,
      name: 'Fresh Bananas',
      category: 'fruits',
      price: 30,
      unit: 'dozen',
      farmer: 'Manjula K',
      distance: 2.7,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Marathahalli, Bangalore',
      description: 'Ripe, sweet bananas directly from farm'
    },
    {
      id: 10,
      name: 'Fresh Apples',
      category: 'fruits',
      price: 180,
      unit: 'kg',
      farmer: 'Rajesh Sharma',
      distance: 8.5,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Mysore Road, Bangalore',
      description: 'Crisp red apples from hill stations'
    },
    
    // Compost Materials
    {
      id: 2,
      name: 'Rice Husk Compost',
      category: 'compost',
      price: 25,
      unit: 'kg',
      farmer: 'Lakshmi Devi',
      distance: 5.1,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Electronic City, Bangalore',
      description: 'High-quality organic compost from rice waste'
    },
    {
      id: 11,
      name: 'Cow Dung Manure',
      category: 'compost',
      price: 18,
      unit: 'kg',
      farmer: 'Gopal Reddy',
      distance: 3.2,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Sarjapur Road, Bangalore',
      description: 'Well-decomposed cow dung fertilizer'
    },
    {
      id: 12,
      name: 'Vermicompost',
      category: 'compost',
      price: 35,
      unit: 'kg',
      farmer: 'Sita Devi',
      distance: 6.3,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Bommasandra, Bangalore',
      description: 'Premium quality earthworm compost'
    },
    
    // Plant Waste
    {
      id: 13,
      name: 'Banana Leaves',
      category: 'plantwaste',
      price: 5,
      unit: 'kg',
      farmer: 'Kumar Swamy',
      distance: 2.8,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Banashankari, Bangalore',
      description: 'Fresh banana leaves for eco-friendly packaging'
    },
    {
      id: 14,
      name: 'Dried Tree Branches',
      category: 'plantwaste',
      price: 8,
      unit: 'kg',
      farmer: 'Raman Gowda',
      distance: 7.1,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Hennur Road, Bangalore',
      description: 'Dry wood branches for mulching and fuel'
    },
    {
      id: 15,
      name: 'Coconut Husks',
      category: 'plantwaste',
      price: 12,
      unit: 'kg',
      farmer: 'Prasad K',
      distance: 5.9,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Tumkur Road, Bangalore',
      description: 'Natural coconut husks for gardening'
    },
    
    // Crop Residue
    {
      id: 4,
      name: 'Sugarcane Bagasse',
      category: 'cropresidue',
      price: 15,
      unit: 'kg',
      farmer: 'Krishnan M',
      distance: 7.2,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Yelahanka, Bangalore',
      description: 'Premium quality sugarcane bagasse for composting'
    },
    {
      id: 16,
      name: 'Wheat Straw',
      category: 'cropresidue',
      price: 10,
      unit: 'kg',
      farmer: 'Harish Patel',
      distance: 9.1,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Devanahalli, Bangalore',
      description: 'Golden wheat straw for mulching and animal feed'
    },
    {
      id: 17,
      name: 'Paddy Straw',
      category: 'cropresidue',
      price: 12,
      unit: 'kg',
      farmer: 'Nagaraj B',
      distance: 6.7,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Kanakapura Road, Bangalore',
      description: 'Rice straw bales for organic farming'
    },
    
    // Cotton Waste
    {
      id: 7,
      name: 'Cotton Stalks',
      category: 'cottonwaste',
      price: 20,
      unit: 'kg',
      farmer: 'Ramesh Babu',
      distance: 6.8,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Tumkur Road, Bangalore',
      description: 'Dried cotton stalks for fuel and paper pulp'
    },
    {
      id: 18,
      name: 'Cotton Seed Hulls',
      category: 'cottonwaste',
      price: 25,
      unit: 'kg',
      farmer: 'Vijay Kumar',
      distance: 8.3,
      rating: 4.1,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Ramanagara, Bangalore',
      description: 'Cotton seed hulls for animal bedding'
    },
    
    // Grains
    {
      id: 19,
      name: 'Organic Rice',
      category: 'grains',
      price: 65,
      unit: 'kg',
      farmer: 'Shankar Rao',
      distance: 4.9,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Mandya District',
      description: 'Premium quality organic basmati rice'
    },
    {
      id: 20,
      name: 'Whole Wheat',
      category: 'grains',
      price: 45,
      unit: 'kg',
      farmer: 'Mohan Lal',
      distance: 7.8,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&h=150&fit=crop',
      inStock: true,
      location: 'Chitradurga Road',
      description: 'Fresh milled whole wheat flour quality'
    }
  ]);
  const categories = [
    { id: 'all', name: 'All Products', icon: 'grid', color: '#3498DB' },
    { id: 'vegetables', name: 'Vegetables', icon: 'nutrition', color: '#27AE60' },
    { id: 'fruits', name: 'Fruits', icon: 'apple', color: '#E74C3C' },
    { id: 'grains', name: 'Grains', icon: 'grain', color: '#F39C12' },
    { id: 'compost', name: 'Compost', icon: 'recycle', color: '#8E44AD' },
    { id: 'plantwaste', name: 'Plant Waste', icon: 'leaf', color: '#2ECC71' },
    { id: 'cropresidue', name: 'Crop Residue', icon: 'barley', color: '#D35400' },
    { id: 'cottonwaste', name: 'Cotton Waste', icon: 'tshirt-crew', color: '#95A5A6' }
  ];

  // Filter products based on category, distance, and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesDistance = product.distance <= maxDistance;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDistance && matchesSearch;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={20} color="#3498DB" />
        <Text style={styles.locationText}>{location}</Text>
        <TouchableOpacity onPress={() => Alert.alert('Change Location', 'Location picker will be implemented')}>
          <Ionicons name="chevron-down" size={20} color="#3498DB" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.notificationIcon}
        onPress={() => Alert.alert('Notifications', 'You have 3 new offers nearby!')}
      >
        <Ionicons name="notifications-outline" size={24} color="#2C3E50" />
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderSearchAndFilters = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#95A5A6" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products, farmers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.distanceFilter}>
        <Text style={styles.filterLabel}>Within {maxDistance} km</Text>
        <TouchableOpacity onPress={() => {
          const distances = [5, 10, 15, 20];
          const currentIndex = distances.indexOf(maxDistance);
          const nextIndex = (currentIndex + 1) % distances.length;
          setMaxDistance(distances[nextIndex]);
        }}>
          <Ionicons name="options" size={20} color="#3498DB" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              { backgroundColor: selectedCategory === category.id ? category.color : '#F8F9FA' }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <MaterialCommunityIcons
              name={category.icon as any}
              size={24}
              color={selectedCategory === category.id ? '#FFFFFF' : category.color}
            />
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === category.id ? '#FFFFFF' : '#2C3E50' }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.farmerName}>by {item.farmer}</Text>
        
        <View style={styles.locationDistance}>
          <Ionicons name="location-outline" size={12} color="#95A5A6" />
          <Text style={styles.distanceText}>{item.distance} km away</Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}/{item.unit}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderProducts = () => (
    <View style={styles.productsContainer}>
      <View style={styles.productsHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name} 
          ({filteredProducts.length})
        </Text>
        <TouchableOpacity onPress={() => Alert.alert('Sort', 'Sort options: Distance, Price, Rating')}>
          <Ionicons name="swap-vertical" size={20} color="#3498DB" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
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
          color={selectedTab === 'home' ? '#3498DB' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'home' && styles.activeNavText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, selectedTab === 'categories' && styles.activeNavItem]}
        onPress={() => {
          setSelectedTab('categories');
          navigation.navigate('Categories');
        }}
      >
        <Ionicons 
          name={selectedTab === 'categories' ? 'grid' : 'grid-outline'} 
          size={24} 
          color={selectedTab === 'categories' ? '#3498DB' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'categories' && styles.activeNavText]}>Categories</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, selectedTab === 'cart' && styles.activeNavItem]}
        onPress={() => {
          setSelectedTab('cart');
          navigation.navigate('Cart');
        }}
      >
        <Ionicons 
          name={selectedTab === 'cart' ? 'bag' : 'bag-outline'} 
          size={24} 
          color={selectedTab === 'cart' ? '#3498DB' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'cart' && styles.activeNavText]}>Cart</Text>
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>2</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, selectedTab === 'orders' && styles.activeNavItem]}
        onPress={() => {
          setSelectedTab('orders');
          navigation.navigate('MyOrders');
        }}
      >
        <Ionicons 
          name={selectedTab === 'orders' ? 'receipt' : 'receipt-outline'} 
          size={24} 
          color={selectedTab === 'orders' ? '#3498DB' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'orders' && styles.activeNavText]}>Orders</Text>
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
          color={selectedTab === 'profile' ? '#3498DB' : '#95A5A6'} 
        />
        <Text style={[styles.navText, selectedTab === 'profile' && styles.activeNavText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSearchAndFilters()}
        {renderCategories()}
        {renderProducts()}
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8,
    marginRight: 5,
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
  distanceFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  filterLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    padding: 15,
    marginRight: 15,
    borderRadius: 15,
    minWidth: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  productsContainer: {
    paddingVertical: 10,
    paddingBottom: 100,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  productsList: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 5,
    flex: 0.48,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  productInfo: {
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
    flex: 1,
    marginRight: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 2,
  },
  farmerName: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  locationDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 11,
    color: '#95A5A6',
    marginLeft: 3,
  },
  description: {
    fontSize: 11,
    color: '#7F8C8D',
    marginBottom: 10,
    lineHeight: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#27AE60',
  },
  addButton: {
    backgroundColor: '#3498DB',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeNavItem: {
    backgroundColor: '#EBF3FD',
    borderRadius: 20,
  },
  navText: {
    fontSize: 11,
    color: '#95A5A6',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#3498DB',
    fontWeight: '700',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 25,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
