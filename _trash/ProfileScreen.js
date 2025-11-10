// screens/ProfileScreen.js
// @ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../store/AuthStore';

export default function ProfileScreen() {
  const { email, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta</Text>
      <Text style={styles.label}>Usuario</Text>
      <Text style={styles.value}>{email || '—'}</Text>

      <View style={{ height: 16 }} />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => Alert.alert('Colaboración', 'Aquí conectaremos con la plataforma de profesionales (próxima fase).')}
      >
        <Text style={styles.btnText}>Conectar con profesionales</Text>
      </TouchableOpacity>

      <View style={{ height: 12 }} />

      <TouchableOpacity style={[styles.btn, { backgroundColor:'#EF4444' }]} onPress={logout}>
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F5F6F7', padding:16 },
  title:{ fontSize:20, fontWeight:'800', color:'#1F2937', marginBottom:12, textAlign:'center' },
  label:{ color:'#6B7280', fontWeight:'700' },
  value:{ color:'#111827', marginBottom:8 },
  btn:{ height:46, borderRadius:10, backgroundColor:'#2563EB', alignItems:'center', justifyContent:'center' },
  btnText:{ color:'#fff', fontWeight:'800' },
});