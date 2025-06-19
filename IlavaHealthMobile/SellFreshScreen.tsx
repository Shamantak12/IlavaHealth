import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SellFreshScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('vegetables');
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    unit: 'kg',
    location: 'Bangalore, Karnataka'
  });

  const categories = [
    { id: 'vegetables', name: 'Vegetables', icon: 'carrot', color: '#4CAF50' },
    { id: 'fruits', name: 'Fruits', icon: 'fruit-grapes', color: '#FF9800' },
    { id: 'grains', name: 'Grains', icon: 'grain', color: '#795548' },
    { id: 'herbs', name: 'Herbs', icon: 'leaf', color: '#8BC34A' },
    { id: 'dairy', name: 'Dairy', icon: 'cow', color: '#2196F3' },
  ];

  const units = ['kg', 'grams', 'liters', 'pieces', 'bunches', 'dozens'];

  const freshProducts = [
    { name: 'Tomatoes', price: '45/kg', category: 'vegetables', demand: 'High' },
    { name: 'Carrots', price: '35/kg', category: 'vegetables', demand: 'Medium' },
    { name: 'Spinach', price: '40/kg', category: 'vegetables', demand: 'High' },
    { name: 'Mangoes', price: '120/kg', category: 'fruits', demand: 'Very High' },
    { name: 'Bananas', price: '30/dozen', category: 'fruits', demand: 'High' },
    { name: 'Rice', price: '60/kg', category: 'grains', demand: 'Medium' },
  ];

  const handleSubmitProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.quantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Product Listed Successfully!',
      `${productForm.name} has been added to your listings.`,
      [
        { text: 'Add Another', onPress: () => setProductForm({
          name: '', description: '', price: '', quantity: '', unit: 'kg', location: 'Bangalore, Karnataka'
        })},
        { text: 'View Listings', onPress: () => navigation.navigate('Inventory') }
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#2C3E50" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Sell Fresh Products</Text>
      <TouchableOpacity onPress={() => Alert.alert('Help', 'Tips for selling fresh products:\n\n• Use high-quality photos\n• Set competitive prices\n• Describe freshness and quality\n• Update inventory regularly')}>
        <Ionicons name="help-circle-outline" size={24} color="#2C3E50" />
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Select Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              selectedCategory === category.id && { backgroundColor: category.color }
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
              selectedCategory === category.id && { color: '#FFFFFF' }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Product Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Product Name *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Fresh Organic Tomatoes"
          value={productForm.name}
          onChangeText={(text) => setProductForm({ ...productForm, name: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Describe quality, farming method, etc."
          value={productForm.description}
          onChangeText={(text) => setProductForm({ ...productForm, description: text })}
          multiline={true}
          numberOfLines={3}
        />
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.inputLabel}>Price *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="₹ per unit"
            value={productForm.price}
            onChangeText={(text) => setProductForm({ ...productForm, price: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <Text style={styles.inputLabel}>Unit</Text>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => {
              Alert.alert(
                'Select Unit',
                '',
                units.map(unit => ({
                  text: unit,
                  onPress: () => setProductForm({ ...productForm, unit })
                }))
              );
            }}
          >
            <Text style={styles.pickerText}>{productForm.unit}</Text>
            <Ionicons name="chevron-down" size={20} color="#95A5A6" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Available Quantity *</Text>
        <TextInput
          style={styles.textInput}
          placeholder={`Enter quantity in ${productForm.unit}`}
          value={productForm.quantity}
          onChangeText={(text) => setProductForm({ ...productForm, quantity: text })}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Location</Text>
        <TouchableOpacity style={styles.locationInput}>
          <Ionicons name="location-outline" size={20} color="#3498DB" />
          <Text style={styles.locationText}>{productForm.location}</Text>
          <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTrendingProducts = () => (
    <View style={styles.trendingContainer}>
      <Text style={styles.sectionTitle}>Trending in Your Area</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {freshProducts
          .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
          .map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.trendingCard}
              onPress={() => setProductForm({ ...productForm, name: product.name })}
            >
              <Text style={styles.trendingName}>{product.name}</Text>
              <Text style={styles.trendingPrice}>₹{product.price}</Text>
              <View style={[styles.demandBadge, {
                backgroundColor: product.demand === 'Very High' ? '#E74C3C' :
                                product.demand === 'High' ? '#F39C12' : '#95A5A6'
              }]}>
                <Text style={styles.demandText}>{product.demand} Demand</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );

  const renderSubmitButton = () => (
    <View style={styles.submitContainer}>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitProduct}>
        <LinearGradient
          colors={['#4CAF50', '#45A049']}
          style={styles.submitGradient}
        >
          <MaterialCommunityIcons name="check-circle" size={24} color="#FFFFFF" />
          <Text style={styles.submitText}>List Product</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCategories()}
        {renderProductForm()}
        {renderTrendingProducts()}
        {renderSubmitButton()}
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
  categoriesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
  },
  categoryCard: {
    alignItems: 'center',
    padding: 15,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
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
    color: '#2C3E50',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  pickerText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  locationInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECF0F1',
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 10,
  },
  trendingContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  trendingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    minWidth: 120,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 8,
  },
  demandBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  demandText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  submitButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  submitGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
