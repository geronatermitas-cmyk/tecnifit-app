import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ResultsScreen() {
  const route = useRoute();
  const { q = '' } = route.params || {};
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.h1}>Resultados</Text>
      <Text style={styles.p}>Búsqueda: <Text style={{ fontWeight: '900' }}>{q || '(vacía)'}</Text></Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resultado 1</Text>
        <Text style={styles.cardText}>Descripción del resultado</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resultado 2</Text>
        <Text style={styles.cardText}>Descripción del resultado</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  h1: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginBottom: 8 },
  p: { color: '#64748B', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontWeight: '900', color: '#0F172A', marginBottom: 4 },
  cardText: { color: '#64748B' },
});
