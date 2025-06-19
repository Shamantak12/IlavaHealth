import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Connect with Local Farmers',
    description: 'Discover fresh, organic produce directly from local farmers in your area',
    icon: 'greenhouse',
    backgroundColor: '#4CAF50',
    secondaryColor: '#66BB6A',
  },
  {
    id: 2,
    title: 'AI-Powered Waste Detection',
    description: 'Use our advanced AI to identify and sell agricultural waste efficiently',
    icon: 'robot',
    backgroundColor: '#2196F3',
    secondaryColor: '#42A5F5',
  },
  {
    id: 3,
    title: 'Sustainable Agriculture',
    description: 'Join the movement towards sustainable farming and reduce agricultural waste',
    icon: 'earth',
    backgroundColor: '#FF9800',
    secondaryColor: '#FFA726',
  },
  {
    id: 4,
    title: 'Secure Marketplace',
    description: 'Trade safely with verified farmers and buyers in our trusted ecosystem',
    icon: 'shield-check',
    backgroundColor: '#9C27B0',
    secondaryColor: '#BA68C8',
  },
];

interface OnboardingScreenProps {
  navigation: any;
  onComplete: (userType: string) => void;
}

export default function OnboardingScreen({ navigation, onComplete }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setShowUserTypeSelection(true);
    }
  };

  const renderOnboardingItem = ({ item }: { item: typeof onboardingData[0] }) => (
    <View style={[styles.slide, { width }]}>
      <LinearGradient
        colors={[item.backgroundColor, item.secondaryColor]}
        style={styles.gradientContainer}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name={item.icon as any} 
            size={120} 
            color="#fff" 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const Pagination = () => (
    <View style={styles.pagination}>
      {onboardingData.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      
      {!showUserTypeSelection ? (
        <>
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={() => setShowUserTypeSelection(true)}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <Animated.FlatList
            ref={slidesRef}
            data={onboardingData}
            renderItem={renderOnboardingItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          />
          
          <View style={styles.bottomContainer}>
            <Pagination />
            <TouchableOpacity style={styles.nextButton} onPress={scrollTo}>
              <Text style={styles.nextButtonText}>
                {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              </Text>
              <MaterialCommunityIcons 
                name={currentIndex === onboardingData.length - 1 ? 'rocket-launch' : 'arrow-right'} 
                size={20} 
                color="#4CAF50" 
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.userTypeContainer}>
          <View style={styles.userTypeContent}>
            <MaterialCommunityIcons name="account-multiple" size={80} color="#fff" />
            <Text style={styles.userTypeTitle}>Choose Your Role</Text>
            <Text style={styles.userTypeSubtitle}>
              Select how you'd like to use IlavaHealth
            </Text>
            
            <View style={styles.userTypeButtons}>
              <TouchableOpacity 
                style={styles.userTypeButton}
                onPress={() => onComplete('farmer')}
              >
                <MaterialCommunityIcons name="greenhouse" size={40} color="#4CAF50" />
                <Text style={styles.userTypeButtonText}>I'm a Farmer</Text>
                <Text style={styles.userTypeButtonSubtext}>Sell produce & waste</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.userTypeButton}
                onPress={() => onComplete('buyer')}
              >
                <MaterialCommunityIcons name="shopping" size={40} color="#4CAF50" />
                <Text style={styles.userTypeButtonText}>I'm a Buyer</Text>
                <Text style={styles.userTypeButtonSubtext}>Buy fresh produce</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  slide: {
    height,
  },
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 60,
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'System',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.95,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  userTypeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTypeContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  userTypeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  userTypeSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 50,
  },
  userTypeButtons: {
    width: '100%',
  },
  userTypeButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  userTypeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  userTypeButtonSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
