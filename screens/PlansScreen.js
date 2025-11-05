// screens/PlansScreen.js
// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlansScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Planes</Text>
      <Text style={{ color: '#64748B' }}>Aquí más adelante mostraremos FREE / PRO / COLAB con detalles.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
});