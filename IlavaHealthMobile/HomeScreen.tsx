import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  wasteType: string;
}

// Sample categories with icons
const categories = [
  { id: 1, name: 'Compost', icon: <MaterialCommunityIcons name="compost" size={28} color="#31b43e" /> },
  { id: 2, name: 'Plant Waste', icon: <MaterialCommunityIcons name="sprout" size={28} color="#31b43e" /> },
  { id: 3, name: 'Crop Residue', icon: <MaterialCommunityIcons name="corn" size={28} color="#31b43e" /> },
  { id: 4, name: 'Fruit Waste', icon: <MaterialCommunityIcons name="fruit-cherries" size={28} color="#31b43e" /> },
  { id: 5, name: 'Organic Waste', icon: <MaterialCommunityIcons name="leaf" size={28} color="#31b43e" /> },
  { id: 6, name: 'Bio Fertilizer', icon: <MaterialCommunityIcons name="nature" size={28} color="#31b43e" /> },
  { id: 7, name: 'Recycled', icon: <MaterialCommunityIcons name="recycle" size={28} color="#31b43e" /> },
];

const sampleProducts: Product[] = [
  { id: 1, name: 'Organic Compost', price: 1200, imageUrl: '', wasteType: 'Compost' },
  { id: 2, name: 'Rice Husk Ash', price: 800, imageUrl: '', wasteType: 'Crop Residue' },
  { id: 3, name: 'Sugarcane Bagasse', price: 650, imageUrl: '', wasteType: 'Plant Waste' },
  { id: 4, name: 'Fruit Pulp Fertilizer', price: 950, imageUrl: '', wasteType: 'Fruit Waste' },
  { id: 5, name: 'Coconut Coir', price: 550, imageUrl: '', wasteType: 'Plant Waste' },
  { id: 6, name: 'Vermicompost', price: 1500, imageUrl: '', wasteType: 'Organic Waste' },
];

