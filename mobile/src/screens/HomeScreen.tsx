import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  wasteType: string;
}

const categories: Category[] = [
  { id: 1, name: 'Compost', icon: 'compost' },
  { id: 2, name: 'Plant Waste', icon: 'grass' },
  { id: 3, name: 'Crop Residue', icon: 'eco' },
  { id: 4, name: 'Fruit Waste', icon: 'spa' },
  { id: 5, name: 'Organic Waste', icon: 'nature' },
  { id: 6, name: 'Bio Fertilizer', icon: 'park' },
  { id: 7, name: 'Recycled', icon: 'recycling' },
];

const products: Product[] = [
  { id: 1, name: 'Organic Compost', price: 1200, wasteType: 'Compost' },
  { id: 2, name: 'Rice Husk Ash', price: 800, wasteType: 'Crop Residue' },
  { id: 3, name: 'Sugarcane Bagasse', price: 650, wasteType: 'Plant Waste' },
  { id: 4, name: 'Fruit Pulp Fertilizer', price: 950, wasteType: 'Fruit Waste' },
  { id: 5, name: 'Coconut Coir', price: 550, wasteType: 'Plant Waste' },
  { id: 6, name: 'Vermicompost', price: 1500, wasteType: 'Organic Waste' },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [favoritesCount, setFavoritesCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const navigateToScanWaste = () => {
    navigation.navigate('ScanWaste');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIcon}>
        <MaterialIcon name={item.icon} size={30} color="#31b43e" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productType}>{item.wasteType}</Text>
          <TouchableOpacity>
            <Icon name="plus" size={18} color="#31b43e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/ilava-logo.svg')}
            style={styles.logo}
          />
          <Text style={styles.brandName}>ILAVA</Text>
        </View>
        <View style={styles.actionIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="heart" size={22} color="#444" />
            {favoritesCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{favoritesCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="shopping-cart" size={22} color="#444" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for agricultural waste products..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity>
            <Icon name="microphone" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
          <Icon name="bars" size={22} color="#444" />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Categories */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />

          {/* Featured Products */}
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
          />

          {/* Promotional Banner */}
          <View style={styles.promotionBanner}>
            <Text style={styles.promotionTitle}>Turn Waste into Wealth!</Text>
            <Text style={styles.promotionDescription}>
              Learn how to convert your agricultural waste into valuable products
            </Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="home" size={22} color="#31b43e" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="list" size={22} color="#666" />
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={navigateToScanWaste}
        >
          <View style={styles.scanButton}>
            <Icon name="qrcode" size={22} color="white" />
          </View>
          <Text style={styles.navText}>Scan Waste</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="shopping-cart" size={22} color="#666" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="user" size={22} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer Menu */}
      {isDrawerOpen && (
        <View style={styles.drawer}>
          <View style={styles.drawerHeader}>
            <Image
              source={require('../assets/ilava-logo.svg')}
              style={styles.drawerLogo}
            />
            <Text style={styles.drawerTitle}>ILAVA</Text>
          </View>
          <ScrollView style={styles.drawerContent}>
            <TouchableOpacity style={styles.drawerMenuItem}>
              <Icon name="home" size={20} color="#444" style={styles.drawerMenuIcon} />
              <Text style={styles.drawerMenuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerMenuItem}>
              <MaterialIcon name="nature-people" size={20} color="#444" style={styles.drawerMenuIcon} />
              <Text style={styles.drawerMenuText}>Sell Your Waste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerMenuItem}>
              <Icon name="shopping-cart" size={20} color="#444" style={styles.drawerMenuIcon} />
              <Text style={styles.drawerMenuText}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerMenuItem}>
              <Icon name="heart" size={20} color="#444" style={styles.drawerMenuIcon} />
              <Text style={styles.drawerMenuText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerMenuItem}>
              <Icon name="user" size={20} color="#444" style={styles.drawerMenuIcon} />
              <Text style={styles.drawerMenuText}>My Profile</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Overlay for drawer */}
      {isDrawerOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleDrawer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  brandName: {
    color: '#31b43e',
    fontWeight: '700',
    fontSize: 24,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#31b43e',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    flex: 1,
    height: 45,
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  menuButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  categoryList: {
    paddingBottom: 10,
    marginBottom: 30,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(49, 180, 62, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#31b43e',
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  productType: {
    fontSize: 12,
    color: '#666',
    backgroundColor: 'rgba(234, 231, 31, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  promotionBanner: {
    backgroundColor: '#31b43e',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  promotionDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 15,
  },
  promotionButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    color: '#31b43e',
    fontSize: 14,
    fontWeight: '600',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavItem: {
    // Active nav item styles
  },
  activeNavText: {
    color: '#31b43e',
  },
  scanButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#31b43e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginTop: -25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    maxWidth: 300,
    height: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#31b43e',
  },
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerMenuIcon: {
    marginRight: 15,
  },
  drawerMenuText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 15,
  },
});

export default HomeScreen;