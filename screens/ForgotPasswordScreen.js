// screens/ForgotPasswordScreen.js
// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Recuperar contraseña</Text>
      <TextInput style={styles.input} placeholder="Tu email" value={email} onChangeText={setEmail} />
      <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Enviado', 'Si existe tu email, recibirás instrucciones.')}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 12, height: 44, marginBottom: 10 },
  btn: { backgroundColor: '#2563EB', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  btnText: { color: '#fff', fontWeight: '800' },
});
