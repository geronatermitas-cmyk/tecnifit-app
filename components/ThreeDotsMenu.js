// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';

export default function ThreeDotsMenu() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const goPanel = () => {
    setOpen(false);
    navigation.navigate('Panel');
  };

  const doLogout = async () => {
    setOpen(false);
    await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  return (
    <View style={{ marginRight: 16 }}>
      <Pressable
        onPress={() => setOpen(v => !v)}
        hitSlop={12}
        style={{ padding: 6 }}
      >
        <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>⋮</Text>
      </Pressable>

      {open && (
        <Pressable 
          style={StyleSheet.absoluteFill} 
          onPress={() => setOpen(false)}
        />
      )}

      {open && (
        <View style={styles.menu}>
          <MenuItem label="Panel de Control" onPress={goPanel} />
          <MenuItem label="Cerrar Sesión" onPress={doLogout} danger />
        </View>
      )}
    </View>
  );
}

function MenuItem({ label, onPress, danger }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={[styles.itemText, danger && { color: '#B91C1C' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 34,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    minWidth: 180,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    zIndex: 1000,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
});
