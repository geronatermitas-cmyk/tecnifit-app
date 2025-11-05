// screens/TareaScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../store/AuthStore';

export default function TareaScreen({ navigation }) {
  const auth = (typeof useAuth === 'function') ? useAuth() : null;
  const role = auth?.role ?? 'guest';

  const [images, setImages] = useState([]);
  const [codes, setCodes] = useState([]);
  const [description, setDescription] = useState('');

  const selectImages = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert('Permiso requerido', 'Activa acceso a galería');
    const res = await ImagePicker.launchImageLibraryAsync({ allowsMultipleSelection: true });
    if (res.canceled) return;
    const uris = (res.assets ?? []).map(a => a.uri);
    setImages([...images, ...uris]);
  };

  const addCode = (text) => {
    const v = text.trim();
    if (v && !codes.includes(v)) setCodes([...codes, v]);
  };

  const saveTask = () => {
    if (!images.length && !codes.length && !description.trim()) {
      return Alert.alert('Nada que guardar', 'Añade al menos una imagen, código o descripción.');
    }
    navigation.navigate('Review', { photos: images, codes, queries: [description] });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva tarea</Text>

      {/* FOTOS */}
      <Text style={styles.section}>Fotos</Text>
      <TouchableOpacity style={styles.btn} onPress={selectImages}>
        <Text style={styles.btnText}>Seleccionar imágenes</Text>
      </TouchableOpacity>
      <View style={styles.imageGrid}>
        {images.map((uri, i) => (
          <Image key={`${uri}-${i}`} source={{ uri }} style={styles.image} />
        ))}
      </View>

      {/* CÓDIGOS */}
      <Text style={styles.section}>Códigos</Text>
      <TextInput
        placeholder="Introduce un código y pulsa Enter"
        onSubmitEditing={(e) => addCode(e.nativeEvent.text)}
        style={styles.input}
      />
      {codes.map(c => (
        <View key={c} style={styles.codeRow}>
          <Text>{c}</Text>
          <TouchableOpacity onPress={() => setCodes(codes.filter(x => x !== c))}>
            <Text style={{ color: '#EF4444' }}>borrar</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* DESCRIPCIÓN */}
      <Text style={styles.section}>Descripción</Text>
      <TextInput
        multiline
        placeholder="Describe la tarea..."
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
      />

      <TouchableOpacity style={[styles.btn, { marginTop: 20 }]} onPress={saveTask}>
        <Text style={styles.btnText}>Revisar tarea</Text>
      </TouchableOpacity>

      <Text style={styles.role}>Rol actual: {role}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  section: { marginTop: 16, marginBottom: 8, fontWeight: '700' },
  btn: { backgroundColor: '#2563EB', padding: 14, borderRadius: 12 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '800' },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 10, padding: 10, marginBottom: 8,
  },
  imageGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  image: { width: 90, height: 90, borderRadius: 8, marginRight: 8, marginBottom: 8 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  role: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 10 },
});