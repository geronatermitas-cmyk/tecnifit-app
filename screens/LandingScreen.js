// screens/LandingScreen.js
// @ts-nocheck
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LandingScreen() {
  const navigation = useNavigation();
  const [q, setQ] = useState('');

  const onSearch = () => {
    navigation.navigate('Results', { q: q?.trim() || '' });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../assets/landing.png')}
        resizeMode="cover"
        style={styles.bg}
      >
        {/* Capa semitransparente opcional para contraste */}
        <View style={styles.overlay} />

        {/* Caja de búsqueda */}
        <View style={styles.searchBoxWrap}>
          <Text style={styles.title}>ASISTENTE DIGITAL DE TAREAS</Text>
          <Text style={styles.subtitle}>GUÍA. APRENDE. HAZ.</Text>

          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Describe tu tarea..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
            returnKeyType="search"
            onSubmitEditing={onSearch}
          />

          <TouchableOpacity onPress={onSearch} style={styles.btn}>
            <Text style={styles.btnText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // para que la caja quede abajo
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)', // si quieres oscurecer un poco la imagen
  },
  searchBoxWrap: {
    width: '90%',
    maxWidth: 560,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 40,
  },
  title: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 18 },
});