export default function HomeScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWasteAnalyzerOpen, setIsWasteAnalyzerOpen] = useState(false);
  const [wasteAnalyzerState, setWasteAnalyzerState] = useState<'camera' | 'analyzing' | 'results'>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [cartCount] = useState(2);
  const [favoritesCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleSearch = () => {
    // Implement search logic
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setCapturedImage(photo.uri);
      setWasteAnalyzerState('analyzing');
      setTimeout(() => {
        analyzeWasteImage(photo.uri);
      }, 2000);
    }
  };

  const analyzeWasteImage = (imageUri: string | null) => {
    const sampleRecommendations = [
      {
        id: 1,
        title: 'Organic Compost',
        description: 'Convert this plant waste into nutrient-rich compost.',
        icon: <MaterialCommunityIcons name="compost" size={24} color="#31b43e" />,
      },
      {
        id: 2,
        title: 'Biochar Production',
        description: 'Process into biochar to improve soil quality.',
        icon: <MaterialCommunityIcons name="sprout" size={24} color="#31b43e" />,
      },
      {
        id: 3,
        title: 'Animal Feed',
        description: 'This crop residue can be processed into animal feed.',
        icon: <MaterialCommunityIcons name="corn" size={24} color="#31b43e" />,
      },
    ];
    setRecommendations(sampleRecommendations);
    setWasteAnalyzerState('results');
  };

  const resetWasteAnalyzer = () => {
    setCapturedImage(null);
    setWasteAnalyzerState('camera');
  };

  if (hasPermission === false) {
    return <View style={styles.center}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>ILAVA</Text>
        <View style={styles.actionIcons}>
          <View style={styles.icon}>
            <FontAwesome name="heart" size={22} color="#31b43e" />
            {favoritesCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{favoritesCount}</Text></View>}
          </View>
          <View style={styles.icon}>
            <FontAwesome name="shopping-cart" size={22} color="#31b43e" />
            {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
          </View>
        </View>
      </View>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for agricultural waste products..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
          <FontAwesome name="microphone" size={18} color="#888" style={styles.micIcon} />
        </View>
        <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
          <FontAwesome name="bars" size={24} color="#31b43e" />
        </TouchableOpacity>
      </View>
      {/* Main content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryCarousel}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryIcon}>{category.icon}</View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.productsGrid}>
          {sampleProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>
                <View style={styles.productMeta}>
                  <Text style={styles.productType}>{product.wasteType}</Text>
                  <FontAwesome name="plus" size={18} color="#31b43e" style={styles.addToCartIcon} />
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.promotionBanner}>
          <Text style={styles.promotionTitle}>Turn Waste into Wealth!</Text>
          <Text style={styles.promotionDescription}>
            Learn how to convert your agricultural waste into valuable products
          </Text>
          <TouchableOpacity style={styles.promotionButton}>
            <Text style={styles.promotionButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <View style={[styles.navItem, styles.activeNavItem]}>
          <FontAwesome name="home" size={22} color="#31b43e" />
          <Text style={styles.navText}>Home</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="list" size={22} color="#31b43e" />
          <Text style={styles.navText}>Categories</Text>
        </View>
        <TouchableOpacity style={styles.navItem} onPress={() => setIsWasteAnalyzerOpen(true)}>
          <View style={styles.scanButton}>
            <FontAwesome name="qrcode" size={22} color="#fff" />
          </View>
          <Text style={styles.navText}>Scan Waste</Text>
        </TouchableOpacity>
        <View style={styles.navItem}>
          <FontAwesome name="shopping-cart" size={22} color="#31b43e" />
          <Text style={styles.navText}>Cart</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="user" size={22} color="#31b43e" />
          <Text style={styles.navText}>Profile</Text>
        </View>
      </View>
      {/* Waste Analyzer Modal */}
      <Modal visible={isWasteAnalyzerOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => { setIsWasteAnalyzerOpen(false); resetWasteAnalyzer(); }}>
              <FontAwesome name="times" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.wasteAnalyzerTitle}>
              {wasteAnalyzerState === 'camera' && 'Scan Agricultural Waste'}
              {wasteAnalyzerState === 'analyzing' && 'Analyzing Your Waste'}
              {wasteAnalyzerState === 'results' && 'Recommended Products'}
            </Text>
            {wasteAnalyzerState === 'camera' && hasPermission && (
              <Camera
                style={styles.camera}
                ref={cameraRef}
                type={Camera.Constants.Type.back}
                ratio="16:9"
              />
            )}
            {wasteAnalyzerState === 'camera' && (
              <TouchableOpacity style={styles.captureBtn} onPress={captureImage}>
                <View style={styles.innerCaptureBtn} />
              </TouchableOpacity>
            )}
            {wasteAnalyzerState === 'analyzing' && (
              <View style={styles.analyzingContainer}>
                {capturedImage && (
                  <Image source={{ uri: capturedImage }} style={styles.wasteImage} />
                )}
                <ActivityIndicator size="large" color="#31b43e" style={{ margin: 16 }} />
                <Text style={styles.loadingText}>Analyzing your agricultural waste...</Text>
              </View>
            )}
            {wasteAnalyzerState === 'results' && (
              <View style={styles.resultsContainer}>
                {capturedImage && (
                  <Image source={{ uri: capturedImage }} style={styles.wasteImage} />
                )}
                <Text style={styles.analysisTitle}>Recommended Products</Text>
                {recommendations.map((rec) => (
                  <View key={rec.id} style={styles.recommendationItem}>
                    {rec.icon}
                    <View style={styles.recommendationContent}>
                      <Text style={styles.recommendationTitle}>{rec.title}</Text>
                      <Text style={styles.recommendationDescription}>{rec.description}</Text>
                    </View>
                  </View>
                ))}
                <TouchableOpacity style={styles.tryAgainBtn} onPress={resetWasteAnalyzer}>
                  <Text style={styles.tryAgainBtnText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ...styles omitted for brevity, but will include all necessary styles for layout and appearance...
  // You can expand this section as needed for your app's look and feel.
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#f8f8f8' },
  brandName: { fontSize: 24, fontWeight: 'bold', color: '#31b43e' },
  actionIcons: { flexDirection: 'row' },
  icon: { marginLeft: 16 },
  badge: { position: 'absolute', top: -6, right: -10, backgroundColor: '#31b43e', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1 },
  badgeText: { color: '#fff', fontSize: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 8, paddingHorizontal: 8, marginRight: 8 },
  searchIcon: { marginRight: 4 },
  searchInput: { flex: 1, height: 40 },
  micIcon: { marginLeft: 4 },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  categoryCarousel: { flexDirection: 'row', marginBottom: 16 },
  categoryCard: { alignItems: 'center', marginRight: 16 },
  categoryIcon: { backgroundColor: '#e6f7ea', borderRadius: 24, padding: 12, marginBottom: 4 },
  categoryName: { fontSize: 14, color: '#333' },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { width: '48%', backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 16, padding: 8 },
  productImage: { height: 80, backgroundColor: '#e6f7ea', borderRadius: 8, marginBottom: 8 },
  productInfo: {},
  productName: { fontSize: 16, fontWeight: 'bold' },
  productPrice: { color: '#31b43e', fontWeight: 'bold', marginVertical: 2 },
  productMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  productType: { fontSize: 12, color: '#888' },
  addToCartIcon: { marginLeft: 8 },
  promotionBanner: { backgroundColor: '#e6f7ea', borderRadius: 12, padding: 16, alignItems: 'center', marginVertical: 16 },
  promotionTitle: { fontSize: 18, fontWeight: 'bold', color: '#31b43e' },
  promotionDescription: { color: '#333', marginVertical: 8, textAlign: 'center' },
  promotionButton: { backgroundColor: '#31b43e', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 8, marginTop: 8 },
  promotionButtonText: { color: '#fff', fontWeight: 'bold' },
  navbar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, backgroundColor: '#f8f8f8', borderTopWidth: 1, borderColor: '#eee' },
  navItem: { alignItems: 'center', flex: 1 },
  activeNavItem: { borderTopWidth: 2, borderColor: '#31b43e' },
  navText: { fontSize: 12, color: '#333' },
  scanButton: { backgroundColor: '#31b43e', borderRadius: 24, padding: 10, marginBottom: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center' },
  closeButton: { position: 'absolute', top: 12, right: 12, zIndex: 1 },
  wasteAnalyzerTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  camera: { width: 250, height: 350, borderRadius: 12, marginBottom: 16 },
  captureBtn: { backgroundColor: '#fff', borderRadius: 32, padding: 8, alignItems: 'center', marginTop: 8 },
  innerCaptureBtn: { width: 40, height: 40, backgroundColor: '#31b43e', borderRadius: 20 },
  analyzingContainer: { alignItems: 'center' },
  wasteImage: { width: 120, height: 120, borderRadius: 12, marginBottom: 12 },
  loadingText: { color: '#333', marginTop: 8 },
  resultsContainer: { alignItems: 'center' },
  analysisTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  recommendationItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  recommendationContent: { marginLeft: 12 },
  recommendationTitle: { fontWeight: 'bold', fontSize: 15 },
  recommendationDescription: { color: '#333', fontSize: 13 },
  tryAgainBtn: { backgroundColor: '#31b43e', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 8, marginTop: 12 },
  tryAgainBtnText: { color: '#fff', fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
