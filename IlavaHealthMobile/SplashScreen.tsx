import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Placeholder logo (replace with your own asset if needed)
const logo = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';

export default function SplashScreen({ onUserTypeSelect, navigation }) {
  const [showButtons, setShowButtons] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkFirstTime();
    startAnimations();
  }, []);

  const checkFirstTime = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      setIsFirstTime(!hasSeenOnboarding);
    } catch (error) {
      console.log('Error checking first time:', error);
    }
  };

  const startAnimations = () => {
    // Logo rotation animation
    Animated.loop(
      Animated.timing(logoRotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Slide up animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Show buttons after delay
    const timer = setTimeout(() => setShowButtons(true), 1500);
    return () => clearTimeout(timer);
  };  const handleUserTypeSelect = async (type: string) => {
    console.log('Button pressed with type:', type);
    try {
      if (isFirstTime) {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
        // For first-time users, still proceed with user type selection
        console.log('Calling onUserTypeSelect for first time user');
        onUserTypeSelect && onUserTypeSelect(type);
      } else {
        // For returning users, proceed directly
        console.log('Calling onUserTypeSelect for returning user');
        onUserTypeSelect && onUserTypeSelect(type);
      }
    } catch (error) {
      console.log('Error in handleUserTypeSelect:', error);
      // Fallback to proceeding with user type selection
      onUserTypeSelect && onUserTypeSelect(type);
    }
  };

  const logoRotate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <LinearGradient colors={['#4CAF50', '#66BB6A', '#81C784']} style={styles.splashContainer}>
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Animated.View style={[styles.logoWrapper, { transform: [{ rotate: logoRotate }] }]}>
          <MaterialCommunityIcons name="leaf" size={80} color="#fff" />
        </Animated.View>
        <Text style={styles.title}>ILAVA HEALTH</Text>
        <Text style={styles.subtitle}>Creating wealth from agricultural waste</Text>
        <Text style={styles.tagline}>🌱 Sustainable • Smart • Profitable</Text>
      </Animated.View>
      
      {showButtons && (
        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.userTypeButton, styles.farmerButton]} 
            onPress={() => handleUserTypeSelect('farmer')}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#2E7D32', '#388E3C']} style={styles.buttonGradient}>
              <FontAwesome5 name="seedling" size={24} color="#fff" style={styles.buttonIcon} />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>I'm a Farmer</Text>
                <Text style={styles.buttonSubtext}>Sell your produce</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.userTypeButton, styles.buyerButton]} 
            onPress={() => handleUserTypeSelect('buyer')}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#1976D2', '#2196F3']} style={styles.buttonGradient}>
              <FontAwesome name="shopping-basket" size={24} color="#fff" style={styles.buttonIcon} />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>I'm a Buyer</Text>
                <Text style={styles.buttonSubtext}>Buy fresh produce</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="robot" size={20} color="#fff" />
              <Text style={styles.featureText}>AI-Powered</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="shield-check" size={20} color="#fff" />
              <Text style={styles.featureText}>Secure</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="earth" size={20} color="#fff" />
              <Text style={styles.featureText}>Sustainable</Text>
            </View>
          </View>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  splashContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 60,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: { 
    width: 80, 
    height: 80, 
    marginBottom: 12 
  },
  title: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: { 
    fontSize: 18, 
    color: '#fff', 
    marginBottom: 8, 
    textAlign: 'center',
    opacity: 0.9,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  buttonContainer: { 
    width: '100%', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userTypeButton: { 
    borderRadius: 15, 
    marginVertical: 10, 
    width: '100%',
    maxWidth: 300,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  farmerButton: { 
    backgroundColor: '#31b43e' 
  },
  buyerButton: { 
    backgroundColor: '#2d8cff' 
  },
  buttonIcon: { 
    marginRight: 15 
  },
  buttonTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18,
    marginBottom: 2,
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },  featureText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.8,
  },
});
