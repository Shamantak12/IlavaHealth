import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProductDetailScreen({ navigation, route }: any) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${product.name} (${quantity}kg) added to your cart for ₹${product.price * quantity}`,
      [{ text: 'OK' }]
    );
  };

  const buyNow = () => {
    Alert.alert(
      'Order Confirmed',
      `Your order for ${product.name} (${quantity}kg) has been placed. Total: ₹${product.price * quantity}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.favoriteButton}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "#E91E63" : "#333"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          
          <View style={styles.priceSection}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.unit}>/{product.unit}</Text>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="account" size={20} color="#666" />
              <Text style={styles.detailText}>Farmer: {product.farmer}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
              <Text style={styles.detailText}>Distance: {product.distance}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.detailText}>Rating: {product.rating}/5</Text>
            </View>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color="#4CAF50" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity} kg</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <MaterialCommunityIcons name="cart-plus" size={20} color="#4CAF50" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
          <Text style={styles.buyNowText}>Buy Now - ₹{product.price * quantity}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  unit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  quantitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 24,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#fff',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 2,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
