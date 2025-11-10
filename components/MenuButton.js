// @ts-nocheck
import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user, signOut } = useAuth();

  const close = () => setOpen(false);
  const go = (screen, params) => { close(); navigation.navigate(screen, params); };

  const onSignOut = async () => {
    close();
    try { await signOut(); } catch {}
    // Vuelve siempre a Landing
    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  // Opciones según sesión
  const items = user
    ? [
        { label: 'Ir a panel', onPress: () => go('Panel') },
        { label: 'Historial', onPress: () => go('History') },
        { label: 'Planes', onPress: () => go('Plans') },
        { label: 'Ayuda', onPress: () => go('Results', { help: true }) },
        { label: 'Términos y Privacidad', onPress: () => go('Results', { terms: true }) },
        { label: 'Cerrar sesión', danger: true, onPress: onSignOut },
      ]
    : [
        { label: 'Iniciar sesión', onPress: () => go('Login') },
        { label: 'Crear cuenta', onPress: () => go('Signup') },
        { label: 'Planes', onPress: () => go('Plans') },
        { label: 'Ayuda', onPress: () => go('Results', { help: true }) },
        { label: 'Términos y Privacidad', onPress: () => go('Results', { terms: true }) },
      ];

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.dotBtn} hitSlop={10}>
        <Text style={styles.dots}>⋮</Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade" onRequestClose={close}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={close}>
          <View style={styles.sheet}>
            {items.map((it, idx) => (
              <TouchableOpacity key={idx} onPress={it.onPress} style={styles.item}>
                <Text style={[styles.itemText, it.danger && { color: '#DC2626' }]}>{it.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dotBtn: { paddingHorizontal: 12, paddingVertical: 4 },
  dots: { fontSize: 24, color: '#fff', fontWeight: '700' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.06)', justifyContent: 'flex-start', alignItems: 'flex-end' },
  sheet: {
    marginTop: 56,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 8,
    minWidth: 240,
    elevation: 4,
  },
  item: { paddingVertical: 14, paddingHorizontal: 16, borderBottomColor: '#E5E7EB', borderBottomWidth: StyleSheet.hairlineWidth },
  itemText: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
});
