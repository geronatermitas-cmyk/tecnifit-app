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
<<<<<<< HEAD
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC', 
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  hi: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: '#0F172A',
  },
  planText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 4,
  },
  quotaCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quotaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  quotaCount: {
    fontSize: 48,
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: 8,
  },
  quotaSubtext: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 0,
  },
  searchSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 15,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  navIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  navTextContainer: {
    flex: 1,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  navSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  navArrow: {
    fontSize: 24,
    color: '#94A3B8',
    marginLeft: 10,
  },
});
=======
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
>>>>>>> backup/2025-11-10-master
