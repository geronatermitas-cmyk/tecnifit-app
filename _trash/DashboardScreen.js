// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIntake } from '../store/IntakeStore';

export default function DashboardScreen() {
  const nav = useNavigation();
  const { items, addTextItem, addCodeItem, removeSelected, clearAll, toggleSelect, selectedIds } = useIntake();

  const [text, setText] = useState('');
  const [code, setCode] = useState('');

  const canDelete = selectedIds.size > 0 || items.length > 0;

  const addText = () => {
    const v = text.trim();
    if (!v) return;
    addTextItem(v);
    setText('');
  };

  const addCode = () => {
    const v = code.trim();
    if (!v) return;
    addCodeItem(v);
    setCode('');
  };

  const footerBar = useMemo(() => {
    if (!canDelete) return null;
    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.barBtn, { backgroundColor: selectedIds.size > 0 ? '#ef4444' : '#94a3b8' }]}
          onPress={() => {
            if (selectedIds.size === 0) return;
            Alert.alert('Eliminar', '¿Seguro que deseas eliminar la selección?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', style: 'destructive', onPress: () => removeSelected() },
            ]);
          }}
        >
          <Text style={styles.barBtnTxt}>Eliminar selección</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.barBtn, { backgroundColor: '#f97316' }]}
          onPress={() => {
            if (items.length === 0) return;
            Alert.alert('Vaciar todo', '¿Eliminar todos los elementos del panel?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Vaciar', style: 'destructive', onPress: () => clearAll() },
            ]);
          }}
        >
          <Text style={styles.barBtnTxt}>Vaciar todo</Text>
        </TouchableOpacity>
      </View>
    );
  }, [canDelete, selectedIds, items]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.box}>
        <Text style={styles.title}>Añadir búsqueda (texto)</Text>
        <View style={styles.row}>
          <TextInput value={text} onChangeText={setText} placeholder="Ej. cambiar bombilla" style={styles.input} />
          <TouchableOpacity style={styles.primary} onPress={addText}><Text style={styles.primaryTxt}>Añadir</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Añadir código (manual)</Text>
        <View style={styles.row}>
          <TextInput value={code} onChangeText={setCode} placeholder="Ej. SKU / ref." style={styles.input} />
          <TouchableOpacity style={styles.primary} onPress={addCode}><Text style={styles.primaryTxt}>Añadir</Text></TouchableOpacity>
        </View>
      </View>

      <View style={[styles.box, { flex: 1 }]}>
        <Text style={styles.title}>Tu panel</Text>
        <FlatList
          data={items}
          keyExtractor={it => it.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => toggleSelect(item.id)}
              onPress={() => toggleSelect(item.id)}
              style={[
                styles.item,
                selectedIds.has(item.id) && { borderColor: '#2563EB', backgroundColor: '#dbeafe' },
              ]}
            >
              <Text style={styles.itemKind}>{item.kind.toUpperCase()}</Text>
              <Text style={styles.itemText}>{item.value}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={{ color: '#64748b' }}>Sin elementos todavía.</Text>}
        />
      </View>

      {/* Botones de acción principales */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#2563EB' }]} onPress={() => nav.navigate('Results', { query: text })}>
          <Text style={styles.actionTxt}>Coincidencias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#0ea5e9' }]} onPress={() => nav.navigate('TaskBuilder')}>
          <Text style={styles.actionTxt}>Diseñar proceso</Text>
        </TouchableOpacity>
      </View>

      {footerBar}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16, gap: 8 },
  title: { fontWeight: '800', fontSize: 16, color: '#0f172a' },
  row: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, borderRadius: 10, height: 44 },
  primary: { backgroundColor: '#10b981', borderRadius: 10, paddingHorizontal: 14, justifyContent: 'center' },
  primaryTxt: { color: '#fff', fontWeight: '800' },
  item: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: '#fff' },
  itemKind: { color: '#64748b', fontSize: 12, fontWeight: '700' },
  itemText: { color: '#0f172a', marginTop: 4, fontWeight: '600' },
  actions: { position: 'absolute', bottom: 72, left: 16, right: 16, flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  actionTxt: { color: '#fff', fontWeight: '800' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', gap: 10, padding: 12, backgroundColor: '#111827' },
  barBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  barBtnTxt: { color: '#fff', fontWeight: '800' },
});