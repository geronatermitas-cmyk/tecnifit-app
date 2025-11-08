// @ts-nocheck

import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from '../components/NavigationMenu';


export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  // Añadir el menú de 3 puntos al header


  const [email, setEmail] = useState('');

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.backBtn}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.h1}>Recuperar contraseña</Text>
        <View style={{ width: 60 }} />
      </View>

      <TextInput style={styles.input} placeholder="Tu email" value={email} onChangeText={setEmail} />

      <TouchableOpacity style={styles.btn} onPress={() => {
        Alert.alert('Enviado', 'Si existe tu email, recibirás instrucciones.');
        navigation.navigate('Landing'); // Volver a Landing después de enviar
      }}>

        <Text style={styles.btnText}>Enviar</Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 20,
  },
  backBtn: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
  },

  h1: { fontSize: 20, fontWeight: '800' },

  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 12, height: 44, marginBottom: 10 },

  btn: { backgroundColor: '#2563EB', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 6 },

  btnText: { color: '#fff', fontWeight: '800' },

});
