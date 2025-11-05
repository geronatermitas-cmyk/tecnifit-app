// components/AccountMenuButton.js
// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../store/AuthStore'; // opcional, tolera undefined

export default function AccountMenuButton() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  // Tolerante si el provider no está aún montado
  let auth = null;
  try { auth = typeof useAuth === 'function' ? useAuth() : null; } catch {}
  const role = auth?.role ?? 'guest';
  const logout = auth?.logout;

  const goLogin = () => { setOpen(false); navigation.navigate('Login'); };
  const goSignup = () => { setOpen(false); navigation.navigate('Signup'); };
  const goAccount = () => { setOpen(false); navigation.navigate('MainTabs'); };
  const doLogout = () => { 
    setOpen(false);
    if (typeof logout === 'function') logout();
    navigation.reset({ index: 0, routes: [{ name: 'Landing' }] });
  };

  return (
    <View style={{ marginRight: 8 }}>
      {/* Botón del header */}
      <Pressable
        onPress={() => setOpen(v => !v)}
        hitSlop={12}
        style={{ padding: 6 }}
      >
        <Ionicons name="person-circle-outline" size={26} color="#fff" />
      </Pressable>

      {/* Overlay para cerrar al tocar fuera */}
      {open && (
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
          {/* vacío: sólo para cerrar */}
        </Pressable>
      )}

      {/* Bocadillo */}
      {open && (
        <View style={styles.menu}>
          {role === 'guest' ? (
            <>
              <MenuItem label="Acceder" onPress={goLogin} />
              <MenuItem label="Crear cuenta" onPress={goSignup} />
            </>
          ) : (
            <>
              <MenuItem label="Mi cuenta" onPress={goAccount} />
              <MenuItem label="Cerrar sesión" onPress={doLogout} danger />
            </>
          )}
        </View>
      )}
    </View>
  );
}

function MenuItem({ label, onPress, danger }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={[styles.itemText, danger && { color: '#B91C1C' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 34,           // debajo del icono
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