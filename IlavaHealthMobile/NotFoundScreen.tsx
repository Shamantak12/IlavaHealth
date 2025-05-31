import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={48} color="#e53935" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>404 - Not Found</Text>
      <Text style={styles.text}>Sorry, the page you are looking for does not exist.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#e53935', marginBottom: 8 },
  text: { fontSize: 16, color: '#333', textAlign: 'center' },
});
