import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Camera, CameraType } from 'react-native-camera';
import { analyzeWasteImage as analyzeImage, WasteAnalysisResult } from '../services/openai';

type ScanWasteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScanWaste'
>;

interface Props {
  navigation: ScanWasteScreenNavigationProp;
}

// Waste analysis states
enum AnalysisState {
  CAMERA = 'camera',
  ANALYZING = 'analyzing',
  RESULTS = 'results',
}

// Sample recommendation type
interface Recommendation {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

const ScanWasteScreen: React.FC<Props> = ({ navigation }) => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>(
    AnalysisState.CAMERA,
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [wasteType, setWasteType] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const cameraRef = useRef<Camera>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.85, base64: true };
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        setCapturedImage(data.uri);
        setAnalysisState(AnalysisState.ANALYZING);
        
        // Process the image for analysis
        setTimeout(() => {
          processWasteImage(data.base64 || '');
        }, 2000);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert(
          'Camera Error',
          'There was a problem capturing the image. Please try again.',
          [{ text: 'OK' }]
        );
        setAnalysisState(AnalysisState.CAMERA);
      }
    }
  };

  const processWasteImage = async (base64Image: string) => {
    try {
      // If we have an API key, we'd call the real service
      // For now, using mock implementation in the service
      const result = await analyzeImage(base64Image);
      setWasteType(result.wasteType);
      setRecommendations(result.recommendations);
      setAnalysisState(AnalysisState.RESULTS);
    } catch (error) {
      console.error('Error analyzing image:', error);
      Alert.alert(
        'Analysis Error',
        'Failed to analyze the waste image. Please try again.',
        [{ text: 'OK' }]
      );
      setAnalysisState(AnalysisState.CAMERA);
    }
  };

  const resetAnalysis = () => {
    setCapturedImage(null);
    setAnalysisState(AnalysisState.CAMERA);
  };

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.back}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={styles.captureBtnContainer}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
          <View style={styles.innerCaptureBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAnalyzing = () => (
    <View style={styles.analyzerResults}>
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={styles.wasteImage} />
      )}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#31b43e" />
        <Text style={styles.loadingText}>
          Analyzing your agricultural waste...
        </Text>
      </View>
    </View>
  );

  const renderResults = () => (
    <ScrollView
      contentContainerStyle={styles.analyzerResults}
      showsVerticalScrollIndicator={false}>
      {capturedImage && (
        <Image source={{ uri: capturedImage }} style={styles.wasteImage} />
      )}
      <Text style={styles.analysisTitle}>Recommended Products</Text>
      {recommendations.map((rec) => (
        <View key={rec.id} style={styles.recommendationItem}>
          <MaterialIcon
            name={rec.iconName}
            size={30}
            color="#31b43e"
            style={styles.recommendationIcon}
          />
          <View style={styles.recommendationContent}>
            <Text style={styles.recommendationTitle}>{rec.title}</Text>
            <Text style={styles.recommendationDescription}>
              {rec.description}
            </Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.tryAgainBtn} onPress={resetAnalysis}>
        <Text style={styles.tryAgainBtnText}>Scan Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const getTitle = () => {
    switch (analysisState) {
      case AnalysisState.CAMERA:
        return 'Scan Agricultural Waste';
      case AnalysisState.ANALYZING:
        return 'Analyzing Your Waste';
      case AnalysisState.RESULTS:
        return 'Recommended Products';
      default:
        return 'Scan Waste';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{getTitle()}</Text>
        <View style={{ width: 22 }} /> {/* Spacer for centered title */}
      </View>

      {/* Main content based on state */}
      {analysisState === AnalysisState.CAMERA && renderCamera()}
      {analysisState === AnalysisState.ANALYZING && renderAnalyzing()}
      {analysisState === AnalysisState.RESULTS && renderResults()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  captureBtnContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCaptureBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  analyzerResults: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  wasteImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  wasteTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(49, 180, 62, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  wasteTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  wasteTypeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#31b43e',
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  recommendationItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  recommendationIcon: {
    marginRight: 15,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666',
  },
  addToCartBtn: {
    backgroundColor: '#31b43e',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  tryAgainBtn: {
    backgroundColor: '#31b43e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  tryAgainBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScanWasteScreen;