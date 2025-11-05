// screens/ReviewScreen.js
// @ts-nocheck
import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';
import { useIntake } from '../store/IntakeStore';
import MenuButton from '../components/MenuButton';

export default function ReviewScreen() {
  const navigation = useNavigation();
  const { user, usedToday, limits, incUsage, logout } = useAuth();
  const { queue, hasAnyData, saveTask, clearAll, processGuest, removeItem } = useIntake();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <MenuButton
          options={[
            { key: 'panel', label: 'Panel', onPress: () => navigation.navigate('Panel') },
            { key: 'history', label: 'Historial', onPress: () => navigation.navigate('History') },
            { key: 'logout', label: 'Cerrar sesión', onPress: () => logout?.() },
          ]}
        />
      ),
    });
  }, [navigation, logout]);

  const onProcess = async () => {
    if (!hasAnyData()) return Alert.alert('Nada que procesar');

    if (!user) {
      Alert.alert(
        'Inicia sesión para guardar',
        'Procesa como invitado (no se guardará) o inicia sesión para guardar tu historial.',
        [
          { text: 'Invitado (no guarda)', onPress: async () => {
              const taskId = processGuest ? await processGuest() : await saveTask(false);
              navigation.navigate('Results', { taskId, guest: true });
            } },
          { text: 'Crear cuenta', onPress: () => navigation.navigate('Signup', { redirect: 'process' }) },
          { text: 'Iniciar sesión', onPress: () => navigation.navigate('Login', { redirect: 'process' }) },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
      return;
    }

    if ((usedToday ?? 0) >= (limits?.maxTasksPerDay ?? 0)) {
      return Alert.alert('Cuota agotada', 'Has alcanzado el límite diario. Revisa Planes.');
    }

    const taskId = await saveTask(true);
    incUsage?.();
    navigation.navigate('Results', { taskId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revisión</Text>

      <FlatList
        data={queue}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Text style={{ color: '#64748B', marginHorizontal: 16 }}>No hay elementos.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemType}>{item.type.toUpperCase()}</Text>
              <Text style={styles.itemText} numberOfLines={1}>{item.text}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={{ color: '#ef4444', fontWeight: '800' }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnGhost} onPress={clearAll}>
          <Text style={styles.btnGhostText}>Vaciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={onProcess}>
          <Text style={styles.btnPrimaryText}>Procesar tarea</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '800', margin: 16 },
  item: { paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e5e7eb',
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemType: { fontWeight: '800', color: '#0f172a' },
  itemText: { color: '#334155', marginTop: 2 },
  footer: { flexDirection: 'row', gap: 12, padding: 16 },
  btnGhost: { flex: 1, borderWidth: 1, borderColor: '#CBD5E1', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnGhostText: { fontWeight: '800', color: '#0F172A' },
  btnPrimary: { flex: 1, backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnPrimaryText: { color: '#fff', fontWeight: '800' },
});