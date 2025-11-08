// @ts-nocheck

import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';
import PlansModal from './PlansModal';

export default function ThreeDotsMenu() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [plansModalVisible, setPlansModalVisible] = useState(false);

  const goProfile = () => {
    setOpen(false);
    navigation.navigate('Profile');
  };

  const openPlansModal = () => {
    setOpen(false);
    setPlansModalVisible(true);
  };

  const doLogout = async () => {
    setOpen(false);
    await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  return (
    <>
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
            <MenuItem label="Mi Perfil" onPress={goProfile} icon="👤" />
            <MenuItem label="Planes" onPress={openPlansModal} icon="⭐" />
            <MenuItem label="Cerrar Sesión" onPress={doLogout} danger icon="🚪" />
          </View>
        )}
      </View>

      {/* Modal de Planes */}
      <PlansModal 
        visible={plansModalVisible} 
        onClose={() => setPlansModalVisible(false)} 
      />
    </>
  );
}

function MenuItem({ label, onPress, danger, icon }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.itemIcon}>{icon}</Text>
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
    minWidth: 200,
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  itemIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
});
