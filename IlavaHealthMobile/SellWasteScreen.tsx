import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function SellWasteScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
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
      Alert.alert('Photo Captured', 'AI analysis will be performed to identify waste type and suggest pricing.');
    }
  };

  const aiFeatures = [
    'Identify waste type with high accuracy',
    'Suggest optimal pricing based on market data',
    'Assess quality and provide recommendations',
    'Match with potential buyers automatically'
  ];

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
      <View style={styles.cameraContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsCameraVisible(false)}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.cameraTitle}>Scan Your Agricultural Waste</Text>
        </View>
        
        <CameraView 
          style={styles.camera} 
          ref={cameraRef}
          facing="back"
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.scanArea}>
              <View style={styles.scanCorner} />
              <View style={[styles.scanCorner, styles.topRight]} />
              <View style={[styles.scanCorner, styles.bottomLeft]} />
              <View style={[styles.scanCorner, styles.bottomRight]} />
            </View>
          </View>
        </CameraView>

        <View style={styles.cameraBottom}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="camera" size={24} color="#fff" />
            <Text style={styles.captureText}>Capture Image</Text>
          </TouchableOpacity>
          <Text style={styles.instructionText}>Position your agricultural waste in the camera frame</Text>
          <Text style={styles.instructionSubtext}>Our AI will identify the type and suggest pricing</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Sell Your Waste</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.scanSection}>
          <Ionicons name="camera-outline" size={32} color="#333" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Scan Your Agricultural Waste</Text>
          
          <View style={styles.scanPreview}>
            <View style={styles.scanPlaceholder}>
              <View style={styles.dottedBorder}>
                <Ionicons name="camera-outline" size={48} color="#999" />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={() => setIsCameraVisible(true)}
          >
            <Ionicons name="camera" size={24} color="#fff" />
            <Text style={styles.captureText}>Capture Image</Text>
          </TouchableOpacity>

          <Text style={styles.instructionText}>Position your agricultural waste in the camera frame</Text>
          <Text style={styles.instructionSubtext}>Our AI will identify the type and suggest pricing</Text>
        </View>

        <View style={styles.aiSection}>
          <View style={styles.aiHeader}>
            <Ionicons name="flash" size={24} color="#2196F3" />
            <Text style={styles.aiTitle}>AI-Powered Analysis</Text>
          </View>
          <Text style={styles.aiSubtitle}>Our advanced machine learning models will:</Text>
          
          {aiFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
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
  scanSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionIcon: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  scanPreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  scanPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  dottedBorder: {
    width: '80%',
    height: '80%',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  captureText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  instructionSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  aiSection: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    marginLeft: 8,
  },
  aiSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#2196F3',
    marginRight: 8,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
  // Camera styles
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fff',
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    top: 'auto',
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  cameraBottom: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    alignItems: 'center',
  },
});
