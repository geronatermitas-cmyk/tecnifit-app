// screens/HistoryScreen.js
// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useIntake } from '../store/IntakeStore';
import { useNavigation } from '@react-navigation/native';

export default function HistoryScreen() {
  const { history } = useIntake();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Historial</Text>
      <FlatList
        data={history}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Text style={{ color: '#64748B' }}>No hay historial aún.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Results', { taskId: item.id })}>
            <Text style={{ fontWeight: '800' }}>{item.id}</Text>
            <Text style={{ color: '#64748B' }}>{new Date(item.createdAt).toLocaleString()}</Text>
            <Text style={{ color: '#334155' }}>{item.items.length} elementos</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
<<<<<<< HEAD

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
});
=======
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  card: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 10, marginBottom: 8 },
});
>>>>>>> backup/2025-11-10-master
