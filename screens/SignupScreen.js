import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../store/AuthStore';

export default function SignupScreen() {
  const nav = useNavigation();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await signUp({ name, email: email.trim(), password });
      nav.reset({ index: 0, routes: [{ name: 'Panel' }] });
    } catch (e) {
      // Usar console.error en lugar de Alert para compatibilidad web
      console.error('Error al crear cuenta:', e);
      // Podríamos usar un Toast o un componente de error visible en la UI
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Crear cuenta</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={[styles.btn, busy && { opacity: 0.7 }]} onPress={onSubmit} disabled={busy}>
          <Text style={styles.btnTxt}>{busy ? 'Creando…' : 'Crear cuenta'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('Login')}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 16, color: '#0F172A' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12, fontSize: 16 },
  btn: { backgroundColor: '#2563EB', borderRadius: 12, alignItems: 'center', paddingVertical: 14, marginTop: 4 },
  btnTxt: { color: '#fff', fontWeight: '800', fontSize: 17 },
  link: { textAlign: 'center', color: '#2563EB', marginTop: 12 },
});
