import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MyOrdersScreen() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="assignment" size={48} color="#31b43e" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>My Orders</Text>
      <Text style={styles.text}>Your orders will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#31b43e', marginBottom: 8 },
  text: { fontSize: 16, color: '#333', textAlign: 'center' },
});
