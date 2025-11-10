// screens/ResultsScreen.js
// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MenuButton from '../components/MenuButton';

function makeDemo(count = 25, seed = 1) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: `demo-${seed}-${i}`,
      title: `Procedimiento ${i}`,
      summary: `Pasos básicos para completar la tarea #${i}.`,
    });
  }
  return arr;
}

export default function ResultsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const q = route.params?.q || '';

  // Datos “desde servidor/IA” – de momento demo local
  const data = useMemo(() => makeDemo(25, q ? q.length : 1), [q]);

  // Gestión de UI
  const [hidden, setHidden] = useState(new Set());        // ids ocultos (borrado suave)
  const [selected, setSelected] = useState(new Set());    // ids seleccionados

  const visibleData = useMemo(
    () => data.filter((it) => !hidden.has(it.id)),
    [data, hidden]
  );

  const toggleSelect = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const hideSelected = () => {
    if (selected.size === 0) return;
    const nextHidden = new Set(hidden);
    selected.forEach((id) => nextHidden.add(id));
    setHidden(nextHidden);
    setSelected(new Set());
  };

  const clearSelection = () => setSelected(new Set());
  const restoreHidden = () => {
    setHidden(new Set());
    Alert.alert('Restaurado', 'Se han mostrado de nuevo los resultados ocultos.');
  };

  // Header derecho con menú + extra “Restaurar ocultos”
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TouchableOpacity onPress={restoreHidden} style={styles.smallChip}>
            <Text style={styles.smallChipText}>Restaurar ocultos</Text>
          </TouchableOpacity>
          <MenuButton />
        </View>
      ),
      // Quitamos icono de “casa” en resultados
      headerLeft: undefined,
      title: 'Resultados',
    });
  }, [navigation, hidden]);

  const renderItem = ({ item }) => {
    const isSel = selected.has(item.id);
    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item.id)}
        style={[styles.row, isSel && styles.rowSel]}
      >
        <View style={[styles.checkbox, isSel && styles.checkboxSel]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowSub}>{item.summary}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {q ? (
        <View style={styles.queryBanner}>
          <Text style={styles.queryText}>Consulta: “{q}”</Text>
        </View>
      ) : null}

      <FlatList
        data={visibleData}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={{ padding: 32, alignItems: 'center' }}>
            <Text style={{ color: '#64748B', fontWeight: '800' }}>No hay resultados.</Text>
          </View>
        }
      />

      {/* Barra de acciones si hay selección */}
      {selected.size > 0 && (
        <View style={styles.actionBar}>
          <TouchableOpacity onPress={clearSelection} style={[styles.actionBtn, styles.ghost]}>
            <Text style={[styles.actionText, { color: '#0F172A' }]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideSelected} style={[styles.actionBtn, styles.primary]}>
            <Text style={styles.actionText}>Ocultar selección</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  queryBanner: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#EFF6FF' },
  queryText: { color: '#1E3A8A', fontWeight: '800' },

  row: {
    flexDirection: 'row', gap: 12, padding: 14,
    borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, alignItems: 'center',
  },
  rowSel: { borderColor: '#2563EB', backgroundColor: '#EEF2FF' },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: '#94A3B8', backgroundColor: '#fff',
  },
  checkboxSel: { borderColor: '#2563EB', backgroundColor: '#2563EB' },
  rowTitle: { fontWeight: '800', fontSize: 16, color: '#0F172A' },
  rowSub: { color: '#64748B', marginTop: 2 },

  actionBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    flexDirection: 'row', gap: 12, padding: 16, backgroundColor: '#fff',
    borderTopColor: '#E2E8F0', borderTopWidth: 1,
  },
  actionBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  ghost: { borderWidth: 1, borderColor: '#CBD5E1' },
  primary: { backgroundColor: '#2563EB' },
  actionText: { fontWeight: '800', color: '#fff' },

  smallChip: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#1D4ED8', borderRadius: 10 },
  smallChipText: { color: '#fff', fontWeight: '800', fontSize: 12 },
});
