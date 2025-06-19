import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SellWasteScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [scannedResult, setScannedResult] = useState<any>(null);
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const cameraRef = useRef<any>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo taken:', photo);
      setIsCameraVisible(false);
      
      // Simulate AI analysis result
      const aiResult = {
        wasteType: 'Rice Husk',
        confidence: 92,
        suggestedPrice: 25,
        quality: 'High',
        marketDemand: 'High',
        buyers: 12,
        description: 'Premium quality rice husk suitable for compost production',
        category: 'Agricultural Waste',
        image: photo.uri
      };
      
      setScannedResult(aiResult);
      Alert.alert(
        'AI Analysis Complete!', 
        `Detected: ${aiResult.wasteType}\nConfidence: ${aiResult.confidence}%\nSuggested Price: ₹${aiResult.suggestedPrice}/kg`,
        [{ text: 'OK' }]
      );
    }
  };
  const wasteCategories = [
    { id: 'rice', name: 'Rice Waste', icon: 'grain', color: '#8BC34A', avgPrice: '₹20-30/kg' },
    { id: 'wheat', name: 'Wheat Waste', icon: 'grain', color: '#FF9800', avgPrice: '₹15-25/kg' },
    { id: 'sugarcane', name: 'Sugarcane Bagasse', icon: 'candycane', color: '#4CAF50', avgPrice: '₹18-28/kg' },
    { id: 'coconut', name: 'Coconut Coir', icon: 'palm-tree', color: '#795548', avgPrice: '₹35-45/kg' },
    { id: 'cotton', name: 'Cotton Waste', icon: 'tshirt-crew', color: '#607D8B', avgPrice: '₹12-20/kg' },
    { id: 'organic', name: 'Organic Compost', icon: 'leaf', color: '#4CAF50', avgPrice: '₹25-40/kg' },
  ];

  const aiFeatures = [
    { icon: 'brain', title: 'AI Identification', desc: 'Accurately identify waste type' },
    { icon: 'trending-up', title: 'Price Optimization', desc: 'Get best market pricing' },
    { icon: 'quality-high', title: 'Quality Assessment', desc: 'Analyze waste quality grade' },
    { icon: 'account-group', title: 'Buyer Matching', desc: 'Find interested buyers nearby' },
  ];

  const handleListProduct = () => {
    if (!scannedResult || !quantity) {
      Alert.alert('Missing Information', 'Please scan waste and enter quantity first.');
      return;
    }

    Alert.alert(
      'Product Listed Successfully!',
      `Your ${scannedResult.wasteType} (${quantity}kg) has been listed for ₹${scannedResult.suggestedPrice * parseInt(quantity)}`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (isCameraVisible) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsCameraVisible(false)}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.scanFrame}>
              <Text style={styles.scanText}>Position waste material in the frame</Text>
            </View>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Waste Scanner</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Scan Result */}
        {scannedResult && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scan Result</Text>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
                <Text style={styles.resultTitle}>{scannedResult.wasteType}</Text>
                <Text style={styles.confidenceText}>{scannedResult.confidence}% confidence</Text>
              </View>
              
              <View style={styles.resultDetails}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Quality:</Text>
                  <Text style={styles.resultValue}>{scannedResult.quality}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Market Demand:</Text>
                  <Text style={styles.resultValue}>{scannedResult.marketDemand}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Interested Buyers:</Text>
                  <Text style={styles.resultValue}>{scannedResult.buyers} nearby</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Suggested Price:</Text>
                  <Text style={[styles.resultValue, styles.priceText]}>₹{scannedResult.suggestedPrice}/kg</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Scan Button */}
        {!scannedResult && (
          <View style={styles.section}>
            <TouchableOpacity style={styles.scanButton} onPress={() => setIsCameraVisible(true)}>
              <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.scanButtonGradient}>
                <MaterialCommunityIcons name="camera-outline" size={48} color="#fff" />
                <Text style={styles.scanButtonText}>Scan Agricultural Waste</Text>
                <Text style={styles.scanButtonSubtext}>AI-powered identification & pricing</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Product Form */}
        {scannedResult && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Quantity (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Enter quantity in kg"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Additional Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Any additional details about the waste..."
                  multiline
                  numberOfLines={3}
                />
              </View>

              <TouchableOpacity style={styles.listButton} onPress={handleListProduct}>
                <Text style={styles.listButtonText}>List Product for Sale</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Waste Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Waste Categories</Text>
          <View style={styles.categoriesGrid}>
            {wasteCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <MaterialCommunityIcons name={category.icon as any} size={24} color="#fff" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryPrice}>{category.avgPrice}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Features</Text>
          <View style={styles.featuresGrid}>
            {aiFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <MaterialCommunityIcons name={feature.icon as any} size={32} color="#4CAF50" />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginRight: 32,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  scanButton: {
    marginHorizontal: 20,
  },
  scanButtonGradient: {
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  scanButtonSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  confidenceText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  resultDetails: {
    gap: 8,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  priceText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  listButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  listButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryPrice: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  scanFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  scanText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});
