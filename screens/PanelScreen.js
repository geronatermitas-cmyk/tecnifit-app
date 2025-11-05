// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';
import { useIntake } from '../store/IntakeStore';

export default function PanelScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { items = [] } = useIntake?.() || {};

  const onGenerateTask = () => {
    // Coincidencias sin IA (búsqueda en catálogo/demo)
    navigation.navigate('Results', { mode: 'match', from: 'panel' });
  };

  const onGoToReview = () => {
    // Constructor de tarea (antes llamado “Ir a Revisión”)
    navigation.navigate('TaskBuilder');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hi}>Hola{user?.name ? `, ${user.name}` : ''}</Text>
      <Text style={styles.quota}>Cuota: 0/3</Text>

      {/* … aquí tus inputs de añadir búsqueda, foto, código … */}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnGhost} onPress={onGenerateTask}>
          <Text style={styles.btnGhostTxt}>Genera tarea</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPrimary} onPress={onGoToReview}>
          <Text style={styles.btnPrimaryTxt}>Ir a Revisión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  hi: { fontSize: 28, fontWeight: '900', color: '#0F172A' },
  quota: { color: '#64748B', marginBottom: 16 },
  footer: { flexDirection: 'row', gap: 12, paddingTop: 8 },
  btnGhost: {
    flex: 1, borderWidth: 1, borderColor: '#CBD5E1',
    borderRadius: 14, alignItems: 'center', paddingVertical: 14, backgroundColor: '#FFF',
  },
  btnGhostTxt: { fontWeight: '800', color: '#0F172A' },
  btnPrimary: {
    flex: 1, backgroundColor: '#2563EB',
    borderRadius: 14, alignItems: 'center', paddingVertical: 14,
  },
  btnPrimaryTxt: { color: '#fff', fontWeight: '800' },
});