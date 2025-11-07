import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../store/AuthStore';
import { useIntake } from '../store/IntakeStore';
import { usePlan } from '../store/PlanStore';

export default function PanelScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { isFree } = usePlan();
  const { items = [] } = (typeof useIntake === 'function' ? useIntake() : { items: [] });
  const [activeTab, setActiveTab] = useState('search');
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');

  const onGenerateList = () => {
    const query = (q || '').trim();
    setSearchOpen(false);
    navigation.navigate('Results', { mode: 'match', q: query, from: 'panel' });
  };

  const onGenerateTask = () => {
    navigation.navigate('TaskBuilder');
  };

  return (
    <View style={[styles.container, { paddingBottom: 78 + insets.bottom }]}>
      <Text style={styles.hi}>Hola{user?.name ? `, ${user.name}` : ''}</Text>
      <Text style={styles.quota}>Cuota: 0/3</Text>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('search')} style={[styles.tab, activeTab === 'search' && styles.tabActive]}>
          <Text style={[styles.tabTxt, activeTab === 'search' && styles.tabTxtActive]}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Búsqueda</Text>
        <Text style={styles.subtle}>Toca "Buscar" para abrir el bocadillo y generar lista.</Text>
      </View>
      <View style={[styles.bottomBar, { bottom: 16 + insets.bottom }]}>
        <TouchableOpacity style={[styles.btnGhost, { marginRight: 10 }]} onPress={() => setSearchOpen(true)}>
          <Text style={styles.btnGhostTxt}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={onGenerateTask}>
          <Text style={styles.btnPrimaryTxt}>Genera tarea</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={searchOpen} transparent animationType="fade" onRequestClose={() => setSearchOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Generar lista</Text>
            <TextInput value={q} onChangeText={setQ} placeholder='Describe tu tarea, p. ej. "cambiar rueda"' style={styles.input} returnKeyType="search" onSubmitEditing={onGenerateList} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={() => setSearchOpen(false)}>
                <Text style={[styles.btnTxt, styles.btnGhostTxt]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onGenerateList}>
                <Text style={styles.btnTxt}>Generar lista</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  hi: { fontSize: 28, fontWeight: '900', color: '#0F172A' },
  quota: { color: '#64748B', marginBottom: 16 },
  tabs: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  tab: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, backgroundColor: '#E5E7EB' },
  tabActive: { backgroundColor: '#2563EB' },
  tabTxt: { fontWeight: '800', color: '#334155' },
  tabTxtActive: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginBottom: 6 },
  subtle: { color: '#64748B' },
  bottomBar: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', alignItems: 'center' },
  btnGhost: { flex: 1, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 14, alignItems: 'center', paddingVertical: 14, backgroundColor: '#FFF' },
  btnGhostTxt: { fontWeight: '800', color: '#0F172A' },
  btnPrimary: { flex: 1, backgroundColor: '#2563EB', borderRadius: 14, alignItems: 'center', paddingVertical: 14 },
  btnPrimaryTxt: { color: '#fff', fontWeight: '800' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, gap: 8 },
  sheetTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginBottom: 4 },
  input: { backgroundColor: '#fff', borderColor: '#E2E8F0', borderWidth: 1, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, marginBottom: 8 },
  btn: { alignItems: 'center', paddingVertical: 14, borderRadius: 12 },
  btnTxt: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
