// components/HeaderNavButtons.js
// @ts-nocheck
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../store/AuthStore';

export function HeaderHomeLeft() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={styles.iconBtn}>
      <Ionicons name="home-outline" size={22} />
    </TouchableOpacity>
  );
}

export function HeaderAccountRight() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.iconBtn}>
        <Ionicons name="person-circle-outline" size={24} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.overlay} onPress={close}>
          <View />
        </Pressable>

        <View style={styles.menu}>
          {user ? (
            <>
              <MenuItem
                icon="grid-outline"
                label="Panel"
                onPress={() => {
                  close();
                  navigation.navigate('Main');
                }}
              />
              <MenuItem
                icon="time-outline"
                label="Historial"
                onPress={() => {
                  close();
                  navigation.navigate('History');
                }}
              />
              <MenuItem
                icon="pricetags-outline"
                label="Planes"
                onPress={() => {
                  close();
                  navigation.navigate('Plans');
                }}
              />
              <MenuItem
                icon="log-out-outline"
                label="Cerrar sesión"
                danger
                onPress={() => {
                  close();
                  logout();
                  navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
                }}
              />
            </>
          ) : (
            <>
              <MenuItem
                icon="log-in-outline"
                label="Iniciar sesión"
                onPress={() => {
                  close();
                  navigation.navigate('Login');
                }}
              />
              <MenuItem
                icon="person-add-outline"
                label="Crear cuenta"
                onPress={() => {
                  close();
                  navigation.navigate('Signup');
                }}
              />
              <MenuItem
                icon="pricetags-outline"
                label="Planes"
                onPress={() => {
                  close();
                  navigation.navigate('Plans');
                }}
              />
            </>
          )}
        </View>
      </Modal>
    </>
  );
}

function MenuItem({ icon, label, onPress, danger }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Ionicons name={icon} size={18} />
      <Text style={[styles.menuText, danger && { color: '#B91C1C', fontWeight: '800' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  menu: {
    position: 'absolute',
    top: 54,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    width: 220,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuText: { fontSize: 15, color: '#0F172A', fontWeight: '700' },
});