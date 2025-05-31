import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Compost', icon: 'compost' },
  { id: 2, name: 'Plant Waste', icon: 'sprout' },
  { id: 3, name: 'Crop Residue', icon: 'corn' },
  { id: 4, name: 'Fruit Waste', icon: 'fruit-cherries' },
  { id: 5, name: 'Organic Waste', icon: 'leaf' },
  { id: 6, name: 'Bio Fertilizer', icon: 'nature' },
  { id: 7, name: 'Recycled', icon: 'recycle' },
];

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {categories.map((cat) => (
        <View key={cat.id} style={styles.categoryRow}>
          <MaterialCommunityIcons name={cat.icon} size={28} color="#31b43e" style={{ marginRight: 12 }} />
          <Text style={styles.categoryName}>{cat.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#31b43e', marginBottom: 16 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  categoryName: { fontSize: 18, color: '#333' },
});
