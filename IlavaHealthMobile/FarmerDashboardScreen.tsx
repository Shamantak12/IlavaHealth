import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function FarmerDashboardScreen() {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="tractor" size={48} color="#31b43e" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>Farmer Dashboard</Text>
      <Text style={styles.text}>Welcome! Manage your waste and products here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#31b43e', marginBottom: 8 },
  text: { fontSize: 16, color: '#333', textAlign: 'center' },
});
