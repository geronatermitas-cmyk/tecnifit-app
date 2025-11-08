// @ts-nocheck

import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../store/AuthStore';


export default function LoginScreen() {
  const navigation = useNavigation();

  const nav = useNavigation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [busy, setBusy] = useState(false);


  const onSubmit = async () => {

    if (busy) return;

    setBusy(true);

    try {

      await signIn({ email: email.trim(), password });

      nav.reset({ index: 0, routes: [{ name: 'Panel' }] });

    } catch (e) {

      // Usar console.error en lugar de Alert para compatibilidad web
      console.error('Error al iniciar sesión:', e);
      // Podríamos usar un Toast o un componente de error visible en la UI
      // Por ahora, solo logueamos el error.

    } finally {

      setBusy(false);

    }

  };


  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.backBtn}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.h1}>Iniciar Sesión</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.wrap}>


        <TextInput

          style={styles.input}

          placeholder="Email"

          keyboardType="email-address"

          autoCapitalize="none"

          value={email}

          onChangeText={setEmail}

          returnKeyType="next"

        />

        <TextInput

          style={styles.input}

          placeholder="Contraseña"

          secureTextEntry

          value={password}

          onChangeText={setPassword}

          returnKeyType="done"

          onSubmitEditing={onSubmit}

        />


        <TouchableOpacity style={[styles.btn, busy && { opacity: 0.7 }]} onPress={onSubmit} disabled={busy}>

          <Text style={styles.btnTxt}>{busy ? 'Entrando…' : 'Entrar'}</Text>

        </TouchableOpacity>


        <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')}>

          <Text style={styles.link}>¿Olvidaste la contraseña?</Text>

        </TouchableOpacity>


        <View style={{ height: 16 }} />

        <TouchableOpacity onPress={() => nav.navigate('Signup')}>

          <Text style={styles.linkStrong}>Crear cuenta</Text>

        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>

  );

}


const styles = StyleSheet.create({

  wrap: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },

  h1: { fontSize: 20, fontWeight: '800' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
  },
  backBtn: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
  },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 16, color: '#0F172A' },

  input: {

    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0',

    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12, fontSize: 16,

  },

  btn: { backgroundColor: '#2563EB', borderRadius: 12, alignItems: 'center', paddingVertical: 14, marginTop: 4 },

  btnTxt: { color: '#fff', fontWeight: '800', fontSize: 17 },

  link: { textAlign: 'center', color: '#2563EB', marginTop: 12 },

  linkStrong: { textAlign: 'center', color: '#0F172A', fontWeight: '800' },

});
