// screens/PhotoIntakeScreen.js
// @ts-nocheck
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useIntake } from '../store/IntakeStore';

export default function PhotoIntakeScreen({ navigation }) {
  const { addPhotos } = useIntake();
  const [localPhotos, setLocalPhotos] = useState([]); // [{uri}]

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Activa el permiso de cámara para continuar.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.85,
      base64: false,
      exif: false,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setLocalPhotos(prev => [...prev, { uri: result.assets[0].uri }]);
    }
  };

  const handlePickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Activa el permiso de fotos/galería para continuar.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,   // ✅ API moderna
      allowsMultipleSelection: true,
      selectionLimit: 0,                           // 0 = sin límite (iOS 14+ / Android 13+)
      quality: 0.85,
      base64: false,
      exif: false,
    });
    if (!result.canceled && Array.isArray(result.assets)) {
      const items = result.assets.map(a => ({ uri: a.uri })).filter(Boolean);
      if (items.length) setLocalPhotos(prev => [...prev, ...items]);
    }
  };

  const removeLocal = (uri) =>
    setLocalPhotos(prev => prev.filter(p => p.uri !== uri));

  const onConfirm = () => {
    if (!localPhotos.length) {
      Alert.alert('Sin fotos', 'Añade al menos una foto antes de continuar.');
      return;
    }
    addPhotos(localPhotos);      // ✅ sube al store global
    navigation.navigate('Review');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Añade fotos de la tarea</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={handleTakePhoto}>
          <Text style={styles.btnText}>Usar cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handlePickFromGallery}>
          <Text style={styles.btnText}>Cargar desde archivo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {localPhotos.map(p => (
          <View key={p.uri} style={styles.item}>
            <Image source={{ uri: p.uri }} style={styles.img} />
            <TouchableOpacity style={styles.badge} onPress={() => removeLocal(p.uri)}>
              <Text style={styles.badgeTxt}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.btnFull, { backgroundColor:'#6B7280' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFull} onPress={onConfirm}>
          <Text style={styles.btnText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#F5F6F7', padding:16, paddingBottom:88 },
  h1:{ fontSize:18, fontWeight:'700', textAlign:'center', marginBottom:12, color:'#1E293B' },
  row:{ flexDirection:'row', gap:10, marginBottom:12 },
  btn:{ flex:1, height:44, borderRadius:10, backgroundColor:'#2563EB', alignItems:'center', justifyContent:'center' },
  btnText:{ color:'#fff', fontWeight:'700' },
  grid:{ flexDirection:'row', flexWrap:'wrap', gap:10, paddingBottom:90 },
  item:{ width:110, height:110, borderRadius:10, overflow:'hidden', position:'relative', backgroundColor:'#E2E8F0' },
  img:{ width:'100%', height:'100%' },
  badge:{ position:'absolute', top:6, right:6, width:24, height:24, borderRadius:12, backgroundColor:'rgba(0,0,0,0.55)', alignItems:'center', justifyContent:'center' },
  badgeTxt:{ color:'#fff', fontWeight:'800' },
  bottomBar:{ position:'absolute', left:0, right:0, bottom:0, padding:12, flexDirection:'row', gap:10, backgroundColor:'rgba(245,246,247,0.96)', borderTopWidth:1, borderTopColor:'#E5E7EB' },
  btnFull:{ flex:1, height:46, borderRadius:10, backgroundColor:'#2563EB', alignItems:'center', justifyContent:'center' },
});