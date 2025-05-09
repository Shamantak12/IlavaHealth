import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const [showButtons, setShowButtons] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Show user type buttons after animation
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  const handleUserTypeSelection = (userType: 'farmer' | 'buyer') => {
    // Navigate to login page with user type
    navigation.navigate('Login', { userType });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        <Image
          source={require('../assets/ilava-logo.svg')}
          style={styles.logo}
        />
        <Text style={styles.title}>ILAVA</Text>
        <Text style={styles.subtitle}>Creating wealth from agricultural waste</Text>
      </Animated.View>

      {showButtons && (
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <TouchableOpacity
            style={[styles.userTypeButton, styles.farmerButton]}
            onPress={() => handleUserTypeSelection('farmer')}>
            <Icon name="leaf" size={28} color="#333" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>I'm a Farmer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.userTypeButton, styles.buyerButton]}
            onPress={() => handleUserTypeSelection('buyer')}>
            <Icon name="shopping-basket" size={28} color="#333" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>I'm a Buyer</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(234, 231, 31, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: '#31b43e',
    fontWeight: '700',
    fontSize: 60,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
    maxWidth: '80%',
  },
  buttonContainer: {
    marginTop: 50,
    width: '90%',
    maxWidth: 400,
  },
  userTypeButton: {
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  farmerButton: {
    borderLeftWidth: 8,
    borderLeftColor: '#31b43e',
  },
  buyerButton: {
    borderLeftWidth: 8,
    borderLeftColor: '#eae71f',
  },
  buttonIcon: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default SplashScreen;