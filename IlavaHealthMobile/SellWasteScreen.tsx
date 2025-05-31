import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SellWasteScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="recycle" size={48} color="#31b43e" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>Sell Your Waste</Text>
      <Text style={styles.text}>List your agricultural waste for sale here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#31b43e', marginBottom: 8 },
  text: { fontSize: 16, color: '#333', textAlign: 'center' },
});
