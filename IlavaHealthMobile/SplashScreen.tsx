import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

// Placeholder logo (replace with your own asset if needed)
const logo = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';

export default function SplashScreen({ onUserTypeSelect }) {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: logo }} style={styles.logo} />
        <Text style={styles.title}>ILAVA</Text>
        <Text style={styles.subtitle}>Creating wealth from agricultural waste</Text>
      </View>
      {showButtons && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.userTypeButton, styles.farmerButton]} onPress={() => onUserTypeSelect && onUserTypeSelect('farmer')}>
            <FontAwesome5 name="leaf" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>I'm a Farmer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.userTypeButton, styles.buyerButton]} onPress={() => onUserTypeSelect && onUserTypeSelect('buyer')}>
            <FontAwesome name="shopping-basket" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>I'm a Buyer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logo: { width: 80, height: 80, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#31b43e', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 16, textAlign: 'center' },
  buttonContainer: { width: '100%', alignItems: 'center' },
  userTypeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 32, marginVertical: 8, width: 220 },
  farmerButton: { backgroundColor: '#31b43e' },
  buyerButton: { backgroundColor: '#2d8cff' },
  buttonIcon: { marginRight: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
