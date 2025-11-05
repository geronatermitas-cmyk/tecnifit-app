// screens/IntakeScreen.js
// @ts-nocheck
import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../store/AuthStore';

export default function IntakeScreen({ route, navigation }) {
  // 'photos' | 'codes' | 'scan' | 'search'
  const mode = route?.params?.mode ?? 'photos';
  const selectLabel = mode === 'codes' ? 'Seleccionar códigos' : 'Seleccionar imágenes';

  // Auth (por si quieres condicionar límites)
  const auth = (typeof useAuth === 'function') ? useAuth() : null;
  const role = auth?.role ?? 'guest';

  // Estado local (ejemplo mínimo)
  const [selectedImages, setSelectedImages] = useState([]);
  const [codes, setCodes] = useState([]);
  const [query, setQuery] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mode === 'codes' ? 'Cargar códigos' : 'Cargar fotos',
    });
  }, [navigation, mode]);

  const selectFromLibrary = async () => {
    // Si el modo es "codes" de momento solo cambiamos el texto del botón, reutilizamos galería
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm?.granted) {
      Alert.alert('Permiso', 'Necesitamos permiso de galería para continuar.');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images], // API nueva (evita warning)
      allowsMultipleSelection: true,
      quality: 0.8,
      base64: false,
      selectionLimit: 10,
    });

    if (res?.canceled) return;

    // Unificar assets → uris
    const uris = (res?.assets ?? [])
      .map(a => a?.uri)
      .filter(Boolean);

    setSelectedImages(prev => [...prev, ...uris]);
  };

  const addCode = (c) => {
    const v = String(c || '').trim();
    if (!v) return;
    if (codes.includes(v)) return;
    setCodes(prev => [...prev, v]);
  };

  const removeCode = (c) => {
    setCodes(prev => prev.filter(x => x !== c));
  };

  const goReview = () => {
    if (!selectedImages.length && !codes.length && !query.trim()) {
      Alert.alert('Nada que revisar', 'Añade al menos una imagen, código o descripción.');
      return;
    }
    navigation.navigate('Review', {
      photos: selectedImages,
      codes,
      queries: query ? [query] : [],
    });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.h1}>Prepara tu tarea</Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={selectFromLibrary}>
        <Text style={styles.primaryBtnText}>{selectLabel}</Text>
      </TouchableOpacity>

      {/* Preview de imágenes */}
      {selectedImages.length > 0 && (
        <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
          {selectedImages.map((uri, idx) => (
            <Image
              key={`${uri}-${idx}`}       // <- key única (evita warning de keys duplicadas)
              source={{ uri }}
              style={{ width: 90, height: 90, borderRadius: 8, marginRight: 8, marginBottom: 8 }}
            />
          ))}
        </View>
      )}

      {/* Añadir códigos manualmente */}
      <Text style={styles.section}>Códigos</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="Pega/escribe un código"
          autoCapitalize="none"
          style={styles.input}
          onSubmitEditing={(e) => addCode(e.nativeEvent.text)}
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          style={[styles.smallBtn, { marginLeft: 8 }]}
        >
          <Text style={styles.smallBtnText}>OK</Text>
        </TouchableOpacity>
      </View>

      {codes.map(c => (
        <View key={c} style={styles.rowItem}>
          <Text style={styles.rowText}>{c}</Text>
          <TouchableOpacity onPress={() => removeCode(c)}>
            <Text style={styles.remove}>borrar</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Descripción libre */}
      <Text style={styles.section}>Descripción</Text>
      <TextInput
        placeholder="Describe lo que necesitas"
        multiline
        style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity style={[styles.primaryBtn, { marginTop: 18 }]} onPress={goReview}>
        <Text style={styles.primaryBtnText}>Revisar</Text>
      </TouchableOpacity>

      <Text style={{ color: '#64748B', marginTop: 8, fontSize: 12 }}>
        Rol actual: {role}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16, paddingTop: 20 },
  h1: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  section: { marginTop: 16, marginBottom: 6, fontWeight: '800', color: '#0f172a' },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 12, padding: 12,
  },
  primaryBtn: { backgroundColor: '#2563EB', padding: 14, borderRadius: 12 },
  primaryBtnText: { color: '#fff', textAlign: 'center', fontWeight: '800' },
  smallBtn: { backgroundColor: '#2563EB', paddingHorizontal: 14, borderRadius: 10, justifyContent: 'center' },
  smallBtnText: { color: '#fff', fontWeight: '800' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rowItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E5E7EB'
  },
  rowText: { fontSize: 14, color: '#111827' },
  remove: { color: '#ef4444', fontWeight: '700' },
});